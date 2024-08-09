import request from "@/utils/request";
import axios from "axios";

export function uploadArticle(data){
    return request({
        url: "/article/upload",
        method: "put",
        data: data,
    });
}