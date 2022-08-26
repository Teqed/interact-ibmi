# interact-ibmi

![Node JS CI](https://github.com/Teqed/interact-ibmi/actions/workflows/node.js.yml/badge.svg?event=push&style=plastic) ![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg?style=plastic) ![Depfu](https://img.shields.io/depfu/dependencies/github/Teqed/interact-ibmi?style=plastic) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Teqed/interact-ibmi?style=plastic) ![GitHub](https://img.shields.io/github/license/Teqed/interact-ibmi?style=plastic) ![GitHub last commit](https://img.shields.io/github/last-commit/Teqed/interact-ibmi?style=plastic) ![GitHub repo size](https://img.shields.io/github/repo-size/Teqed/interact-ibmi?style=plastic) ![Lines of code](https://img.shields.io/tokei/lines/github/Teqed/interact-ibmi?style=plastic)

 Menus for interacting with IBMi AS400 using the `node-odbc` package.

![prototype image of interact-ibmi showing some test output](https://user-images.githubusercontent.com/5181964/186485005-d9686590-5599-4329-bdfa-083d5dde18ea.png)

 This is a work-in-progress with the goals of being able to view file records using ODBC, insert new records, and delete selected records, as well as perform some system commands.

## To-do

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

## Who is this for?

This is mostly a personal pet project to learn some new technologies, and may involve a lot of refactoring or swapping of dependencies as I experiment. When finished, I hope this tool could be useful for quickly performing routine diagnostics, simple query tasks, and perhaps aid in troubleshooting. 

However, there's a lot of other tools available from IBM, the open source community, and third-party vendors that can already accomplish each of those tasks. Two tools I would recommend for general purposes are IBM's own Access Client Solutions (ACS) which can be run on OpenJava on most platforms, and Liam Barry's [Code for IBM i](https://github.com/halcyon-tech/vscode-ibmi) which is an incredibly excellent VSCode extension for working with IBMi that includes an API for creating your own extensions.
