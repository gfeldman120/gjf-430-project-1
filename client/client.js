// Take the response and print it out
const handleResponse = async (response) => {
    const content = document.querySelector('#content');
    // Remove last text
    content.innerHTML = '';
    // Show output
    let text = await response.text();
    if(text) {
        content.innerHTML += `${text}<br>`;
    }
    else {
        content.innerHTML += `Received response, no body.<br>`;
    }
}

// GET/HEAD
const getRequest = async (url) => {
    // Get method and parameters based on inputs
    let method;
    let queryParams;
    switch (url) {
        case '/api/getAllPokemon':
            method = document.querySelector('input[name="getAllPokemonMethod"]:checked').value;
            break;
        case '/api/getPokemon':
            method = document.querySelector('input[name="getPokemonMethod"]:checked').value;
            const name = document.querySelector('input[name="getPokemonName"]').value;
            queryParams = new URLSearchParams({
                name,
            });
        default:
            break;
    }
    // Include query parameters if they exist
    const response = await fetch(queryParams ? `${url}?${queryParams}` : url, {
        method: method,
        headers: {
            'Accept': 'application/json',
        },
    });
    handleResponse(response);
}

// POST
const postRequest = async (url) => {
    let body;
    let format;
    // Get data format and create body based on it
    switch (url) {
        case '/api/addPokemon':
            format = document.querySelector('input[name="addPokemonFormat"]:checked').value;
            const name = document.querySelector('input[name="addPokemonName"]').value;
            if (format === 'JSON') {
                body = JSON.stringify({
                    name
                });
            }
            else {
                body = `name=${encodeURIComponent(name)}`;
                // body = `name=${encodeURIComponent(name)}& ... `;
            }
            break;
        default:
            break;
    }
    // Include query parameters if they exist
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': format === 'JSON' ? 'application/json' : 'x-www-form-urlencoded'
        },
        body: body
    });
    handleResponse(response);
}

const init = () => {
    const getAllPokemonButton = document.querySelector('#getAllPokemon');
    getAllPokemonButton.addEventListener('click', (e) => { 
        e.preventDefault();
        getRequest('/api/getAllPokemon');
    });
    const getPokemonButton = document.querySelector('#getPokemon');
    getPokemonButton.addEventListener('click', (e) => { 
        e.preventDefault();
        getRequest('/api/getPokemon');
    });
    const addPokemonButton = document.querySelector('#addPokemon');
    addPokemonButton.addEventListener('click', (e) => { 
        e.preventDefault();
        postRequest('/api/addPokemon');
    });
}

window.onload = init;