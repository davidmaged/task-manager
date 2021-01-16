const express = require('express');
const app = express();

require('dotenv/config');

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');


/* load middleware */
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Load mongoose models */
const { List, Task } = require('./db/models');

/* Route handlers */

/* route lists */
app.get('/lists', (req,res) => {
    //return arry of list from datebase
    List.find({}).then((lists) => {
        res.send(lists)
    });
});

app.post('/lists', (req,res) =>{
    //create new list and return new list to the user with id
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

app.patch('/lists/:id', (req,res) => {
    //update list with id
    List.findByIdAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/lists/:id', (req,res) => {
    //delete list with id
    List.findByIdAndRemove({
        _id: req.params.id
    }).then((removedlistdoc) => {
        res.send(removedlistdoc);
    });
});

/* route tasks */
app.get('/lists/:listId/tasks', (req,res) => {
    //get all tasks with listId
    Task.find({
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    //get specfic task with taskId and listId
    Task.find({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

app.post('/lists/:listId/tasks', (req,res) => {
    // create new task in the listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});

app.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    //update tasks using taskId and listId
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: "Updated Succesfuly"});
    });
});

app.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    //update tasks using taskId and listId
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskdoc) => {
        res.send(removedTaskdoc);
    });
});

app.listen(3000, () => {
    console.log("Server listing on port 3000")
});