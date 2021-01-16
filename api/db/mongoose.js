// connect to mongo db

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}).then(() =>{
    console.log('connected to mongoDB succesfully');
}).catch((e) => {
    console.log("error while try to connect to mongoDB");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};

// 'mongodb://localhost:27017/TaskManager'