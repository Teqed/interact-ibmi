<h1 align="center">interact-ibmi</h1>
<p align="center">
<img src="https://img.shields.io/badge/stability-wip-lightgrey.svg?style=plastic" alt="stability-wip"> <img src="https://github.com/Teqed/interact-ibmi/actions/workflows/continuous-integration.yml/badge.svg?event=push&style=plastic" alt="CI">  <img src="https://img.shields.io/depfu/dependencies/github/Teqed/interact-ibmi?style=plastic" alt="Depfu">
</p><p align="center">
<img src="https://img.shields.io/github/last-commit/Teqed/interact-ibmi?style=plastic" alt="GitHub last commit"> <img src="https://img.shields.io/github/license/Teqed/interact-ibmi?style=plastic" alt="GitHub">
</p>

<p align="center">Menus for interacting with IBMi AS400 using the <a href="https://github.com/markdirish/node-odbc/">node-odbc</a> package.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/5181964/189445402-07ffb4cf-445c-45a6-8800-c31d6c997c4b.png" alt="prototype image of interact-ibmi showing some test output">
</p><br><br>
 This is a work-in-progress with the goals of being able to view file records using ODBC, insert new records, and delete selected records, as well as perform some system commands.
 
 <!--
 <img src="https://raw.githubusercontent.com/Teqed/interact-ibmi/main/.github/assets/build.svg" alt="Tests">
 <img src="https://img.shields.io/github/issues-pr/Teqed/interact-ibmi?style=plastic" alt="GitHub pull requests"> 
 <img src="https://img.shields.io/github/repo-size/Teqed/interact-ibmi?style=plastic" alt="GitHub repo size"> 
 <img src="https://img.shields.io/tokei/lines/github/Teqed/interact-ibmi?style=plastic" alt="Lines of code">
-->
## To-do

* [:heavy_check_mark:] Make ODBC connections to IBMi
* [:heavy_check_mark:] Send SQL queries to fetch data from tables and store it in objects
* [:heavy_check_mark:] Find QSYS2 tables for retrieving system information
* [:heavy_check_mark:] Send QCMDEXC commands to system using SQL queries
* [:heavy_check_mark:] Handle errors on QCMDEXC commands
* [❌] Handle errors on regular SQL queries
* [❌] Copy records based on script
* [:heavy_check_mark:] Create a new system user by copying another user's profile
* [:heavy_check_mark:] Place new system user on authorization lists and create directory entry
* [:heavy_check_mark:] Show system / user diagnostics upon login

<p align="center">
<img src="https://user-images.githubusercontent.com/5181964/189445594-afe69bba-bcde-4d02-92e9-3fd0aaf70b10.png" alt="prototype image of interact-ibmi showing some user diagnostics">
<br>
<sup><small><i>Some basic user diagnostics already done!</i></small></sup>
</p>

## Who is this for?

This is mostly a personal pet project to learn some new technologies, and may involve a lot of refactoring or swapping of dependencies as I experiment. When finished, I hope this tool could be useful for quickly performing routine diagnostics, simple query tasks, and perhaps aid in troubleshooting. 

However, there's a lot of other tools available from IBM, the open source community, and third-party vendors that can already accomplish each of those tasks. Two tools I would recommend for general purposes are IBM's own Access Client Solutions (ACS) which can be run on OpenJava on most platforms, and Liam Barry's [Code for IBM i](https://github.com/halcyon-tech/vscode-ibmi) which is an excellent VSCode extension for working with IBMi that includes an API for creating your own extensions.

## Prerequisites

You must have IBM ODBC drivers installed for your platform. These are provided by IBM and are often included with installations of ACS. You must reboot after the installation. For more information, see the instructions on the node-odbc package, which this prereq is inherited from.

## Usage

Open your commandline and use:

```bash
npx @teqed/interact-ibmi
```

That's it, npx will take care of everything from there. You should be greeted by the login screen after it finishes downloading. Run the same command again as needed.
