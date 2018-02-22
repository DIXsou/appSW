window.onload = function(){
    resizing();
    opcion1 = new Opcion("opcion1",0);
    opcion1.crearOpcion();  
}
var rz = null;
window.onresize = function(){
    clearTimeout(rz);
    rz = setTimeout(resizing, 10);
};


var dimenciones = 100;
var topMenu;
var leftMenu;
function resizing(){
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

function Opcion(identificador,posicion) {
    this.ident = identificador;
    this.posic = posicion;
}
Opcion.prototype.crearOpcion = function () {
    this.dimenOpcion = (dimenciones/2);
    this.opcion = document.createElement("div"); 
	this.opcion.style.setProperty("width",this.dimenOpcion + "px") ;
	this.opcion.style.setProperty("height",this.dimenOpcion + "px") ; 
	switch(this.posic){
        case 0:
            this.topOpcion = topMenu - (this.dimenOpcion/2);
            this.leftOpcion = leftMenu - (this.dimenOpcion/2);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
    }
    this.opcion.style.top = this.topOpcion + "px";
    this.opcion.style.left = this.leftOpcion + "px";
    this.opcion.className = "opcion";
    this.opcion.id = this.ident + "";;
	document.getElementById("index").appendChild(this.opcion);
}

