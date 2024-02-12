const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const characterInfo = document.getElementById('character-info');
const locationInfo = document.getElementById('location-info');
const episodesInfo = document.getElementById('episodes-info');

const fetchCharacter = async (id) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return await res.json();
}

const fetchLocation = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

const fetchEpisode = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = characterId.value;
    const character = await fetchCharacter(id);
    characterInfo.innerHTML = `
      <h2>${character.name}</h2>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Type: ${character.type}</p>
      <p>Gender: ${character.gender}</p>
      <p>Origin: ${character.origin.name}</p>
      <p>Last Location: ${character.location.name}</p>
      <img src="${character.image}" alt="${character.name}">
    `;

    const location = await fetchLocation(character.location.url);
    locationInfo.innerHTML = `
      <h2>Location Info</h2>
      <p>Name: ${location.name}</p>
      <p>Type: ${location.type}</p>
      <p>Dimension: ${location.dimension}</p>
    `;

    const episodes = await Promise.all(character.episode.map(url => fetchEpisode(url)));
    episodesInfo.innerHTML = `
      <h2>Episodes Info</h2>
      <ul>
        ${episodes.map(episode => `<li>${episode.name}</li>`).join('')}
      </ul>
    `;
});
