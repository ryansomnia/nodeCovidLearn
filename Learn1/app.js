const express = require('express');
const app = express();
const port = 4500;

const dbconnect = require("./config/db");



app.get("/", (req, res) => res.send("respon node js berhasil"));

app.use(express.urlencoded({
    extended: true
}));


dbconnect.authenticate().then(() =>
    console.log("database connected"));

const user = require('./model/User');


app.post("/user", async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const newUser = new user({
            username,
            email,
            password
        });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")

    }
});


app.get("/user", async (req, res) => {
    try {
        const getAll = await user.findAll({})
        res.json(getAll)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id

        const getUser = await user.findOne({
            where: {
                id: id
            }
        });
        res.json(getUser)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


app.delete("/user/:id", async (req, res) => {
    try {
        const id = req.params.id

        const deleteUser = await user.destroy({
            where: {
                id: id
            }
        })

        await deleteUser;

        res.json("berhasil dihapus")
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


app.put("/user/:id", async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body

        const id = req.params.id;

        const updateUser = await user.update({
            username,
            email,
            password
        }, {
            where: {
                id: id
            }
        });

        await updateUser;

        res.json("berhasil diupdate")
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

app.listen(port, () => console.log(`port berjalan di ${port}`));