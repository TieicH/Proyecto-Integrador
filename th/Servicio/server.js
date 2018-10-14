

//referencia de las librerias	 NonSQL
var express    =require('express');
var mongoose   =require('mongoose');
var bodyparser =require('body-parser');//me ayuda a trabajr com mongoDB

//conectando a la base de datos
//----------------conecciones---------------!!
//driver = mongoose
//funcion= colback o captura de error
mongoose.connect('mongodb://localhost/Ventas',function(error){

	if(error){
		console.log('Error con la conexion');


	}else{
		console.log('Conexion correcta');
	}

});

//definiendo el esquema para usuario

var usuarioEsquema = mongoose.Schema({

	correo:String,
	clave:String

});
//se ejecuta y se crea la tabla(tablas == coleccion)
var usuario = mongoose.model('usuarios',usuarioEsquema);

//creando el servicio REST -- webstore
// verbos HTTP
//1- get obtiene select
//2- post inserts
//3- put para actualizar
//4- delete eliminar

var app = express();
app.use(bodyparser.urlencoded({extend:false}))
app.use(bodyparser.json());

//rauting es el proceso de dirigir las solicitudes enviada
//generando el rauting
var router = express.Router();

router.route('/usuarios').get(function(req,res){
//variable que crea la coleccion (find = select * from from)
//dentro de un servicio ---  request enviaa y recibe un response= servidor
usuario.find(function(error,resultado){
		if(error){
			//error 500 pa lagina no se encontro
			res.status(500).json({mensaje :'Error del servidor'});

		}else{
			// error 200  todo okey
			res.status(200).json({hola:true});
		}
});

})

.post(function(req,res){

var nuevoUsuario = new usuario();
nuevoUsuario.correo=req.body.correo;
nuevoUsuario.clave = req.body.clave;
//guardar--- en la base de datos
nuevoUsuario.save(function(err,resultado){
if(err){
	//pide request y emite respons
res.status(500).json({mensaje:'Error'});
}else
{
	//200 okey
	res.status(200).json(resultado);
}

});


});


app.use('/api',router);
app.listen(3001);
