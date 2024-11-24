//Todo lo que se escriba fuera de una funcion se va a ejecutar una sola vez en el momento en que se cargue el script al ScriptEngine
var agarroCaja = false;

function Init(){
    modulo.getPantallaActual().agregarBotonesAlArray(cargarImagenes(sketch.leerArchivo('/save/imagenes.json')));
}

function Update(){
    updateTimer();
}

function Click(a){}

function Dibujar(){
    
    //Mostrar texto del cronometro
    sketch.texto((segs +":"+(((actual_time/1000)-segs).toFixed(2))*100), sketch.crearVector(653,68));
}

//Variables
function settime(relleno){time = 0;}
function setactual_time(t){actual_time = parseInt(t);}
function setsegs(relleno){segs = 0;}

//Cositas
function updateTimer(){
    actual_time -= sketch.time.DeltaTime();
    segs = Math.floor(actual_time/1000);
    if (actual_time<=0){
        sketch.setModPath(modulo.getSig());
        sketch.mandarACargar();
    }
}

//parsea el JSON y carga las imagenes como un array de botones y los devuelve
function cargarImagenes(file){
    var json = JSON.parse(file);
    var botones = [json.imagenes.length];

    for (var i=0;i<json.imagenes.length;i++){
        var path = json.imagenes[i].path;
        var id = json.imagenes[i].id;

        botones[i] = sketch.crearBoton(sketch.escalar(sketch.crearVector(82*i,638)),sketch.escalar(sketch.crearVector(82,82)),sketch.crearColor(0,0,0,255),sketch.crearColor(0,0,0,255),modulo,'scripts/juego3/caja.js');

        //Le agrego las variables que necesita porque el constructor no las va a cargar
        botones[i].agregarVariable('img',path);
        botones[i].agregarVariable('id',toString(id));
    }

    return botones;
}

//Cosas para cosas
function agarraCaja(){agarroCaja=true;}
function sueltaCaja(){agarroCaja=false;}