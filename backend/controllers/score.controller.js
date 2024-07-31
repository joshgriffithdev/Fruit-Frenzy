const query = require("../config/connection.js");

// Fetch current highscores inside an async function or during initialization
async function initializeHighscores() {
    return await getHighscores();
}

let currHighscores;
initializeHighscores().then(highscores => {
    currHighscores = highscores;
}).catch(err => {
    console.error("Failed to initialize highscores:", err);
});

async function getHighscore(highscoreID) {
    return await query("SELECT * FROM leaderboard WHERE player_id = ?", [highscoreID]);
}

async function getHighscores() {
    return await query("SELECT * FROM leaderboard ORDER BY highscore DESC");
}

async function addHighscore(newHighscore) {
    newHighscore.player_id = undefined;
    return await query("INSERT INTO leaderboard SET ?", [newHighscore]);
}

async function updateHighscore(highscoreData) {
    let isGreater = false;
    let lbIndex = 0;

    const testing = await query("SELECT * FROM leaderboard");
    let scoreArr = testing.map(row => row.highscore);
    console.log(scoreArr);

    // Check if score is greater than any scores. If it's not, do nothing
    for (let i = 0; i < scoreArr.length; i++) {
        if (highscoreData.score >= scoreArr[i]) {
            isGreater = true;
            lbIndex = i + 1;
            break;
        }
    }

    // Get input for their name 
    const newName = highscoreData.name;

    if (isGreater) {
        const playerID = await query("SELECT player_id FROM leaderboard ORDER BY highscore ASC LIMIT 1;");
        const playerIDValue = playerID[0].player_id;

        // Delete the lowest score
        await query("DELETE FROM leaderboard WHERE player_id = ?", [playerIDValue]);

        // Insert the new high score with placeholders for name and score
        const insertResults = await query("INSERT INTO leaderboard (name, highscore) VALUES (?, ?)", [highscoreData.name, highscoreData.score]);

        return insertResults;
    } else {
        return null;
    }
}

async function checkHighscores(yourScore) {
    if (!currHighscores) {
        currHighscores = await getHighscores();
    }
    for (let i = 0; i < currHighscores.length; i++) {
        if (yourScore >= currHighscores[i].highscore) {
            let checkID = i;
            return await updateHighscore({ score: yourScore, name: 'YourName' }); // Provide the name as part of the data
        }
    }
}

async function sendHighscores() {
    return await query("SELECT * FROM leaderboard ORDER BY highscore DESC");
}

async function deleteHighscore(id) {
    return await query("DELETE FROM leaderboard WHERE player_id = ?", [id]);
}

module.exports = {
    getHighscore,
    getHighscores,
    addHighscore,
    updateHighscore,
    deleteHighscore,
    checkHighscores,
    sendHighscores
}
