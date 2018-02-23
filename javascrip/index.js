/**
 * En mi aplicacion me he centrado en que sea Recizable para cualquier tipo de pantalla y ventana
 */

window.onload = function(){
    crearPrincipal(); //crear la ventana principal
    divMenu.style.backgroundImage = "url('./image/init_index.png')"; //poner la imagen inicial como fondo del cuerpo principal
    for(var i = 0; i<6;i++){ //bucle para crear las opciones.
        opciones[i] = new Opcion("opcion"+i,i);
        opciones[i].crearOpcion();
    }
}

var opcionActual = null; //variable global para saber en que opcion se está

//recizable
var rz = null;
window.onresize = function(){
    clearTimeout(rz);
    rz = setTimeout(resizing, 10);
};

//cuerpo principal
var dimenciones; //El secreto de que sea todo Recizable es que todo esta en base a esta variable
var topMenu;
var leftMenu;
var divMenu
function crearPrincipal(){
    //esta variable depende del tamaño de la ventana
    var puntoIntermedioY = window.innerHeight / 2; 
    var puntoIntermedioX = window.innerWidth / 2;

    if(puntoIntermedioX >= puntoIntermedioY){ //si el ancho es mañor o igual al alto de la ventana
        dimenciones = puntoIntermedioY * 1.2; // tomamos como guia el alto
    }
    else{
        dimenciones = puntoIntermedioX * 1.2; // si no el ancho, asi siempre tomamos la dimensión menor
    }
    //los valores del cuerpo principal.
    topMenu = puntoIntermedioY-(dimenciones/2);
    leftMenu = puntoIntermedioX-(dimenciones/2);
    divMenu = document.getElementById("menu");
    divMenu.style.setProperty("width",dimenciones+"px");
    divMenu.style.setProperty("height",dimenciones+"px");
    divMenu.style.setProperty("left",leftMenu+"px");
    divMenu.style.setProperty("top", topMenu +"px");
}

//La funcion para que sea resizable
function resizing(){
    crearPrincipal(); //vuelve a valorar el ancho y alto de la ventana para el tamaño del cuerpo principal
    for(var i = 0; i<opciones.length;i++){ //recalcula las distintas dimensiones de las opciones
        opciones[i].situarOpcion();
    }
    if(opcionActual != null){ //si estamos en cualquier opcion que no sea el inicial
        for(var i = 0; i<botones.length;i++){ //recalculamos las dimensiones de los distintos botones
            botones[i].posicionar();
        }
    }
}


//Objeto opciones
var opciones = [,,,,,];//variable donde se guardarán los apuntadores a todas las opciones;

function Opcion(identificador,posicion) {
    this.ident = identificador;
    this.posic = posicion;
}
Opcion.prototype.crearOpcion = function () {
    this.divOpcion = document.createElement("div"); 
    this.divOpcion.className = "opcion";
    this.divOpcion.id = this.ident + "";
    this.situarOpcion(); //la funcion para situar las distintas opciones y el valor del src de la imagen
    this.divOpcion.onmouseover = this.mover;
    this.divOpcion.onmouseout = this.volver;
    this.divOpcion.onclick = this.clickOpcion;
    this.divOpcion.style.backgroundImage = "url('"+this.srcImagen+"')";
	document.getElementById("index").appendChild(this.divOpcion);
}
Opcion.prototype.situarOpcion = function(){
    this.dimenOpcion = (dimenciones/2);
    this.divOpcion.style.setProperty("width",this.dimenOpcion + "px") ;
	this.divOpcion.style.setProperty("height",this.dimenOpcion + "px") ; 
    switch(this.posic){
        case 0:
            this.topOpcion = topMenu - (this.dimenOpcion/8) ;
            this.leftOpcion = leftMenu - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_personajes.png";
            break;
        case 1:
            this.topOpcion = topMenu - (this.dimenOpcion/2);
            this.leftOpcion = leftMenu + (dimenciones/2) - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_peliculas.png";
            break;
        case 2:
            this.topOpcion = topMenu - (this.dimenOpcion/8);
            this.leftOpcion = leftMenu + dimenciones - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_especies.png";
            break;
        case 3:
            this.topOpcion = topMenu + dimenciones - this.dimenOpcion + (this.dimenOpcion/8);
            this.leftOpcion = leftMenu - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_vehiculos.png";
            break;
        case 4:
            this.topOpcion = topMenu + dimenciones - (this.dimenOpcion/2);
            this.leftOpcion = leftMenu + (dimenciones/2) - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_inicio.png";
            break;
        case 5:
            this.topOpcion = topMenu + dimenciones - this.dimenOpcion + (this.dimenOpcion/8);
            this.leftOpcion = leftMenu + dimenciones - (this.dimenOpcion/2);
            this.srcImagen = "./image/opcion_naves.png";
            break;
    }
    this.divOpcion.style.top = this.topOpcion + "px";
    this.divOpcion.style.left = this.leftOpcion + "px";

    
}

