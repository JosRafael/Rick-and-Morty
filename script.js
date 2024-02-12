const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const characterInfo = document.getElementById('character-info');
const locationInfo = document.getElementById('location-info');
const episodesInfo = document.getElementById('episodes-info');

// Hide the sections initially
characterInfo.style.display = 'none';
locationInfo.style.display = 'none';
episodesInfo.style.display = 'none';

const fetchCharacter = async (id) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await res.json();
    const translatedCharacter = {
        name: character.name,
        status: character.status === 'Alive' ? 'Vivo' : 'Morto',
        species: character.species,
        type: character.type,
        gender: character.gender === 'Male' ? 'Masculino' : 'Feminino',
        origin: {
            name: character.origin.name,
        },
        location: character.location.url, 
        episodes: character.episode, 
        image: character.image,
    };
    return translatedCharacter;
};

const fetchLocation = async (url) => {
    const res = await fetch(url);
    const location = await res.json();
    const translatedLocation = {
        name: location.name,
        type: location.type,
        dimension: location.dimension,
    };
    return translatedLocation;
};

const fetchEpisode = async (urls) => {
    const episodes = await Promise.all(urls.map(async url => {
        const res = await fetch(url);
        const episode = await res.json();
        return {
            name: episode.name,
        };
    }));
    return episodes;
};

btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = characterId.value;
    if(id) { // Check if the ID is not empty
        const character = await fetchCharacter(id);
        characterInfo.innerHTML = `
          <h2>${character.name}</h2>
          <p>Status: ${character.status}</p>
          <p>Espécie: ${character.species}</p>
          <p>Tipo: ${character.type}</p>
          <p>Gênero: ${character.gender}</p>
          <p>Origem: ${character.origin.name}</p>
          <img src="${character.image}" alt="${character.name}">
        `;
        characterInfo.style.display = 'block';

        const location = await fetchLocation(character.location);
        locationInfo.innerHTML = `
          <h2>Informações de Localização</h2>
          <p>Nome: ${location.name}</p>
          <p>Tipo: ${location.type}</p>
          <p>Dimensão: ${location.dimension}</p>
        `;
        locationInfo.style.display = 'block';

        const episodes = await fetchEpisode(character.episodes);
        episodesInfo.innerHTML = `
          <h2>Informações de Episódios</h2>
          <ul>
            ${episodes.map(episode => `<li>${episode.name}</li>`).join('')}
          </ul>
        `;
        episodesInfo.style.display = 'block';
    } else {
        alert('Por favor, digite um número para buscar o personagem.');
    }
});
