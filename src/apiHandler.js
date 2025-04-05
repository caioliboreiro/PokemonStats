export async function getPokemonData(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();

  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const sprite = data.sprites.front_default;
  const id = data.id;
  const types = await getTypeImgs(getTypeURLs(data.types));
  const weight = convertWeight(data.weight);
  const height = convertHeight(data.height);
  const stats = data.stats;
  stats.push({
    base_stat: 0,
  });

  console.log(types);

  return { name, sprite, id, types, weight, height, stats };
}

function getTypeURLs(types) {
  const typeURLs = [];
  for (let type of types) {
    typeURLs.push(type.type.url);
  }

  return typeURLs;
}

async function getTypeImgs(typeURLs) {
  const typeImgs = [];

  for (let typeURL of typeURLs) {
    const response = await fetch(typeURL);
    const data = await response.json();

    typeImgs.push(data.sprites["generation-v"]["black-white"].name_icon);
  }

  return typeImgs;
}

function convertWeight(weight) {
  return weight / 10 + " kg";
}

function convertHeight(height) {
  return height / 10 + " m";
}
