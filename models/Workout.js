const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let day = new Date().setDate(new Date().getDate());

const WorkoutSchema = new Schema({
    day: {
        type: mongoose.Schema.Types.Date,
        default: day
    },
    exercises: [
        {
            type: {
                type: mongoose.Schema.Types.String,
                trim: true,
                enum: ["cardio", "resistance"]
            },
            name: {
                type: mongoose.Schema.Types.String,
                trim: true
            },
            duration: {
                type: mongoose.Schema.Types.Number,
                min: [0, "Don't be an idiot! :D."],
                max: [300, "You're bluffing! pffff..."]
            },
            distance: {
                type: mongoose.Schema.Types.Number,
                min: [0, "Don't be an idiot! :D."],
                max: [100, "You're bluffing! pffff..."]
            },
            weight: {
                type: mongoose.Schema.Types.Number,
                min: [0, "Don't be an idiot! :D."],
                max: [1000, "You're bluffing! pffff..."]
            },
            reps: {
                type: mongoose.Schema.Types.Number,
                min: [0, "Don't be an idiot! :D."],
                max: [50, "You're gonna kill yourself dude!"]
            },
            sets: {
                type: mongoose.Schema.Types.Number,
                min: [0, "Don't be an idiot! :D."],
                max: [50, "You're gonna kill yourself dude!"]
            },
            _id: false
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;