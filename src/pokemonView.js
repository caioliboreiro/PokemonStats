import { getPokemonData } from "./apiHandler";

export function createEventListeners() {
  const searchBtn = document.querySelector(".search-btn");
  const toggleModeBtn = document.querySelector(".toggle-btn");

  searchBtn.addEventListener("click", () => {
    const searchBar = document.querySelector("#search-bar");

    if (searchBar.value != "") {
      renderPokemon(searchBar.value.toLowerCase());
    }

    searchBar.value = "";
  });

  toggleModeBtn.addEventListener("click", toggleMode);
}

function toggleMode() {
  const pokemonDetails = document.querySelector(".pokemon-details");
  if (
    document.body.style.backgroundColor == "white" ||
    document.body.style.backgroundColor == ""
  ) {
    document.body.style.backgroundColor = "hsl(0, 0%, 10%)";
    document.body.style.color = "white";

    document
      .querySelectorAll("input:not(#search-bar)")
      .forEach((input) => (input.style.color = "white"));

    document
      .querySelectorAll(".meter")
      .forEach((meter) => (meter.style.border = "1px solid white"));
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    document
      .querySelectorAll("input:not(#search-bar)")
      .forEach((input) => (input.style.color = "black"));

    document
      .querySelectorAll(".meter")
      .forEach((meter) => (meter.style.border = "1px solid black"));
  }
}

export async function renderPokemon(pokemonName) {
  const pokemonData = await getPokemonData(pokemonName);
  const pokemonNameTag = document.querySelector(".pokemon-name");
  const sprite = document.querySelector(".sprite");
  const pokemonId = document.querySelector("#pokemon-id");
  const pokemonTypeImgs = document.querySelector(".type-imgs");

  pokemonTypeImgs.innerHTML = "";
  for (let typeImg of pokemonData.types) {
    const img = document.createElement("img");
    img.classList.toggle("type-img");
    img.src = typeImg;

    pokemonTypeImgs.appendChild(img);
  }

  const pokemonWeight = document.querySelector("#pokemon-weight");
  const pokemonHeight = document.querySelector("#pokemon-height");
  const statContainers = document.querySelectorAll(".stat-container");

  pokemonNameTag.textContent = pokemonData.name;
  sprite.src = pokemonData.sprite;
  pokemonId.value = pokemonData.id;
  pokemonWeight.value = pokemonData.weight;
  pokemonHeight.value = pokemonData.height;

  let i = 0;
  let soma = 0;
  for (let statContainer of statContainers) {
    const stat_value = pokemonData.stats[i].base_stat;
    const stat_number = statContainer.querySelector("p");
    stat_number.textContent = stat_value;

    const filler = statContainer.querySelector(".meter-filler");

    const percentage = (stat_value / 255) * 100;
    filler.style.width = percentage + "%";
    i++;
    soma = soma + stat_value;
  }

  const totalFiller = document.querySelector(".total-filler");
  totalFiller.style.width = (soma / 1530) * 100 + "%";
  totalFiller.parentElement.parentElement.querySelector("p").textContent = soma;
}
