const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const jwtSecret = "124194129721vbskhdbcdbsjbcdkab1469237145436578263919hfsvbhsbdkcbaksb187t41834461"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    session: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    // return the document withot password and the session
    return _.omit(userObject, ['password', 'session'])
}

UserSchema.methods.generateAccessAuthToken = function(){
    const user = this;
    return new Promise((resolve, reject) => {
        // create json web token
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15m"}, (err, token) => {
            if(!err){
                resolve(token);
            }else{
                reject();
            }
        })
    })
}

UserSchema.methods.generateRefreshAuthToken = function(){
    return new Promise((resolve, reject) => {
        
    })
}