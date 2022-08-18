#!/usr/bin/env ts-node
import inquirer from 'inquirer';
class Person {
    #loginID!: string
    #loginPW!: string
    what() {
        console.log(`Your login ID is ${this.#loginID}`);
    }
    get loginID() {
        return this.#loginID.toUpperCase();
    }
    set loginID(newloginID) {
        this.#loginID = newloginID.toUpperCase();
    }
    get loginPW(){
        return this.#loginPW;
    }
    set loginPW(newloginPW){
        this.#loginPW = newloginPW;
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
    const loginpw = await inquirer.prompt({
        name: 'login_pw',
        type: 'input',
        message: 'What is your password?',
    });
    User.loginID = loginid.login_name;
    User.loginPW = loginpw.login_pw;
}