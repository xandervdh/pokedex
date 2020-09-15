(() => {
    let input;
    let x;
    let pokemonMoves = [];
    let moves_target = document.getElementById("pokemon_card_moves");
    let id;
    let target = document.getElementById("target");
    let target_bottom = document.getElementById("pokedex-bottom");
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let arrow;


    function fetchPokemon(input, func){
        fetch(input)
            .then(response => response.json())
            .then(data => func(data))
    }
    document.getElementById("run").addEventListener("click", function () {
        checkInput();
        target_bottom.innerHTML = "";
        let pokemon = url + input;
        fetchPokemon(pokemon, appendData);

        function appendData(data) {
            console.log(data);

            if (data.id < 10){
                id = "#00" + data.id;
            } else if (data.id < 100 && data.id >= 10){
                id = "#0" + data.id;
            } else {
                id = "#" + data.id
            }

            target.querySelector(".pokemon-name").innerText = data.name;
            target.querySelector(".pokemon-types").innerText = id;
            target.querySelector(".pokedex-screen-image").setAttribute("src", data.sprites.front_default);
            target.querySelector(".pokedex-screen-image").setAttribute("alt", "sprite of " + data.name);
            if (data.moves.length < 4) {
                x = data.moves.length;
            } else {
                x = 4;
            }
            for (let i = 0; i < x; i++) {
                let max = data.moves.length - 1;
                let rand = Math.floor(Math.random() * (max - 0 + 1));
                pokemonMoves.push(" " + data.moves[rand].move.name);
            }

            for (let i = 0; i < pokemonMoves.length; i++){
                moves_target.innerText += pokemonMoves[i] + "\n";
            }
            pokemonMoves = [];
            let evolution = data.species.url;
            fetch(evolution)
                .then(response => response.json())
                .then(data => findEvolution(data))
        }
        moves_target.innerText = "";
    })

    function findEvolution(data){
        let chain = data.evolution_chain.url;
        fetchPokemon(chain, showEvolution);
    }

    function showEvolution(data){
        let evoChain = [];
        let evoData = data.chain;
        let evoDetails;
        let evoPokemon;
        let pokemon;

        if (evoData.evolves_to.length > 1){
            for (let i = 0; i < evoData.evolves_to.length; i++){
                evoPokemon = evoData.evolves_to[i].species.name;
                pokemon = url + evoPokemon;
                fetchPokemon(pokemon, printEvolution);
            }
        } else {
            do {
                evoDetails = evoData['evolution_details'][0];
                evoChain.push({
                    "species_name": evoData.species.name
                });

                evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

            for (let i = 0; i < evoChain.length; i++){
                evoPokemon = evoChain[i].species_name;
                pokemon = url + evoPokemon;

                fetchPokemon(pokemon, printEvolution);
            }

        }

    }

    function printEvolution(data) {
        target_bottom.style.display = "flex";
        let evolution = document.getElementById("evoTemplate").content.cloneNode(true);
        evolution.querySelector(".evolution_image").setAttribute("src", data.sprites.front_default);
        evolution.querySelector(".evolution_image").setAttribute("alt", "sprite of " + data.name);
        evolution.querySelector(".evolution_name").innerHTML = data.name;
        evolution.querySelector(".evolution_id").innerHTML = data.id;
        target_bottom.appendChild(evolution);
    }

    function checkInput() {
        input = document.getElementById("pokemonInput").value;
    }


})();