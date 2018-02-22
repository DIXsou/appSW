window.onload = function(){
    crearPrincipal();
    for(var i = 0; i<6;i++){
        opciones[i] = new Opcion("opcion"+i,i);
        opciones[i].crearOpcion();
    }
}

function descargaArchivo() {
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
    peticion_http.open('GET', 'marcas.xml', true);
    peticion_http.send(null);
    function muestraContenido() {
        if(peticion_http.readyState == 4) {
            if(peticion_http.status == 200) {
                recorrerFichero(peticion_http.responseText);
            }
        }				
    }
}


var opciones = [,,,,,];
var rz = null;
window.onresize = function(){
    clearTimeout(rz);
    rz = setTimeout(resizing, 10);
};


var dimenciones;
var topMenu;
var leftMenu;
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
    var divMenu = document.getElementById("menu");
    var imgMenu = document.getElementById("imgMenu");
    imgMenu.style.setProperty("width",dimenciones+"px");
    imgMenu.style.setProperty("height",dimenciones+"px");
    divMenu.style.setProperty("left",leftMenu+"px");
    divMenu.style.setProperty("top", topMenu +"px");
}
function resizing(){
    crearPrincipal();
    for(var i = 0; i<6;i++){
        opciones[i].situarOpcion();
    }
}

function Opcion(identificador,posicion) {
    this.ident = identificador;
    this.posic = posicion;
}
Opcion.prototype.crearOpcion = function () {
    this.divOpcion = document.createElement("div"); 
    this.divOpcion.className = "opcion";
    this.divOpcion.id = this.ident + "";
    this.situarOpcion();
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
            break;
        case 1:
            this.topOpcion = topMenu - (this.dimenOpcion/2);
            this.leftOpcion = leftMenu + (dimenciones/2) - (this.dimenOpcion/2);
            break;
        case 2:
            this.topOpcion = topMenu - (this.dimenOpcion/8);
            this.leftOpcion = leftMenu + dimenciones - (this.dimenOpcion/2);
            break;
        case 3:
            this.topOpcion = topMenu + dimenciones - this.dimenOpcion + (this.dimenOpcion/8);
            this.leftOpcion = leftMenu - (this.dimenOpcion/2);
            break;
        case 4:
            this.topOpcion = topMenu + dimenciones - (this.dimenOpcion/2);
            this.leftOpcion = leftMenu + (dimenciones/2) - (this.dimenOpcion/2);
            break;
        case 5:
            this.topOpcion = topMenu + dimenciones - this.dimenOpcion + (this.dimenOpcion/8);
            this.leftOpcion = leftMenu + dimenciones - (this.dimenOpcion/2);
            break;
    }
    this.divOpcion.style.top = this.topOpcion + "px";
    this.divOpcion.style.left = this.leftOpcion + "px";
    this.divOpcion.onmouseover = this.mover;
    this.divOpcion.onmouseout = this.volver;
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



