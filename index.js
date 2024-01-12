var con = require('./connection.js');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.send('<h1>HOME PAGE</h1>');
});

app.get('/oneget', (req, res) => {
    var sql = `select * from student where semester=5 order by totalMarks desc limit 5;`;

    con.query(sql, (err, result) => {
      if(err) throw err;

      res.render(__dirname+'/one', {students:result});
    });
});

app.get('/twoget', (req, res) => {
  res.sendFile(__dirname+'/two.html');
});

app.post('/twopost', (req, res) => {
  var details = req.body;

  var sql = `insert into student(rollNo, usn, studName, totalMarks, deptId, email, semester) values (${details.rollNo}, "${details.usn}", "${details.name}", ${details.marks}, ${details.deptId}, "${details.email}", ${details.semester});`;

  con.query(sql, (err, result) => {
    if(err) throw err;
    res.send('<h1>ONE RECORD ADDED</h1>');
  });
});

app.get('/threeget', (req, res) => {
  var sql = `select * from student join department on student.deptId=department.deptId where (semester=3 or semester=5) and department.deptName='SoCSE';`;

  con.query(sql, (err, result) => {
    if(err) throw err;

    res.render(__dirname+'/one', {students:result});
  })
});

app.get('/fourget', (req, res) => {
  var sql = `delete from student where totalMarks<200`;

  con.query(sql, (err, result) => {
    if(err) throw err;
    res.send('<h1>STUDENTS DELETED</h1>');
  });
});

app.get('/fiveget', (req, res) => {
  var sql = `select count(*) as totalStudents from student;`;

  con.query(sql, (err, result) => {
    if(err) throw err;

    res.send(`<h1>${result[0].totalStudents} STUDENTS DELETED</h1>`);
  });
});


app.listen(9090);