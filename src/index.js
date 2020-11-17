const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

const data = require('./InitialData.js');
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student',(req,res) => {
    res.send(data);
});

app.get('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const student = data.find((student) => student.id === parseInt(id));
    if(!student) {
        res.status(404).send("Error");
        return;
    }
    res.send(student);

});

app.post('/api/student',(req,res) => {
    const {name, currentClass, division} = req.body;
    if((!name) || (!currentClass) || (!division)) {
        res.status(400).send("Error");
        return;
    }
    const newStudent = {
        id: data.length + 1,
        name: name,
        currentClass: currentClass,
        division: division
    }
    data.push(newStudent);
    res.send(newStudent.id);

});

app.put('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const student = data.find(student => student.id === parseInt(id));
    const newName = req.body.name;
    if((!student) || (!newName)) { 
        res.status(400).send("Error");
        return;
    }
    student.name = newName;
    res.send(student);

});

app.delete('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const studentIndex = data.findIndex((student) => parseInt(id) === student.id);
    if(studentIndex === -1) {
        res.status(404).send("Error");
        return;
    }
    
    data.splice(studentIndex,1);
    res.status(200).send(`${id} is valid`)
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
