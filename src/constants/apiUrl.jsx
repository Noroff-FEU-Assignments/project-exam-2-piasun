export const BASE_URL = "https://nf-api.onrender.com/api/v1/social/";
 
export const PROFILE_URL = `${BASE_URL}profiles/`;
export const LOGIN_URL = `${BASE_URL}auth/login`;
export const REGISTER_URL = `${BASE_URL}auth/register`;
export const POSTS_URL = `${BASE_URL}posts`;

export const SINGLE_PROFILE_URL = (name) =>
    `${BASE_URL}profiles/${name}`;