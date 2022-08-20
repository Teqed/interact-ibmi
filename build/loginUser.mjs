class Person {
    #loginId;
    #loginPw;
    what() {
        console.log(`Your login ID is ${this.#loginId}`);
    }
    get loginId() {
        return this.#loginId.toUpperCase();
    }
    set loginId(newloginID) {
        this.#loginId = newloginID.toUpperCase();
    }
    get loginPw() {
        return this.#loginPw;
    }
    set loginPw(newloginPW) {
        this.#loginPw = newloginPW;
    }
}
export default new Person();
