export default class AccessToken {
    static get() {
        return window.localStorage.getItem("access_token");
        // return JSON.parse(window.localStorage.getItem("access_token"));
    }

    static set(new_token) {
        window.localStorage.setItem("access_token", new_token);
    }

    static remove() {
        window.localStorage.removeItem("access_token");
    }
}