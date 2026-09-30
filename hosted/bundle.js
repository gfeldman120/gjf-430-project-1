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

eval("{// Take the response and print it out\r\nconst handleResponse = async (response) => {\r\n    const content = document.querySelector('#content');\r\n    // Remove last text\r\n    content.innerHTML = '';\r\n    // Show output\r\n    let text = await response.text();\r\n    if(text) {\r\n        content.innerHTML += `${text}<br>`;\r\n    }\r\n    else {\r\n        content.innerHTML += `Received response, no body.<br>`;\r\n    }\r\n}\r\n\r\n// GET/HEAD\r\nconst getRequest = async (url) => {\r\n    // Get method and parameters based on inputs\r\n    let method;\r\n    let queryParams;\r\n    switch (url) {\r\n        case '/api/getAllPokemon':\r\n            method = document.querySelector('input[name=\"getAllPokemonMethod\"]:checked').value;\r\n            break;\r\n        case '/api/getPokemon':\r\n            method = document.querySelector('input[name=\"getPokemonMethod\"]:checked').value;\r\n            const name = document.querySelector('input[name=\"getPokemonName\"]').value;\r\n            queryParams = new URLSearchParams({\r\n                name,\r\n            });\r\n        default:\r\n            break;\r\n    }\r\n    // Include query parameters if they exist\r\n    const response = await fetch(queryParams ? `${url}?${queryParams}` : url, {\r\n        method: method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n        },\r\n    });\r\n    handleResponse(response);\r\n}\r\n\r\n// POST\r\nconst postRequest = async (url) => {\r\n    let body;\r\n    let format;\r\n    // Get data format and create body based on it\r\n    switch (url) {\r\n        case '/api/addPokemon':\r\n            format = document.querySelector('input[name=\"addPokemonFormat\"]:checked').value;\r\n            const name = document.querySelector('input[name=\"addPokemonName\"]').value;\r\n            if (format === 'JSON') {\r\n                body = JSON.stringify({\r\n                    name\r\n                });\r\n            }\r\n            else {\r\n                body = `name=${encodeURIComponent(name)}`;\r\n                // body = `name=${encodeURIComponent(name)}& ... `;\r\n            }\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n    // Include query parameters if they exist\r\n    const response = await fetch(url, {\r\n        method: 'POST',\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': format === 'JSON' ? 'application/json' : 'x-www-form-urlencoded'\r\n        },\r\n        body: body\r\n    });\r\n    handleResponse(response);\r\n}\r\n\r\nconst init = () => {\r\n    const getAllPokemonButton = document.querySelector('#getAllPokemon');\r\n    getAllPokemonButton.addEventListener('click', (e) => { \r\n        e.preventDefault();\r\n        getRequest('/api/getAllPokemon');\r\n    });\r\n    const getPokemonButton = document.querySelector('#getPokemon');\r\n    getPokemonButton.addEventListener('click', (e) => { \r\n        e.preventDefault();\r\n        getRequest('/api/getPokemon');\r\n    });\r\n    const addPokemonButton = document.querySelector('#addPokemon');\r\n    addPokemonButton.addEventListener('click', (e) => { \r\n        e.preventDefault();\r\n        postRequest('/api/addPokemon');\r\n    });\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://gjf-430-project-1/./client/client.js?\n}");

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