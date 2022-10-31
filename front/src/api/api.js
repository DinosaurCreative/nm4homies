import axios from 'axios';
const mainUrl = process.env.REACT_APP_MAIN_URL;


const myFetch = async (path, options) =>{
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
  }

  const response = await axios.request({
    baseURL: mainUrl + path,
    data: options?.body,
    method: options?.method,
    withCredentials: true,
    credentials: 'include',
  })

  return response;
};
export const checkToken = () => myFetch('/user');

export const deleteStickerPack = body => myFetch('/sticker-pack', { method: 'DELETE' });

export const changeStickerPack = body => myFetch('/sticker-pack', { method: 'PATCH' });

export const getAllStickerPacks = body => myFetch('/sticker-packs');

export const login = body => myFetch('/signin', { method: 'POST',  body });

export const signout = () => myFetch('/signout', { method: 'DELETE' });

export const getStickerPack = body => myFetch('/sticker-pack');

export const createStickerPack = body => myFetch('/sticker-packs', { method: 'POST' })