//métodos para la interaccion de cada div de opcion
Opcion.prototype.mover = function(){
    var antiguoTop = this.style.top.replace("px","")-0;
    var antiguoleft = this.style.left.replace("px","")-0;
    var widthDiv = this.style.width.replace("px","")-0;
    var topDiv;
    var leftDiv;
    switch(this.id){
        case "opcion0":
            topDiv = antiguoTop - (widthDiv/8);
            leftDiv = antiguoleft - (widthDiv/8);
            break;
        case "opcion1":
            topDiv = antiguoTop - (widthDiv/4);
            leftDiv = antiguoleft;
            break;
        case "opcion2":
            topDiv = antiguoTop - (widthDiv/8);
            leftDiv = antiguoleft + ((widthDiv/8)-0);
            break;
        case "opcion3":
            topDiv = antiguoTop + ((widthDiv/8)-0);
            leftDiv = antiguoleft - (widthDiv/8);
            break;
        case "opcion4":
            topDiv = antiguoTop + ((widthDiv/4)-0);
            leftDiv = antiguoleft;
            break;
        case "opcion5":
            topDiv = antiguoTop + ((widthDiv/8)-0);
            leftDiv = antiguoleft + (widthDiv/8);
            break;
    }
    this.style.top = topDiv + "px";
    this.style.left = leftDiv + "px";  
}

Opcion.prototype.volver = function(){
    var antiguoTop = this.style.top.replace("px","")-0;
    var antiguoleft = this.style.left.replace("px","")-0;
    var widthDiv = this.style.width.replace("px","")-0;
    var topDiv;
    var leftDiv;
    switch(this.id){
        case "opcion0":
            topDiv = antiguoTop + ((widthDiv/8)-0);
            leftDiv = antiguoleft + ((widthDiv/8)-0);
            break;
        case "opcion1":
            topDiv = antiguoTop + ((widthDiv/4)-0);
            leftDiv = antiguoleft;
            break;
        case "opcion2":
            topDiv = antiguoTop + ((widthDiv/8)-0);
            leftDiv = antiguoleft - (widthDiv/8);
            break;
        case "opcion3":
            topDiv = antiguoTop - (widthDiv/8);
            leftDiv = antiguoleft + ((widthDiv/8)-0);
            break;
        case "opcion4":
            topDiv = antiguoTop - (widthDiv/4);
            leftDiv = antiguoleft;
            break;
        case "opcion5":
            topDiv = antiguoTop - (widthDiv/8);
            leftDiv = antiguoleft - (widthDiv/8);
            break;
    }
    this.style.top = topDiv + "px";
    this.style.left = leftDiv + "px";  
}

Opcion.prototype.clickOpcion = function() {
    switch(this.id){
        case "opcion0":
            opcionActual = 0;
            descargaArchivo(raizAPI+personajesAPI);
            break;
        case "opcion1":
            opcionActual = 1;
            descargaArchivo(raizAPI+peliculasAPI);
            break;
        case "opcion2":
            opcionActual = 2;
            descargaArchivo(raizAPI+especiesAPI);
            break;
        case "opcion3":
            opcionActual = 3;
            descargaArchivo(raizAPI+vehiculosAPI);
            break;
        case "opcion4":
            opcionActual = null;
            location.reload(true);
            break;
        case "opcion5":
            opcionActual = 4;
            descargaArchivo(raizAPI+navesAPI);
            break;
    }
}

//Objeto boton
var botones = [,,,,,,,,,];//array para guardar opciones
function Boton(iden,titulo){
    this.ident = iden;
    this.titulo = titulo;
}

Boton.prototype.crear = function(){
    this.divBoton = document.createElement("div"); 
    this.divBoton.className = "boton";
    this.divBoton.id = this.ident + "";
    this.divBoton.appendChild(document.createTextNode(this.titulo));
    this.paddinBoton = 0;
    if(this.titulo.length <= 18){
        this.divBoton.style.paddingTop = dimenciones/40 + "px";
    }
    else {
        this.paddinBoton = dimenciones/40;
    }
    this.posicionar();
	divMenu.appendChild(this.divBoton);
}

