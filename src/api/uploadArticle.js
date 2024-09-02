import need_auth_request from "@/utils/need_auth_request/index.js";
import axios from "axios";

export function uploadArticle(data){
    return need_auth_request({
        url: "/article/upload",
        method: "put",
        data: data,
    });
}