const router = require("express").Router();
const db = require("../models");


// html routers
router.get("/", (req, res) => {
    res.sendFile('index.html', { root: "./public" });
});

router.get("/exercise", (req, res) => {
    res.sendFile('exercise.html', { root: "./public" });
});

router.get("/stats", (req, res) => {
    res.sendFile("stats.html", { root: "./public" });
});

// app routers
router.get("/api/workouts", async function (req, res) {
    try {
        const result = await db.Workout.find({});
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error fetching Workouts list!");
    }
});

router.get("/api/workouts/range", async function (req, res) {
    try {
        const result = await db.Workout.find({});
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error fetching Workouts list!");
    }
});

router.post("/api/workouts", async function (req, res) {

    try {
        const result = await db.Workout.create(req.body);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Add workout failed!");
    }
});

router.put("/api/workouts/:id", async function (req, res) {
    try {
        let id = req.params.id;
        const { type, name, weight, sets, reps, duration, distance } = req.body;

        let exercise;

        if (type === "cardio") {
            exercise = { type, name, duration, distance };
        } else if (type === "resistance") {
            exercise = { type, name, duration, weight, reps, sets };
        } else return res.status(400).send("Error: Exercise type not supported.");

        const result = await db.Workout.updateOne(
            { _id: id },
            { $push: { exercises: exercise } },
            { runValidators: true }
        );

        console.log(result);
        return res.json(result);
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(422).json(error.errors["exercises"].message);
        }

        console.log(error);
        return res.status(422).send("Edit Workout failed!");
    }
});

module.exports = router;