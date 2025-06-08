function createPokemonIndex(id, name) {
    return {
        'id': id,
        'name': name,
    };
};

function createPokemonObj(responce, abilities, stats, types, evolution) {
    return {
        'abilities': abilities,
        'base_experience': responce.base_experience,
        'height': responce.height,
        'id': responce.id,
        'name': responce.name,
        'weight': responce.weight,
        'stats': stats,
        'types': types,
        'evolution_chain': evolution
    };
};