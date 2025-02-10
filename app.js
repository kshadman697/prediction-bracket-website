// Sample bracket data (you can change this to whatever teams you need)
const bracketData = [
  { match: "Team A vs Team B", teams: ["Team A", "Team B"] },
  { match: "Team C vs Team D", teams: ["Team C", "Team D"] },
];

// Function to display the bracket
function renderBracket() {
  const bracketContainer = document.getElementById("bracket-container");
  bracketData.forEach(match => {
    const matchElement = document.createElement("div");
    matchElement.classList.add("bracket");

    const matchLabel = document.createElement("div");
    matchLabel.classList.add("match");
    matchLabel.textContent = match.match;
    matchElement.appendChild(matchLabel);

    match.teams.forEach(team => {
      const teamButton = document.createElement("button");
      teamButton.textContent = team;
      teamButton.setAttribute("data-team", team);
      matchElement.appendChild(teamButton);
    });

    bracketContainer.appendChild(matchElement);
  });
}

// Call the function to render the bracket
renderBracket();
