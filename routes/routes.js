const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');

const Contenedor = require('../container');
const productos = new Contenedor(path.join(__dirname, "../product.json"))
function init(){
    console.log('Iniciando');
    console.log('Productos Cargados:' , productos);
}
router.get('/',(req,res)=>{
    res.json(productos.content)
})

router.get('/:id',(req,res)=>{
    const id = Number(req.params.id)
    res.json(productos.getById(id))
})
//PARA AGREGAR
router.post('/',(req,res)=>{
    const producto= req.body
    const img = req.file
    console.log(producto);
    console.log(req.file)
    producto.imagen = img.filename;
    res.json({mensaje:'Archivo creado'})
    res.json(productos.save(producto))
})
//PARA SUSTITUIR
router.put('/:id',(req,res)=>{
    let obj = req.body
    let id =Number(req.params.id)
    return res.json(productos.update(id,obj))
})
//PARA ELIMINAR
router.delete('/:id',(req,res)=>{
    let id = Number(req.params.id)
    return res.json(productos.deleteById(id))
})

init()
module.exports=router