import request from "@/utils/request/index";

export function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return request({
      url: "/user/login",
      method: "post",
      data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
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