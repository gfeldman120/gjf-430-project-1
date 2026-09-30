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

eval("{// Take the response and print it out\r\nconst handleResponse = async (response) => {\r\n    const content = document.querySelector('#content');\r\n    // Remove 1st time text\r\n    if(content.innerHTML === 'Output will show here.') {\r\n        content.innerHTML = '';\r\n    }\r\n    // Show output\r\n    let text = await response.text();\r\n    if(text) {\r\n        let jsonString = JSON.stringify(text);\r\n        content.innerHTML += `${jsonString}<br>`;\r\n    }\r\n}\r\n\r\n// GET/HEAD\r\nconst getRequest = async (url) => {\r\n    // Get method and parameters based on which buttons are pressed\r\n    let method;\r\n    let formattedData;\r\n    switch (url) {\r\n        case '/api/getAllPokemon':\r\n            method = document.querySelector('input[name=\"getAllPokemonMethod\"]:checked').value;\r\n            formattedData = 'none';\r\n            break;\r\n        case '/api/getPokemon':\r\n            method = document.querySelector('input[name=\"getPokemonMethod\"]:checked').value;\r\n            const name = document.querySelector('input[name=\"getPokemonName\"]').value;\r\n            formattedData = `name=${encodeURIComponent(name)}`;\r\n        default:\r\n            method = 'HEAD';\r\n            formattedData = 'none';\r\n            break;\r\n    }\r\n    // Include content-type and body if parameters exist\r\n    let response;\r\n    if (formattedData != 'none') {\r\n        response = await fetch(url, {\r\n            method: method,\r\n            headers: {\r\n                'Accept': 'application/json',\r\n                'Content-Type': 'application/x-www-form-urlencoded'\r\n            },\r\n            body: formattedData\r\n        });\r\n    }\r\n    else {\r\n        response = await fetch(url, {\r\n            method: method,\r\n            headers: {\r\n                'Accept': 'application/json'\r\n            },\r\n        });\r\n    }\r\n    handleResponse(response);\r\n}\r\n\r\nconst init = () => {\r\n    const getAllPokemonButton = document.querySelector('#getAllPokemon');\r\n    getAllPokemonButton.addEventListener('click', (e) => { \r\n        e.preventDefault();\r\n        getRequest('/api/getAllPokemon');\r\n    });\r\n    const getPokemonButton = document.querySelector('#getPokemon');\r\n    getPokemonButton.addEventListener('click', (e) => { \r\n        e.preventDefault();\r\n        getRequest('/api/getPokemon');\r\n    });\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://gjf-430-project-1/./client/client.js?\n}");

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