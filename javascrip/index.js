window.onload = function(){
    crearPrincipal();
    for(var i = 0; i<6;i++){
        opciones[i] = new Opcion("opcion"+i,i);
        opciones[i].crearOpcion();
    }
}

//recizable

var rz = null;
window.onresize = function(){
    clearTimeout(rz);
    rz = setTimeout(resizing, 10);
};


var dimenciones;
var topMenu;
var leftMenu;
var divMenu
function crearPrincipal(){
    var puntoIntermedioY = window.innerHeight / 2;
    var puntoIntermedioX = window.innerWidth / 2;
    if(puntoIntermedioX >= puntoIntermedioY){
        dimenciones = puntoIntermedioY;
    }
    else{
        dimenciones = puntoIntermedioX;
    }
    topMenu = puntoIntermedioY-(dimenciones/2);
    leftMenu = puntoIntermedioX-(dimenciones/2);
    divMenu = document.getElementById("menu");
    var imgMenu = document.getElementById("imgMenu");
    //imgMenu.style.setProperty("width",dimenciones+"px");
    //imgMenu.style.setProperty("height",dimenciones+"px");
    divMenu.style.setProperty("width",dimenciones+"px");
    divMenu.style.setProperty("height",dimenciones+"px");
    divMenu.style.setProperty("left",leftMenu+"px");
    divMenu.style.setProperty("top", topMenu +"px");
}
function resizing(){
    crearPrincipal();
    for(var i = 0; i<opciones.length;i++){
        opciones[i].situarOpcion();
    }
    for(var i = 0; i<botones.length;i++){
        botones[i].posicionar();
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
    this.situarOpcion();
    this.divOpcion.onmouseover = this.mover;
    this.divOpcion.onmouseout = this.volver;
    this.divOpcion.onclick = this.clickOpcion;
    this.divOpcion.style.backgroundImage = "url('"+this.srcImagen+"')";
    this.divOpcion.style.backgroundPosition = "center";
    this.divOpcion.style.backgroundRepeat = "no-repeat";
    this.divOpcion.style.backgroundSize = "contain";
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
            descargaArchivo(raizAPI+personajesAPI,0);
            break;
        case "opcion1":
            descargaArchivo(raizAPI+peliculasAPI,1);
            break;
        case "opcion2":
            descargaArchivo(raizAPI+especiesAPI,2);
            break;
        case "opcion3":
            descargaArchivo(raizAPI+vehiculosAPI,3);
            break;
        case "opcion4":
            opcionAtras();
            break;
        case "opcion5":
            descargaArchivo(raizAPI+navesAPI,4);
            break;
    }
}

//Objeto boton
var botones = [,,,,,,,,,];
function Boton(iden,titulo){
    this.ident = iden;
    this.titulo = titulo;
}

Boton.prototype.crear = function(){
    this.divBoton = document.createElement("div"); 
    this.divBoton.className = "boton";
    this.divBoton.id = this.ident + "";
    this.divBoton.appendChild(document.createTextNode(this.titulo));
    this.posicionar();
	divMenu.appendChild(this.divBoton);
}

Boton.prototype.posicionar = function(){
    this.divBoton.style.top = dimenciones/4 +"px";
    this.divBoton.style.left = dimenciones/16 +"px";
    this.divBoton.style.margin = dimenciones/25+"px";
    this.divBoton.style.fontSize = dimenciones/26 + "px";
}



//descarga de la API
const raizAPI = "https://swapi.co/api/";
const personajesAPI = "people/";
const peliculasAPI = "films/";
const especiesAPI = "species/";
const vehiculosAPI = "vehicles/";
const navesAPI = "starships/";
const pagAPI = "?page=";
//var resultadoJson = [null,null,null,null,null];

//MEJORAR ESTO SEGURO QUE HAY OTRA OPCION
function descargaArchivo(url) {
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

function borrarCuerpo(){
    while(divMenu.firstChild) {
        divMenu.removeChild(divMenu.firstChild);
    }
}



function crearCuerpo(resultadoJson){
    borrarCuerpo();
    var maxNumBotones;
    if(resultadoJson.count < 10){
        maxNumBotones = resultadoJson.count;
    }
    else {
        maxNumBotones = 10;
    }
    for(var i = 0; i < maxNumBotones; i++ ){
        botones[i] = new Boton(i,resultadoJson.results[i].name || resultadoJson.results[i].title);
        botones[i].crear();
    }
}

