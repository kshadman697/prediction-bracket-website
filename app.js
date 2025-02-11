// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Example Bracket Data (replace with dynamic data if needed)
const bracketData = [
    { round: 1, matchups: ["Player 1", "Player 2"] },
    { round: 1, matchups: ["Player 3", "Player 4"] },
    { round: 2, matchups: ["Winner 1", "Winner 2"] },
];

// Render Bracket
const bracketContainer = document.getElementById("bracket-container");
const renderBracket = () => {
    bracketContainer.innerHTML = "";
    bracketData.forEach((round, index) => {
        const roundDiv = document.createElement("div");
        roundDiv.className = "bracket-round";

        round.matchups.forEach((match) => {
            const box = document.createElement("div");
            box.className = "bracket-box";
            box.textContent = match;
            box.addEventListener("click", () => {
                document.querySelectorAll(".bracket-box").forEach(el => el.classList.remove("selected"));
                box.classList.add("selected");
            });
            roundDiv.appendChild(box);
        });

        bracketContainer.appendChild(roundDiv);
    });
};

// Submit Predictions
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => {
    const selectedBox = document.querySelector(".bracket-box.selected");
    if (!selectedBox) {
        alert("Please make a selection!");
        return;
    }

    const prediction = selectedBox.textContent;
    const userId = `user_${Math.random().toString(36).substring(2, 15)}`;

    firebase.database().ref("predictions/" + userId).set({
        prediction: prediction,
        timestamp: Date.now()
    });

    alert("Prediction submitted!");
});

// Render Leaderboard
const leaderboardContainer = document.getElementById("leaderboard-container");
const renderLeaderboard = () => {
    firebase.database().ref("predictions").on("value", (snapshot) => {
        leaderboardContainer.innerHTML = "";
        const data = snapshot.val();

        for (let userId in data) {
            const entry = document.createElement("div");
            entry.className = "leaderboard-entry";
            entry.textContent = `User: ${userId} - Prediction: ${data[userId].prediction}`;
            leaderboardContainer.appendChild(entry);
        }
    });
};

// Initialize
renderBracket();
renderLeaderboard();
