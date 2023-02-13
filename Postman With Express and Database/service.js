const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: 'pompam_2544',  // <== ระบุให้ถูกต้อง
    database: 'pim_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get("/students", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.status(200).send(rows[0]);
})

app.get("/students/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students where id = ' + id)
    res.status(200).send(rows[0]);
})

app.delete("/students/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await dbConn
    await connection.query('DELETE FROM students WHERE id = ' + id)
    res.status(204).send();
})
/*
{
    "name": "Son",
    "age": 26,
    "phone": "0123456789",
    "email": "son@gmail.com"
}
*/
app.post("/students", async (req, res) => {
    const name = req.body.name;
    const age = +req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query(`INSERT INTO students(name, age, phone, email) values ("${name}", ${age}, "${phone}", "${email}")`)
    res.status(201).send({ result: "success" });
})

app.put("/students/:id", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = +req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query(`UPDATE students SET name = "${name}", age = ${age}, phone = "${phone}", email = "${email}" WHERE id = ${id}`)
    res.status(201).send({ result: "update success" });
})


app.listen(3000, () => {
    console.log("Server is running at port 3000")
})
