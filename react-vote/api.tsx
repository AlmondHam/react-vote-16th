import axios from "axios";
import {getCookie} from "./util/cookie";

//axios인스턴스
const api = axios.create({
    baseURL:"https://www.ceosvote.link",
    headers:{Authorization:`Bearer ${getCookie("is_login")}` },
});
export default api;