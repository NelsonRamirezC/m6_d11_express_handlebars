const express = require("express");
const { create } = require("express-handlebars");

const app = express();

//MIDDLEWARE
//DEJAMOS PUBLICA LA CARPETA PUBLIC
app.use("/public", express.static(__dirname +"/public"));

//crear instancia de hanblebars con configuración de carpeta de partials
const hbs = create({
    partialsDir: ["views/partials/"],
});

//registrar handlebars como motor de plantillas de la app de express.

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.listen(3000, () =>
    console.log("Servidor escuchando en http://localhost:3000")
);

//RUTAS DE VISTAS
//RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.render("home");
});

let productos = [
    {
        id: 1,
        nombre: "Perfume",
        precio: 500,
        img: "producto1.jpg",
    },
    {
        id: 2,
        nombre: "Vinagre",
        precio: 1000,
        img: "producto2.webp",
    },
    {
        id: 3,
        nombre: "Aceite de coco",
        precio: 2000,
        img: "producto3.webp",
    },
    {
        id: 4,
        nombre: "Aceite extra virgen",
        precio: 4500,
        img: "producto4.webp",
    },
];

app.get("/productos", (req, res) => {
    res.render("productos", {
        productos,
        titulo: "Lista de productos.",
    });
});

app.all("*", (req, res) => {
    res.render("error404", {
        layout: "error",
    });
});
