import axios from "axios";
const mainUrl = process.env.REACT_APP_MAIN_URL || "http://localhost:3000";

const myFetch = async (path, options) => {
    const response = await axios.request({
        baseURL: mainUrl + path,
        data: options?.body,
        method: options?.method,
        withCredentials: true,
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
