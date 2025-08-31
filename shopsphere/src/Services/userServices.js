import apiClints from "../utils/api-clints";
import { jwtDecode } from "jwt-decode"

const TokenName = "token";

export async function signup(user, profile){
    const body = new FormData()
    body.append("name", user.name)
    body.append("email", user.email)
    body.append("password", user.password)
    body.append("deliveryAddress", user.deliveryAddress)
    body.append("profilePic", profile)

    const {data} = await apiClints.post("/user/signup", body)
    localStorage.setItem(TokenName, data.token)
}

export async function login(user){
    const {data} = await apiClints.post("/user/login", user)
    localStorage.setItem(TokenName, data.token);
}

export function logout() {
    localStorage.removeItem(TokenName);
}

export function getUser() {
    try {
        const jwt = localStorage.getItem(TokenName)
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
    
}

export function getjwt(){
    return localStorage.getItem(TokenName);
}