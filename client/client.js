// Take the response and print it out
const handleResponse = async (response) => {
    const content = document.querySelector('#content');
    // Remove 1st time text
    if(content.innerHTML === 'Output will show here.') {
        content.innerHTML = '';
    }
    // Show output
    let text = await response.text();
    if(text) {
        let jsonString = JSON.stringify(text);
        content.innerHTML += `${jsonString}<br>`;
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
    let response;
    if (queryParams) {
        response = await fetch(`url?${queryParams}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
            },
        });
    }
    else {
        response = await fetch('url', {
            method: method,
            headers: {
                'Accept': 'application/json',
            },
        });
    }
    handleResponse(response);
}

// POST
const postRequest = async (url) => {
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