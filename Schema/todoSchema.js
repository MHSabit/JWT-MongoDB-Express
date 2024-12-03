const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    details : String,
    active : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    valid: {
        type : String,
        enum : ['YES', 'NO'],
        default : 'NO'
    },
    date : {
        type : Date,
        default : Date.now,
    },
    point : Number,
});


const TodoModel = mongoose.model("Todo", todoSchema);
module.exports = TodoModel;
