export default class AccessToken {
    static get() {
        return JSON.stringify(window.localStorage.getItem("access_token"));
        // return JSON.parse(window.localStorage.getItem("access_token"));
    }

    static set(new_token) {
        window.localStorage.setItem("access_token", ("Bearer " + JSON.stringify(new_token)));
        // window.localStorage.setItem("access_token", new_token);
    }
}