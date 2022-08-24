# interact-ibmi

![Depfu](https://img.shields.io/depfu/dependencies/github/Teqed/interact-ibmi?style=plastic) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Teqed/interact-ibmi?style=plastic) ![GitHub](https://img.shields.io/github/license/Teqed/interact-ibmi?style=plastic) ![GitHub last commit](https://img.shields.io/github/last-commit/Teqed/interact-ibmi?style=plastic) ![GitHub repo size](https://img.shields.io/github/repo-size/Teqed/interact-ibmi?style=plastic) ![Lines of code](https://img.shields.io/tokei/lines/github/Teqed/interact-ibmi)

 Menus for interacting with IBMi AS400 using NodeJS, Typescript, `vorpal`, and `node-odbc` packages.

![prototype image of interact-ibmi showing some test output](https://user-images.githubusercontent.com/5181964/186485005-d9686590-5599-4329-bdfa-083d5dde18ea.png)

 This is a work-in-progress with the goals of being able to view file records using ODBC, insert new records, and delete selected records, as well as perform some system commands.

## Checklist

* [:heavy_check_mark:] Make ODBC connections to IBMi
* [:heavy_check_mark:] Send SQL queries to fetch data from tables and store it in objects
* [:heavy_check_mark:] Find QSYS2 tables for retrieving system information
* [:heavy_check_mark:] Send QCMDEXC commands to system using SQL queries
* [❌] Handle errors on QCMDEXC commands
* [❌] Handle errors on regular SQL queries
* [❌] Copy records based on script
* [:heavy_check_mark:] Create a new system user by copying another user's profile
* [❌] Place new system user on authorization lists and create directory entry
* [❌] Show system / user diagnostics upon login
* [❌] Help make decisions
