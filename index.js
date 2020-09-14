(() => {
    let input;
    let x;
    let pokemonMoves = [];
    let moves_target = document.getElementById("pokemon_card_moves");
    let id;
    let target = document.getElementById("target");


    document.getElementById("run").addEventListener("click", function () {
        checkInput();

        fetch("https://pokeapi.co/api/v2/pokemon/" + input)
            .then(response => response.json())
            .then(data => appendData(data))

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
                x = 1;
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
        fetch(chain)
            .then(response => response.json())
            .then(data => showEvolution(data))
    }

    function showEvolution(data){
        let evoChain = [];
        let evoData = data.chain;
        let evoDetails

        do {
            evoDetails = evoData['evolution_details'][0];
            evoChain.push({
                "species_name": evoData.species.name
            });

            evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        console.log(evoChain);
        let target_bottom = document.getElementById("pokedex-bottom");
        evoChain.forEach(function(evo) {

            const evoDiv = document.createElement('div');
            evoDiv.className = 'pokemon';

            // Get sprites for each evolution stage
            const pokemon = pokemonArray.filter(data => data.name === evo.species_name);
            const evoImg = document.createElement('img');
            evoImg.src = pokemon[0].sprites.front_default;

            // Get name
            const evoName = document.createElement('h3');
            evoName.textContent = evo.species_name;

            // Append everything
            target_bottom.appendChild(evoImg);
            target_bottom.appendChild(evoName);
            target_bottom.appendChild(evoDiv);
        })

        let template = document.getElementById("evoTemplate").content.cloneNode(true);
        //template.querySelector(".evolution_image").innerHTML = data.evolvesTo
    }

    function checkInput() {
        input = document.getElementById("pokemonInput").value;
    }


})();