Boton.prototype.posicionar = function(){
    this.divBoton.style.top = dimenciones/7 +"px";
    this.divBoton.style.left = dimenciones/8 +"px";
    this.divBoton.style.margin = dimenciones/50+"px";
    this.divBoton.style.height = (dimenciones/14 + this.paddinBoton-0) + "px";
    this.divBoton.style.width = dimenciones/3 +"px";
    this.divBoton.style.fontSize = dimenciones/26 + "px";
}



//descarga de la API
//constantes que utilizaré pra las llamadas al servidor
const raizAPI = "https://swapi.co/api/";
const personajesAPI = "people/";
const peliculasAPI = "films/";
const especiesAPI = "species/";
const vehiculosAPI = "vehicles/";
const navesAPI = "starships/";
const pagAPI = "?page=";

function descargaArchivo(url) {
    //pantalla de carga
    borrarCuerpo(); //borro el interior
    divMenu.style.backgroundImage = "url('./image/fondo_cargando.png')"; // pongo como fondo la imagen

    // Obtener la instancia del objeto XMLHttpRequest
    if(window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar la funcion de respuesta
    peticion_http.onreadystatechange = muestraContenido;

    // Realizar peticion HTTP
    peticion_http.open('GET', url, true);
    peticion_http.send(null);
    function muestraContenido() {
        if(peticion_http.readyState == 4) {
            if(peticion_http.status == 200) {
                crearCuerpo(eval("(" + peticion_http.responseText+ ")"));
            }
        }				
    }
}


//funciones de creador y borrado del cuerpo principal

//borra el fondo y los div que estan dentro del cuerpo principal "divMenu"
function borrarCuerpo(){ 
    if(divMenu.style.backgroundImage != null){
        divMenu.style.backgroundImage = null;
    }
    while(divMenu.firstChild) {
        divMenu.removeChild(divMenu.firstChild);
    }
}


//genera todo el cuerpo principal
function crearCuerpo(resultadoJson){
    borrarCuerpo();//para borrar la pantalla de carga
    
    //la API viene paginada por gupos de 10 elementos, aqui valoro si esta paginada o no
    var maxNumBotones;
    if(resultadoJson.count < 10){
        maxNumBotones = resultadoJson.count;
    }
    else {
        maxNumBotones = 10;
    }

    //la funcion cuando se da click en uno de los bontones
    function onclickBoton(evento){
        var aux = resultadoJson.results[evento.target.id];
        var divPrincipal = document.createElement("div");
        divPrincipal.id= "cartaInformativa";
        var textoCarta1 = "" //provicional
        switch(opcionActual){
            case 0:
                textoCarta = "Name: " + aux.name  + " Heigth: " + aux.height + "  Gender: " + aux.gender + " Brith Day: " + aux.birth_year + 
                "  Hair Color: " + aux.hair_color + " Eye Color: " + aux.eye_color;
                break;
            case 1:
                textoCarta = "Title: "+ aux.title + " Episode: "+ aux.episode_id + "  Director: " + aux.director + " Producers: " + aux.producer +
                "  Release Date: " + aux.release_date;
                break;
            case 2:
                textoCarta = "Name: " + aux.name  + " Lifespan: " + aux.average_lifespan + "  Languages: "+ aux.language + " Height: " + aux.average_height +
                "  Classification: " + aux.classification + " Designation: "+ aux.designation;
                break;
            case 3:
                textoCarta = "Name: " + aux.name  
                break;
            case 4:
                textoCarta = "Name: " + aux.name  
                break;
        }
        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(textoCarta));
        divPrincipal.appendChild(h3);
        divPrincipal.style.top = (dimenciones/10) + "px";
        divPrincipal.style.left = (dimenciones /10) + "px";
        divPrincipal.style.height = dimenciones - (dimenciones/10) + "px";
        divPrincipal.style.width = dimenciones - (dimenciones/10) + "px";
        divPrincipal.style.fontSize = dimenciones/15 + "px";
        divMenu.appendChild(divPrincipal);
        divPrincipal.onclick = function(){
            divMenu.removeChild(divMenu.lastChild);
        }
    }

    //la creacion de todos los botones
    for(var i = 0; i < maxNumBotones; i++ ){
        botones[i] = new Boton(i,resultadoJson.results[i].name || resultadoJson.results[i].title);
        botones[i].crear();
        botones[i].divBoton.onclick = onclickBoton;
    }
   //falta la creacion de la paginacion
}
/**
 * Me queda por hacer todo el css, pues solo esta puesto lo basico y comun,
 * implementar la paginacion y crear bien las cartas informativas de cada elemento,
 * asi como poner fotos, bordes y calcular mejor el tamaño de las letras.
 */