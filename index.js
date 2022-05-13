const express = require('express');
const app = express();
const multer = require('multer');
const morgan = require('morgan');
const routeProductos= require('./routes/routes')


//INICIANDO SERVIDOR
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});

//Middleware

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

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
app.use('/productos', routeProductos)

