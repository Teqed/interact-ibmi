class Person {
	#loginId!: string;

	#loginPw!: string;

	#loginSys!: string;

	public what() {
		console.log(`Your login ID is ${this.#loginId}`);
	}

	public get loginId() {
		return this.#loginId;
		// return this.#loginId.toUpperCase();
	}

	public set loginId(newloginID) {
		this.#loginId = newloginID;
		// this.#loginId = newloginID.toUpperCase();
	}

	public get loginPw() {
		return this.#loginPw;
	}

	public set loginPw(newloginPW) {
		this.#loginPw = newloginPW;
	}

	public get loginSys() {
		return this.#loginSys;
	}

	public set loginSys(newloginSys) {
		this.#loginSys = newloginSys;
	}
}
export default new Person();
