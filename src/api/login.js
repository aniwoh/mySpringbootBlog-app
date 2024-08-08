import request from "@/utils/request";
import axios from "axios";

export function login(username, password) {
    const data={'username':username,'password':password}
    return request({
      url: "/user/login",
      method: "post",
      data: data,
    });
}

export function logout() {
    return request({
      url: "/user/logout",
      method: "get"
    });
}

export function register(username, password) {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return request({
      url: "/user/register",
      method: "post",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}