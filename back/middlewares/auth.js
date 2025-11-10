const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { devSecretKey } = require("../utils/config");

function extractTokenFromCookie(cookieHeader) {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    const idCookie = cookies.find((cookie) => cookie.startsWith("_id="));
    if (!idCookie) return null;
    return idCookie.split("=")[1];
}

function extractTokenFromHeader(authHeader) {
    if (!authHeader) return null;
    // Поддерживаем формат "Bearer token" или просто "token"
    if (authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }
    return authHeader;
}

module.exports = (req, res, next) => {
    // Сначала пробуем получить токен из заголовка Authorization (приоритет)
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie;
    let token = extractTokenFromHeader(authHeader);

    // Логируем для отладки - ВСЕГДА, даже для OPTIONS
    console.log("=== AUTH CHECK ===");
    console.log("Path:", req.path);
    console.log("Method:", req.method);
    console.log("Authorization header:", authHeader || "MISSING");
    console.log("Cookie header:", cookieHeader || "MISSING");
    console.log(
        "Extracted token from header:",
        token ? token.substring(0, 20) + "..." : "NONE"
    );
    console.log("==================");

    // Если нет в заголовке, пробуем из cookie (для обратной совместимости)
    if (!token) {
        const cookieHeader = req.headers.cookie;
        token = extractTokenFromCookie(cookieHeader);
        if (token) {
            console.log("Token found in cookie");
        }
    }

    if (!token) {
        console.log("No token found in Authorization header or cookie");
        return next(new UnauthorizedError("Авторизуйтесь"));
    }

    let payload;
    try {
        payload = jwt.verify(token, devSecretKey);
        console.log("Token verified successfully, userId:", payload._id);
    } catch (err) {
        console.log("Token verification failed:", err.message);
        return next(new UnauthorizedError("Ошибка авторизации"));
    }

    req.user = payload;
    next();
};
