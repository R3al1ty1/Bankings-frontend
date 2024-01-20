import Cookies from "universal-cookie";

export function useToken() {
    const cookies = new Cookies()

    const access_token = cookies.get("access_token");
    const setAccessToken = (value: string) => {
        if (value) {
            cookies.set("access_token", value, { path: '/accounts', expires: new Date(Date.now() + 25920000) })
        }
        localStorage.setItem("access_token", value);
    }


    const resetAccessToken = () => {
        cookies.set("access_token", undefined, {path: '/accounts', expires: new Date(Date.now()+25920000)})
        localStorage.removeItem("access_token");
    }

    const resetTokens = () => {
        resetAccessToken()
    }

    return {
        access_token,
        setAccessToken,
        resetAccessToken,
        resetTokens
    };
}