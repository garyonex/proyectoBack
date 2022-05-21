const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const routeProductos = require('./routes/routes');
const Contenedor = require('./container');
const productos = new Contenedor(path.join(__dirname, './product.json'));

//INICIANDO SERVIDOR
const PORT = 3030;
const server = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});

//INDICAMOS PLANTILLAS A USAR
app.set('views', './views');
//encedemos la plantilla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//* MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/files');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

app.use(multer({ storage }).single('thumbnail'));

//Utilizando multer

//Rutas

// app.use('/productos', routeProductos)
app.get('/example', (req, res) => {
    const product = productos.getAll();
    res.render('index', { product: product });
});
app.post('/load-product', (req, res) => {
    const producto = req.body;
    const img = req.file;
    console.log(req.file)
    producto.thumbnail =  '/public/files'+ img
    
    res.json(productos.save(producto));
    res.redirect('/example')
});

