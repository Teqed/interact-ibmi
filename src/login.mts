#!/usr/bin/env ts-node
import inquirer from 'inquirer';
class Person {
	#loginId!: string;
	#loginPw!: string;
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
export const loginUser = new Person();

export async function login() {
	const loginid = await inquirer.prompt({
		name: 'login_name',
		type: 'input',
		message: 'What is your User ID?',
		default() {
			return 'Anon';
		},
	});
	const loginpw = await inquirer.prompt({
		name: 'login_pw',
		type: 'password',
		mask: '*',
		message: 'What is your password?',
	});
	loginUser.loginId = loginid.login_name as string;
	loginUser.loginPw = loginpw.login_pw as string;
}
