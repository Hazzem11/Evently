const express = require("express");

const mysql = require("mysql");

const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",  // Change to the Docker container name or IP address
  user: "root",
  password: "HzmSlm_11",  // Use the password specified in docker-compose.yml
  database: "Evently_db"
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  console.log("Login request received. Email:", req.body.email, "Password:", req.body.password);

  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("Error during database query:", err);
      return res.status(500).json("Error");
    }
    
    if (data.length > 0) {
      console.log("Login successful for email:", req.body.email);
      return res.status(200).json("Success");
    } else {
      console.log("Login failed for email:", req.body.email);
      return res.status(401).json("Fail");
    }
  });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
