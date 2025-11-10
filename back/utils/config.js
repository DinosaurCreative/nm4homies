const dataBaseAdress =
    process.env.MONGO_PUBLIC_URL ||
    process.env.DATABASE_URL ||
    "mongodb://mongo:UBRfgmnfYKgFXZVVgfpHcfEZQwYAoThG@crossover.proxy.rlwy.net:15075";
const devSecretKey = process.env.SECRET_KEY || "super-strong-secret";
const PORT = process.env.PORT || 3000;

module.exports = {
    dataBaseAdress,
    devSecretKey,
    PORT
};
