const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://sayali:sayalijadhav@cluster0.vgf4quo.mongodb.net/projectHub?retryWrites=true&w=majority");

module.exports={connection}

// https://taskhub-hvv2.onrender.com