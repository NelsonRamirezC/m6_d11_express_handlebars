const express = require("express");
const { create } = require("express-handlebars");
const { v4: uuid } = require("uuid");

const app = express();

//MIDDLEWARE
//DEJAMOS PUBLICA LA CARPETA PUBLIC
app.use("/public", express.static(__dirname + "/public"));

/*
si el cliente manda un objeto de notación javascript
dicho objeto quedará guardado en req.body
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.render("home", {
        homePage: true,
    });
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
        productsPage: true,
    });
});

app.get("/productos/add", (req, res) => {
    res.render("productosAdd");
});

//ENDPOINTS
app.post("/api/productos", (req, res) => {
    let { nombre, precio } = req.body;
    let nuevoProducto = {
        id: uuid().slice(0, 6),
        nombre,
        precio,
        img: "producto1.jpg",
    };

    productos.push(nuevoProducto);

    res.status(201).send({ code: 201, message: "Producto creado con éxito." });
});

app.all("*", (req, res) => {
    res.render("error404", {
        layout: "error",
    });
});
