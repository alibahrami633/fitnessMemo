const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let day = new Date().setDate(new Date().getDate());

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: day
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            name: {
                type: String,
                trim: true
            },
            duration: {
                type: Number,
                min: [0, "Don't be an idiot! :D."],
                max: [300, "You're bluffing! pffff..."]
            },
            distance: {
                type: Number,
                min: [0, "Don't be an idiot! :D."],
                max: [100, "You're bluffing! pffff..."]
            },
            weight: {
                type: Number,
                min: [0, "Don't be an idiot! :D."],
                max: [1000, "You're bluffing! pffff..."]
            },
            reps: {
                type: Number,
                min: [0, "Don't be an idiot! :D."],
                max: [50, "You're gonna kill yourself dude!"]
            },
            sets: {
                type: Number,
                min: [0, "Don't be an idiot! :D."],
                max: [50, "You're gonna kill yourself dude!"]
            },
            _id: false
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;