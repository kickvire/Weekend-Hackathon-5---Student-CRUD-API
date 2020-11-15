const express = require('express')
const app = express()
const bodyParser = require("body-parser");
//const studentArray = require('./InitialData');
var studentArray = [{
    id: 1,
    name: 'Jayesh',
    currentClass: 5,
    division: 'A'
},
{
    id: 2,
    name: 'Minakshi',
    currentClass: 12,
    division: 'C'
},
{
    id: 3,
    name: 'Drisham',
    currentClass: 7,
    division: 'C'
},
{
    id: 4,
    name: 'Kamlesh',
    currentClass: 7,
    division: 'A'
},
{
    id: 5,
    name: 'Dhoni',
    currentClass: 10,
    division: 'D'
},
{
    id: 6,
    name: 'Piyush',
    currentClass: 10,
    division: 'A'
},
{
    id: 7,
    name: 'Aansh',
    currentClass: 8,
    division: 'A'
}]

const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student',(req,res)=>{
    res.send(studentArray);
})
app.get('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const student=studentArray.find(student=>student.id===parseInt(id));
    if(!student){
        res.status(404);
        return;
    }
    res.send(student);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
