const handleResponse = async () => {
    // Something
}

// GET/HEAD
const getRequest = async () => {
    // Something
    handleResponse();
}

const init = () => {
    const getAllPokemonButton = document.querySelector('#getAllPokemon');
    addUserButton.addEventListener('submit', (e) => { 
        e.preventDefault();
        getRequest();
    });
}

window.onload = init;