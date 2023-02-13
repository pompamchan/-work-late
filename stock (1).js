const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

app.post("/api/product",async  (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '', // <== ระบุให้ถูกต้อง
        database: 'stock', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306)
    });

    const sql = 'INSERT INTO stock(product_name, stock_left, category) VALUES ("'+
        req.body.product_name +'", "'+
        req.body.stock_left +'", "'+
        req.body.category +'")';
    console.log(sql);
    await connection.query(sql);

    res.status(200).json(req.body)

})

app.put("/api/product/:id",async  (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '', // <== ระบุให้ถูกต้อง
        database: 'stock', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306)
    });

    const sql = 'UPDATE stock SET '+
        'product_name="' + req.body.product_name +'" '+
        'stock_left="' + req.body.stock_left +'" '+
        'category="' + req.body.category +'" '+
        'WHERE id='+ req.params.id;
    console.log(sql);
    await connection.query(sql);

    res.status(200).json(req.body)

})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})