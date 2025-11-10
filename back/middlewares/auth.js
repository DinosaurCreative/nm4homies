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
    let token = extractTokenFromHeader(authHeader);

    // Если нет в заголовке, пробуем из cookie (для обратной совместимости)
    if (!token) {
        const cookieHeader = req.headers.cookie;
        token = extractTokenFromCookie(cookieHeader);
    }

    if (!token) {
        return next(new UnauthorizedError("Авторизуйтесь"));
    }

    let payload;
    try {
        payload = jwt.verify(token, devSecretKey);
    } catch (err) {
        return next(new UnauthorizedError("Ошибка авторизации"));
    }

    req.user = payload;
    next();
};
