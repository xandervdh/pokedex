(() => {
    let input = document.getElementById("pokemonInput").value;
    let x;
    let pokemonMoves = [];
    let template = document.getElementById("target").cloneNode(true);

    document.getElementById("run").addEventListener("click", function () {
        checkInput();

        console.log(input);
        fetch("https://pokeapi.co/api/v2/pokemon/" + input)
            .then(response => response.json())
            .then(data => appendData(data))

        function appendData(data) {
            console.log(data);
            let target = document.getElementById("target");

            template.querySelector(".pokemon_card_name").innerText = data.name;
            template.querySelector(".pokemon_card_id").innerText = data.id;
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
                console.log(rand);
                pokemonMoves.push(" " + data.moves[rand].move.name);
            }
            console.log(pokemonMoves);
            template.querySelector(".pokemon_card_moves").innerText = pokemonMoves;
            target.appendChild(template);
            pokemonMoves = [];
        }
    })

    function checkInput() {
        input = document.getElementById("pokemonInput").value;
    }


})();