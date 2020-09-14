(() => {
    let input = document.getElementById("pokemonInput").value;
    let x;
    let pokemonMoves = [];
    let template = document.getElementById("target").cloneNode(true);
    let moves_target = document.getElementsByClassName("pokemon_card_moves");
    let id;

    document.getElementById("run").addEventListener("click", function () {
        checkInput();

        fetch("https://pokeapi.co/api/v2/pokemon/" + input)
            .then(response => response.json())
            .then(data => appendData(data))

        function appendData(data) {
            console.log(data);
            let target = document.getElementById("target");
            if (data.id < 10){
                id = "#00" + data.id;
            } else if (data.id < 100 && data.id >= 10){
                id = "#0" + data.id;
            } else {
                id = "#" + data.id
            }

            template.querySelector(".pokemon_card_name").innerText = data.name;
            template.querySelector(".pokemon_card_id").innerText = id;
            template.querySelector(".pokemon_card_img img").setAttribute("src", data.sprites.front_default);
            template.querySelector(".pokemon_card_img img").setAttribute("alt", "sprite of " + data.name);
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

            //template.querySelector(".pokemon_card_moves").innerText = pokemonMoves;
            target.appendChild(template);
            for (let i = 0; i < pokemonMoves.length; i++){
                moves_target[1].innerText += pokemonMoves[i] + "\n";
            }
            pokemonMoves = [];
        }
        moves_target[1].innerText = "";
    })

    function checkInput() {
        input = document.getElementById("pokemonInput").value;
    }


})();