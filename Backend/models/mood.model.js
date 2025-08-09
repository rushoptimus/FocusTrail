import mongoose from "mongoose";
const moodSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    moods:[
        {
        mood:{
            type:String,
            enum:["happy","good","angry","sad","cry"],
            required:true,
    },
    time:{
        type:String,
        default:() => new Date().toTimeString().split(" ")[0].slice(0,5),
        required:true,
    }
    }
]

},{timestamps:true});

moodSchema.index({userID:1,date:1},{unique:true});

export default mongoose.model("Mood", moodSchema);

