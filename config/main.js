var subtext = "v1";



let gamesData = [];

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${game.url}/${game.image}`;
    gameImage.alt = game.name;

gameImage.onclick = () => {
  const gameUrl = game.url;

  const newTab = window.open("about:blank", "_blank");

  if (newTab) {
    newTab.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${game.name}</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="${gameUrl}"></iframe>
      </body>
      </html>
    `);

    newTab.document.close();
  }
};
    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );

  displayFilteredGames(filteredGames);
}

fetch("./config/games.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`games.json failed to load: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data);
  })
  .catch((error) => {
    console.error("Error loading games:", error);
  });

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;
