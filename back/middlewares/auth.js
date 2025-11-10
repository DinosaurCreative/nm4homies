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

module.exports = (req, res, next) => {
    const cookieHeader = req.headers.cookie;
    const token = extractTokenFromCookie(cookieHeader);

    if (!token) {
        console.log(
            "Auth failed - no token found. Cookie header:",
            cookieHeader ? "present" : "missing"
        );
        return next(new UnauthorizedError("Авторизуйтесь"));
    }

    let payload;
    try {
        payload = jwt.verify(token, devSecretKey);
    } catch (err) {
        console.log("Auth failed - token verification error:", err.message);
        return next(new UnauthorizedError("Ошибка авторизации"));
    }

    req.user = payload;
    next();
};
