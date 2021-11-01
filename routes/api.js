const path = require("path");
const router = require("express").Router();
const Workout = require("../models/Workout")



// get last workout 
router.get("/api/workouts", (req, res) => {
    Workout.find().sort({ day: -1 }).limit(1)
    Workout.aggregate([ // adds duration fields of exercises as "Total Workout Duration" 
        {
            $addFields: {
                totalDuration: {
                    $sum: `$exercises.duration`
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// get routes for html paths
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;