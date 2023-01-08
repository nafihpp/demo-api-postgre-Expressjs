const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//port defining
port = 3000;

//middlewares
app.use(cors());
app.use(express.json());

//create a data
app.post("/datas", async (req, res) => {
    try {
        const { description } = req.body;
        const newData = await pool.query(
            "INSERT INTO datas (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newData.rows[0]);
        console.log(newData);
    } catch (err) {
        console.log(err.message);
    }
});
//get all data
app.get("/datas", async (req, res) => {
    try {
        const allData = await pool.query("SELECT * FROM  datas");
        res.json(allData.rows);
    } catch (error) {
        console.log(err.message);
    }
});
//get certain id data
app.get("/datas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const agentId = await pool.query(
            "SELECT * FROM datas WHERE datas_id = $1",
            [id]
        );
        res.json(agentId.rows);
    } catch (err) {
        console.log(err.message);
    }
});
//Reset Complete data of an id
app.delete("/datas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComplete = await pool.query(
            "DELETE FROM datas WHERE datas_id = $1",
            [id]
        );
        res.json(deleteComplete);
    } catch (err) {
        console.log(err.message);
    }
});
//Listening Port
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
