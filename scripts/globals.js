let BASE_URL = `https://pokeapi.co/api/v2/`;
let pokemonIndex = [];
let visiblePokemon = [];
let pokemonDetails = [];
let displayedPokemon = [];
let amountOfCards = {
    'start': 0,
    'amount': 20,
    'maxIDs': 80,
    'loadIncrement': 20,
    'maxIndex': 979 
};
let maxValues = {
    'hp': 255,
    'attack': 190,
    'defense': 230,
    'special_attack': 192,
    'special_defense': 200,
    'speed': 200
};