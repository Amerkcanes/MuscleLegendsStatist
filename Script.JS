function searchPlayer() {
    let nickname = document.getElementById("nickname").value;
    fetch("http://0.0.0.0:5000/player?nickname=" + nickname)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("player-info").innerHTML = "<p>Player not found</p>";
            } else {
                document.getElementById("player-info").innerHTML = `
                    <h2>${data.display_name} (@${data.nickname})</h2>
                    <p>Strength: ${data.strength}</p>
                    <p>Speed: ${data.speed}</p>
                    <p>Durability: ${data.durability}</p>
                    <p>Kills: ${data.kills}</p>
                    <p>Good Karma: ${data.good_karma}</p>
                    <p>Bad Karma: ${data.bad_karma}</p>
                    <p>Rebirths: ${data.rebirths}</p>
                    <p>Pets: ${data.pets.join(", ")}</p>
                `;
            }
        });
}

function loadTop(category) {
    fetch("http://0.0.0.0:5000/top?category=" + category)
        .then(response => response.json())
        .then(data => {
            let content = "<h2>Top 50 Players - " + category.replace("_", " ") + "</h2>";
            data.forEach((player, index) => {
                content += `<p>${index + 1}. <strong>${player.display_name}</strong> - ${player[category]}</p>`;
            });
            document.getElementById("top-players").innerHTML = content;
        });
}

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}