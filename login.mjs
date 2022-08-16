#!/usr/bin/env node
import inquirer from 'inquirer';
class Person {
    #loginID
    constructor() {
        this.#loginID = 'Anon';
    }
    what() {
        console.log(`Your login ID is ${this.#loginID}`);
    }
    get loginID() {
        console.log('get triggered!')
        return this.#loginID.toUpperCase();
    }
    set loginID(newloginID) {
        console.log('set triggered!')
        this.#loginID = newloginID;
    }
}
export let User = new Person;

export async function login() {
    const loginid = await inquirer.prompt({
        name: 'login_name',
        type: 'input',
        message: 'What is your User ID?',
        default() {
            return 'Anon';
        },
    });
    User.loginID = loginid.login_name;
}