const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());

app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_current_password",
  port: 3306,
  database: "EmployeeDatabase",
  multipleStatements: true
});
db.connect((err) => {
  if (!err)
    console.log('Connection Established Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.post("/register", (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Category = req.body.Category;
  bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO login (Email,Password,Category) VALUES (?,?,?)",
      [Email, hash, Category],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});
app.post('/login', async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const user = db.query('SELECT * FROM login WHERE Email = ?', [Email], async (err, rows, fields) => {
    if (!err) {
      // console.log(req.body.Password, rows)
      const validPassword = await bcrypt.compare(req.body.Password, rows[0].Password);
      console.log("afetr bcrytpt");
      if (!validPassword) return res.status(400).json('Email and password combination does not match');

      // //generates token with user id
      const token = await jwt.sign({ _Email: Email }, "sbdwuebdwywyuYUAVDUYQWD", { expiresIn: '24h' });
      if (token) return res.status(200).json(token);
      // console.log(rows[0])
      // res.json(rows[0].Password)
    }

    else
      console.log(err);
  })
  if (!user) return res.status(400).json({ message: 'User not exists' });



  //res.json({message:'Logged in'});
})

app.get('/data', verify, (req, res) => {
  try {
    const user = db.query('SELECT * FROM login WHERE Email = ?', [decodedData._Email], (error, rows, fields) => {
      /*  console.log(rows); */
      return res.status(200).json({ rows });
    });
  } catch (error) {
    console.log("error");
  }
  /*  console.log(decodedData._Email);
   res.status(200).json({decodedData}) */
})

let decodedData = "";

//verify token
function verify(req, res, next) {
  const token = req.query.token;
  console.log(token);
  if (!token) return res.status(400).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, "sbdwuebdwywyuYUAVDUYQWD");
    decodedData = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token Expired' });
  }
}


app.get('/employee/get', (req, res) => {
  db.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});
app.get('/employee/:id', (req, res) => {
  db.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});
app.post('/add', (req, res) => {
  const EmployeeName = req.body.EmployeeName;
  const EmployeeSalary = req.body.EmployeeSalary;
  const Position = req.body.Position;


  db.query(
    "INSERT INTO employee (EmployeeName,EmployeeSalary,Position) VALUES (?,?,?)",
    [EmployeeName, EmployeeSalary, Position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const EmployeeName = req.body.EmployeeName;
  const EmployeeSalary = req.body.EmployeeSalary;
  const Position = req.body.Position;
  db.query(
    "UPDATE employee SET EmployeeSalary = ? WHERE id = ?",
    [EmployeeSalary, id, Position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get('/allData', (req, res) => {
  db.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});
app.listen(3001, () => {
  console.log('Server running at port 3001')
});
