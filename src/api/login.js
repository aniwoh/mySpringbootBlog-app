import request from "@/utils/request";
import axios from "axios";

export function login(username, password) {
    const data={'username':username,'password':password}
    return request({
      url: "/user/login",
      method: "post",
      data: data,
    },{withCredentials:true});
}

export function logout() {
    return request({
        url: "/user/logout",
        method: "get"
    });
}

export function register(username, password) {
    const data={'username':username,'password':password}

    return request({
        url: "/user/register",
        method: "post",
        data: data,
    });
}