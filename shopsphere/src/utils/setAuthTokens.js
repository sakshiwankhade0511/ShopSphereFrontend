import apiClints from "./api-clints";

const setAuthToken = (token) => {
    if(token) {
        apiClints.defaults.headers.common["x-auth-token"] = token
    } else {
        delete apiClints.defaults.headers.common["x-auth-token"]
    }
}

export default setAuthToken;