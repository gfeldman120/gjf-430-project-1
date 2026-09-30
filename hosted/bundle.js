/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js"
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
() {

eval("{const handleResponse = async () => {\r\n    // Something\r\n}\r\n\r\n// GET/HEAD\r\nconst getRequest = async () => {\r\n    // Something\r\n    handleResponse();\r\n}\r\n\r\nconst init = () => {\r\n    const getAllPokemonButton = document.querySelector('#getAllPokemon');\r\n    addUserButton.addEventListener('submit', (e) => { \r\n        e.preventDefault();\r\n        getRequest();\r\n    });\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://gjf-430-project-1/./client/client.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;