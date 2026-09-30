// Take the response and print it out
const handleResponse = async (response) => {
    const content = document.querySelector('#content');
    // Show output
    let text = await response.text();
    if(text) {
        content.innerHTML = `${text}`;
    }
    else {
        content.innerHTML = `Received response, no body.`;
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
            queryParams = new URLSearchParams(`name=${name}`);
            break;
        case '/api/getElements':
            method = document.querySelector('input[name="getElementsMethod"]:checked').value;
            const elementsName = document.querySelector('input[name="getElementsName"]').value;
            const types = document.querySelector('input[name="getElementsTypes"]').checked;
            const weaknesses = document.querySelector('input[name="getElementsWeaknesses"]').checked;
            queryParams = new URLSearchParams(`name=${elementsName}&types=${types}&weaknesses=${weaknesses}`);
            break;
        case '/api/getEvolutions':
            method = document.querySelector('input[name="getEvolutionsMethod"]:checked').value;
            const baseName = document.querySelector('input[name="getEvolutionsName"]').value;
            const count = document.querySelector('input[name="getEvolutionsCount"]').value;
            queryParams = new URLSearchParams(`baseName=${baseName}&count=${count}`);
            break;
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
            const image = document.querySelector('input[name="addPokemonImage"]').value;
            const types = document.querySelector('input[name="addPokemonTypes"]').value;
            const height = document.querySelector('input[name="addPokemonHeight"]').value;
            const weight = document.querySelector('input[name="addPokemonWeight"]').value;
            const weaknesses = document.querySelector('input[name="addPokemonWeaknesses"]').value;
            if (format === 'JSON') {
                body = JSON.stringify({
                    name, image, types, height, weight, weaknesses
                });
            }
            else {
                body = `name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&types=${encodeURIComponent(types)}&height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}&weaknesses=${encodeURIComponent(weaknesses)}`;
            }
            break;
        case '/api/addEvolution':
            format = document.querySelector('input[name="addEvolutionFormat"]:checked').value;
            const baseName = document.querySelector('input[name="addEvolutionBaseName"]').value;
            const evolutionName = document.querySelector('input[name="addEvolutionEvolutionName"]').value;
            if (format === 'JSON') {
                body = JSON.stringify({
                    baseName, evolutionName
                });
            }
            else {
                body = `baseName=${encodeURIComponent(baseName)}&evolutionName=${encodeURIComponent(evolutionName)}`;
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
            'Content-Type': format === 'JSON' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        body: body
    });
    handleResponse(response);
}

// Setup buttons calling functions
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
    const getElementsButton = document.querySelector('#getElements');
    getElementsButton.addEventListener('click', (e) => { 
        e.preventDefault();
        getRequest('/api/getElements');
    });
    const getEvolutionsButton = document.querySelector('#getEvolutions');
    getEvolutionsButton.addEventListener('click', (e) => { 
        e.preventDefault();
        getRequest('/api/getEvolutions');
    });
    const addPokemonButton = document.querySelector('#addPokemon');
    addPokemonButton.addEventListener('click', (e) => { 
        e.preventDefault();
        postRequest('/api/addPokemon');
    });
    const addEvolutionButton = document.querySelector('#addEvolution');
    addEvolutionButton.addEventListener('click', (e) => { 
        e.preventDefault();
        postRequest('/api/addEvolution');
    });
}

window.onload = init;