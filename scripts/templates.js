function preview_card(name, type, icons, id) {
    return `
        <div class="card ${type}" onclick="">
            <img src="./assets/pokemons/${name}.png" alt="" class="pokemon-img">
            <span class="name">#${id} ${name}</span>
            <div class="types">${icons}</div>            
        </div>
    `
};

function type(type) {
    return `<img src="./assets/icons/${type}_Icon.png" alt="" class="type ${type}-border"></img>`
};

function main_infos() {
    return `
        <div class="main-specs">
            <div class="main-keys-values">
                <span>Height</span>
                <span>Weight</span>
                <span>Base esperience</span>
                <span>Abilities</span>
            </div>
            <div class="main-keys-values">
                <span>: 2 m</span>
                <span>: 100 kg</span>
                <span>: 263</span>
                <span>: overgrow, chlorophyll</span>
            </div>
        </div>
    `
};

function stats() {
    return `
            <div class="loaded-infos" id="loaded_infos">
                <div class="main-specs">
                    <div class="stats-keys">
                        <span>hp</span>
                        <span>attack</span>
                        <span>defense</span>
                        <span>special-attack</span>
                        <span>special-defense</span>
                        <span>speed</span>
                    </div>
                    <div class="loading-bars">
                        <div class="loading-bar" id="hp">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="attack">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="defense">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="special_attack">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="special_defense">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="speed">
                            <div class="progress"></div>
                        </div>
                    </div>
                </div>
            </div>
    `
};

function evo_chain() {
    return ` <div class="evo-chain" id="evo_chain"></div>`
};

function evo_step() {
    return `
        <div class="evo-step" id="evo_step">
            <img src="./assets/pokemons/bulbasaur.png" alt="" class="evo-form-pic">
            <div class="evo-infos">
                <span>#1</span>
                <span>Balbasaur</span>
                <img src="./assets/icons/grass_Icon.png" alt="" class="type grass-border"></img>
            </div>
        </div>
    `
};