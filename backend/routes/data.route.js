const express = require("express");
const { getHighscore, getHighscores, addHighscore, updateHighscore, deleteHighscore } = require("../controllers/score.controller");

const router = express.Router();

// GET
router.get("/:id?", async (req, res) => {
    try {
        const id = req.params.id;
        let data;
        if (id) {
            data = await getHighscore(id);
        } else {
            data = await getHighscores();
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/score/history", async (req, res) => {
    try {
        const result = await query("SELECT * FROM score_history");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// POST
router.post("/", async (req, res) => {
    try {
        const newData = req.body;
        console.log(`Adding ${newData} into DB`);
        const result = await addHighscore(newData);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// PUT
router.put("/update", async (req, res) => {
    try {
        const incomingData = req.body;
        console.log(`Changing data to now be ${incomingData}`);
        const result = await updateHighscore(incomingData);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Deleting data that matches id: ${id}`);
        const result = await deleteHighscore(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
