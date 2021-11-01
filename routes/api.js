const router = require("express").Router();
const Workout = require("../models/Workout")
// get last workout 
router.get("/api/workouts", (req, res) => {
    Workout.find().sort({ day: -1 }).limit(1)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;