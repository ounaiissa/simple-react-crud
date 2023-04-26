const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; font-src 'self' http://localhost:8082/DMSans-Regular.ttf; script-src 'self'; connect-src 'self' http://localhost:8082/create"
    );
    next();
  });
  
  

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});


app.get("/", (req, res) => {
    // res.json("hey from backend..");
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, data)=>{
        if(err) return res.json("There is no data found")
        return res.json(data);
    })
});

app.post('/create', (req, res)=>{
    console.log('Received data:', req.body);
    const sql = "INSERT INTO student (name, email) VALUES ?";
    const values = [
        [req.body.name, req.body.email]
    ];
    console.log('SQL:', sql, values);
    db.query(sql, [values], (err, data) => {
        console.log('Error:', err); 
        console.log('Result:', data); 
        if(err) return res.json("error");
        return res.json(data);
    })
});


app.put('/update/:id', (req, res)=>{
    const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email
      ];

    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("error");
        return res.json(data);
    })
});



app.delete('/student/:id', (req, res)=>{
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [ id], (err, data) => {
      if(err) return res.json("error");
      return res.json(data);
  })
});



app.listen(8082, ()=>{
    console.log("listening...");
});
