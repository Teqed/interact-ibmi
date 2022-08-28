<h1 align="center">interact-ibmi</h1>
<p align="center">
<img src="https://img.shields.io/badge/stability-wip-lightgrey.svg?style=plastic" alt="stability-wip"> <img src="https://github.com/Teqed/interact-ibmi/actions/workflows/node.js.yml/badge.svg?event=push&style=plastic" alt="Node JS CI"> <img src="https://raw.githubusercontent.com/Teqed/interact-ibmi/main/.github/assets/build.svg" alt="Tests"> <img src="https://img.shields.io/depfu/dependencies/github/Teqed/interact-ibmi?style=plastic" alt="Depfu"> <img src="https://img.shields.io/github/last-commit/Teqed/interact-ibmi?style=plastic" alt="GitHub last commit">
</p><p align="center">
<img src="https://img.shields.io/github/issues-pr/Teqed/interact-ibmi?style=plastic" alt="GitHub pull requests"> <img src="https://img.shields.io/github/license/Teqed/interact-ibmi?style=plastic" alt="GitHub"> <img src="https://img.shields.io/github/repo-size/Teqed/interact-ibmi?style=plastic" alt="GitHub repo size"> <img src="https://img.shields.io/tokei/lines/github/Teqed/interact-ibmi?style=plastic" alt="Lines of code">
</p>

<p align="center">Menus for interacting with IBMi AS400 using the <a href="https://github.com/markdirish/node-odbc/">node-odbc</a> package.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/5181964/186485005-d9686590-5599-4329-bdfa-083d5dde18ea.png" alt="prototype image of interact-ibmi showing some test output">
</p><br><br>
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
