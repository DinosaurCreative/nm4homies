import axios from "axios";
const mainUrl = process.env.REACT_APP_MAIN_URL || "http://localhost:3000";

// Получаем токен из localStorage
const getToken = () => {
    return localStorage.getItem("authToken");
};

// Сохраняем токен в localStorage
export const setToken = (token) => {
    console.log("token", token);
    if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved to localStorage");
    } else {
        localStorage.removeItem("authToken");
        console.log("Token removed from localStorage");
    }
};

const myFetch = async (path, options) => {
    const token = getToken();
    const headers = {};

    // Добавляем токен в заголовок Authorization, если он есть
    if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log(`=== REQUEST TO ${path} ===`);
        console.log(`Token found: YES`);
        console.log(
            `Authorization header: Bearer ${token.substring(0, 20)}...`
        );
        console.log(`Full URL: ${mainUrl}${path}`);
    } else {
        console.warn(`=== REQUEST TO ${path} ===`);
        console.warn(`Token found: NO`);
        console.warn(
            `localStorage.getItem("authToken"):`,
            localStorage.getItem("authToken")
        );
        console.warn(`Full URL: ${mainUrl}${path}`);
    }

    const response = await axios.request({
        baseURL: mainUrl + path,
        data: options?.body,
        method: options?.method || "GET",
        headers,
        withCredentials: true, // Оставляем для обратной совместимости
        credentials: "include"
    });

    return response;
};
export const checkToken = () => myFetch("/user");

export const deleteStickerPack = (id) =>
    myFetch(`/sticker-pack/${id}`, { method: "DELETE" });

export const changeStickerPack = (body) =>
    myFetch("/sticker-pack", { method: "PATCH" });

export const getAllStickerPacks = (body) => myFetch("/sticker-packs");

export const login = (password) =>
    myFetch("/signin", { method: "POST", body: { password } });

export const signout = () => myFetch("/signout", { method: "DELETE" });

export const getStickerPack = (body) => myFetch("/sticker-pack");

export const createStickerPack = (body) =>
    myFetch("/sticker-pack", { method: "POST", body });
