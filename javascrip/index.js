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
var musica = true;

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
var divMenu;
function crearPrincipal(){
    //esta variable depende del tamaño de la ventana
    var puntoIntermedioY = window.innerHeight / 2; 
    var puntoIntermedioX = window.innerWidth / 2;

    if(puntoIntermedioX >= puntoIntermedioY){ //si el ancho es mañor o igual al alto de la ventana
        dimenciones = puntoIntermedioY * 1.1; // tomamos como guia el alto
    }
    else{
        dimenciones = puntoIntermedioX * 1.1; // si no el ancho, asi siempre tomamos la dimensión menor
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
        if(btAnterior != null){
            btAnterior.posicionar();
        }
        if(btSiguiente != null){
            btSiguiente.posicionar();
        }
        if(cartaInformativa != null){
            cartaInformativa.posicionar();
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
            this.srcImagen = "./image/opcion_pause.png";
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
    if(this.id != "opcion4"){
        paginaActual = 0;
    }
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
            if(musica){
                this.style.backgroundImage = "url('./image/opcion_play.png')";
                document.getElementById("music").pause();
                musica = false;
            }
            else{
                this.style.backgroundImage = "url('./image/opcion_pause.png')";
                document.getElementById("music").play();
                musica = true;
            }
            
            break;
        case "opcion5":
            opcionActual = 4;
            descargaArchivo(raizAPI+navesAPI);
            break;
    }
}

//Objeto boton
var botones  = new Array();//array para guardar opciones
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
    if(this.titulo.length <= 14){
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
    this.divBoton.style.height = (dimenciones/13  + this.paddinBoton-0) + "px";
    this.divBoton.style.width = dimenciones/3 +"px";
    this.divBoton.style.fontSize = dimenciones/340 + "em";
}

//Objetos Botones Azanzar y restroceder
var btSiguiente = null;
var btAnterior = null;
const BOTON_SIGUIENTE = 1;
const BOTON_ANTERIOR = 0;

function BotonPaginacion(iden,tipo){
    this.iden = iden;
    this.tipo = tipo;
}

BotonPaginacion.prototype.crear = function(){
    this.divBoton = document.createElement("div");
    this.divBoton.className = "opcion";
    this.divBoton.id = this.iden + "";
    this.posicionar();
    divMenu.appendChild(this.divBoton);
}

BotonPaginacion.prototype.posicionar = function(){
    this.divBoton.style.top = dimenciones/2 - dimenciones/20 +"px";
    this.divBoton.style.height = dimenciones/10 + "px";
    this.divBoton.style.width = dimenciones/10 +"px";
    if(this.tipo == BOTON_SIGUIENTE){
        this.divBoton.style.left = dimenciones - dimenciones/8 +"px";
        this.divBoton.style.backgroundImage = "url('./image/bt_siguiente.png')";
    }
    else{
        this.divBoton.style.left = dimenciones/40 +"px";
        this.divBoton.style.backgroundImage = "url('./image/bt_anterior.png')";
    }
    
}

//Objeto Carta de Informacion
var cartaInformativa = null;
function CartaInfo(titulo){
    this.divCarta = document.createElement("div");
    this.divCarta.id = "cartaInformativa"
    this.titulo = titulo;
    switch(opcionActual){
        case 0:
            this.height;
            this.mass;
			this.hairColor;
			this.skinColor;
			this.eyeColor;
			this.birthYear;
            this.gender;
            break;
        case 1:
            this.episodeId;
            this.openingCrawl;
            this.director;
            this.producer;
            this.releaseDate;
            break;
        case 2:
            this.classification;
            this.designation;
            this.average_height;
            this.skinColors;
            this.hairColors;
            this.eyeColors;
            this.averageLifespan;
            this.language;
            break;
        case 3:
            this.model;
            this.manufacturer;
            this.cost;
            this.length;
            this.maxAtmospheringSpeed;
            this.crew;
            this.passengers;
            this.cargoCapacity;
            this.consumables;
            this.vehicleClass;
            break;
        case 4:
            this.model;
            this.manufacturer;
            this.cost;
            this.length;
            this.maxAtmospheringSpeed;
            this.crew;
            this.passengers;
            this.cargoCapacity;
            this.consumables;
            this.hyperdriveRating;
            this.MGLT;
            this.starship_class;
            break;
    }

    this.divCerrar = document.createElement("div");
    this.divCerrar.className = "opcion";
    this.divCerrar.style.backgroundImage = "url('./image/cerrar.png')";
    
    this.divMiniatura = document.createElement("div");
    this.divMiniatura.className = "miniatura";
    this.divMiniatura.style.backgroundImage = "url('./image/miniatura.png')";

    this.posicionar();
}


CartaInfo.prototype.posicionar = function(){
    var auxWidth = dimenciones *1.5;
    this.divCarta.style.top = topMenu - (dimenciones/4) +"px";
    this.divCarta.style.left = leftMenu - (dimenciones/4) +"px";
    this.divCarta.style.height = (dimenciones * 1.6) + "px";
    this.divCarta.style.width = auxWidth +"px";
    this.divCarta.style.fontSize = dimenciones/340 + "em";

    this.divCerrar.style.top = dimenciones/30 +"px";
    this.divCerrar.style.left = auxWidth - dimenciones/8 +"px";
    this.divCerrar.style.height = dimenciones/12  + "px";
    this.divCerrar.style.width = dimenciones/12 +"px";

    this.divMiniatura.style.height = dimenciones/5  + "px";
    this.divMiniatura.style.width = dimenciones/5 +"px";
}

CartaInfo.prototype.mostrar = function(){
    var titulo = document.createElement("h1");
    titulo.appendChild(document.createTextNode(this.titulo));
    this.divCarta.appendChild(titulo);
    switch(opcionActual){
        case 0:
            crearTexto(this.divCarta,"Height: "+ this.height);
            crearTexto(this.divCarta,"Mass: "+ this.mass);
			crearTexto(this.divCarta,"Hair Color: "+ this.hairColor);
			crearTexto(this.divCarta,"Skin Color: "+ this.skinColor);
			crearTexto(this.divCarta,"Eye Color: "+ this.eyeColor);
			crearTexto(this.divCarta,"BirthYear: "+ this.birthYear);
            crearTexto(this.divCarta,"gender: "+this.gender);
            break;
        case 1:
            crearTexto(this.divCarta,"Episode: "+this.episodeId);
            crearTexto(this.divCarta,"Opening Crawl: "+this.openingCrawl);
            crearTexto(this.divCarta,"Director: "+this.director);
            crearTexto(this.divCarta,"Producer: "+this.producer);
            crearTexto(this.divCarta,"Release Date "+this.releaseDate);
            break;
        case 2:
            crearTexto(this.divCarta,"Classification: "+this.classification);
            crearTexto(this.divCarta,"Designation: "+this.designation);
            crearTexto(this.divCarta,"Average Height: "+this.average_height);
            crearTexto(this.divCarta,"Skin Colors: "+this.skinColors);
            crearTexto(this.divCarta,"Hair Colors: "+this.hairColors);
            crearTexto(this.divCarta,"Eye Colors: "+this.eyeColors);
            crearTexto(this.divCarta,"Average Lifespan: "+this.averageLifespan);
            crearTexto(this.divCarta,"Language: "+this.language);
            break;
        case 3:
            crearTexto(this.divCarta,"Model: "+this.model);
            crearTexto(this.divCarta,"Manufacturer: "+this.manufacturer);
            crearTexto(this.divCarta,"Cost: "+this.cost);
            crearTexto(this.divCarta,"Length: "+this.length);
            crearTexto(this.divCarta,"Max Atmosphering Speed: "+this.maxAtmospheringSpeed);
            crearTexto(this.divCarta,"Crew: "+this.crew);
            crearTexto(this.divCarta,"Passengers: "+this.passengers);
            crearTexto(this.divCarta,"Cargo Capacity: "+this.cargoCapacity);
            crearTexto(this.divCarta,"Consumables: "+this.consumables);
            crearTexto(this.divCarta,"Vehicle Class: "+this.vehicleClass);
            break;
        case 4:
            crearTexto(this.divCarta,"Model: "+this.model);
            crearTexto(this.divCarta,"Manufacturer: "+this.manufacturer);
            crearTexto(this.divCarta,"Cost: "+this.cost);
            crearTexto(this.divCarta,"Length: "+this.length);
            crearTexto(this.divCarta,"Max Atmosphering Speed: "+this.maxAtmospheringSpeed);
            crearTexto(this.divCarta,"Crew: "+this.crew);
            crearTexto(this.divCarta,"Passengers: "+this.passengers);
            crearTexto(this.divCarta,"Cargo Capacity: "+this.cargoCapacity);
            crearTexto(this.divCarta,"Consumables: "+this.consumables);
            crearTexto(this.divCarta,"Hyperdrive Rating: "+this.hyperdriveRating);
            crearTexto(this.divCarta,"MGLT: "+this.MGLT);
            crearTexto(this.divCarta,"Starship Class: "+this.starship_class);
            break; 
    }
    this.divCerrar.onclick = onClickCerrar;
    this.divCarta.appendChild(this.divCerrar);

    this.divMiniatura.onclick = onClickCerrar;
    document.getElementById("index").appendChild(this.divMiniatura);

    document.onkeydown = onClickCerrar;
    document.getElementById("index").appendChild(this.divCarta);
}

function onClickCerrar(event){
    var tecla = event.which;
    var padre =  document.getElementById("index");
    if(padre.childElementCount > 7){
        if(tecla == 27 || tecla == 1){
            padre.removeChild(padre.lastChild);
            padre.removeChild(padre.lastChild);
        }
    }
    
}


function crearTexto(elemento,texto){
    var h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(texto));
    elemento.appendChild(h3);
}


//descarga de la API
//constantes que utilizaré pra las llamadas al servidor
const raizAPI = "https://swapi.co/api/";
const personajesAPI = "people/";
const peliculasAPI = "films/";
const especiesAPI = "species/";
const vehiculosAPI = "vehicles/";
const navesAPI = "starships/";

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
var paginaActual;
function crearCuerpo(resultadoJson){
    borrarCuerpo();//para borrar la pantalla de carga
    crearPaginacion();
    
    //la API viene paginada por gupos de 10 elementos, aqui valoro si esta paginada o no
    var maxNumBotones;
    var numBotonesRestantes = resultadoJson.count - (10*paginaActual);
    if(numBotonesRestantes < 10){
        maxNumBotones = numBotonesRestantes;
    }
    else {
        maxNumBotones = 10;
    }
    
    //la funcion cuando se da click en uno de los bontones
    function onclickBoton(evento){
        var aux = resultadoJson.results[evento.target.id];
        cartaInformativa = new CartaInfo(aux.name||aux.title);
        switch(opcionActual){
            case 0:
                cartaInformativa.height = aux.height;
                cartaInformativa.mass = aux.mass;
                cartaInformativa.hairColor = aux.hair_color;
                cartaInformativa.skinColor = aux.skin_color;
                cartaInformativa.eyeColor = aux.eye_color;
                cartaInformativa.birthYear = aux.birth_year;
                cartaInformativa.gender = aux.gender;
                break;
            case 1:
                cartaInformativa.episodeId = aux.episode_id;
                cartaInformativa.openingCrawl = aux.opening_crawl;
                cartaInformativa.director = aux.director;
                cartaInformativa.producer = aux.producer;
                cartaInformativa.releaseDate = aux.release_date;
                break;
            case 2:
                cartaInformativa.classification = aux.classification;
                cartaInformativa.designation = aux.designation;
                cartaInformativa.average_height = aux.average_height;
                cartaInformativa.skinColors = aux.skin_colors;
                cartaInformativa.hairColors = aux.hair_colors;
                cartaInformativa.eyeColors = aux.eye_colors;
                cartaInformativa.averageLifespan = aux.average_lifespan;
                cartaInformativa.language = aux.language;
                break;
            case 3:
                cartaInformativa.model = aux.model;
                cartaInformativa.manufacturer = aux.manufacturer;
                cartaInformativa.cost = aux.cost_in_credits;
                cartaInformativa.length = aux.length;
                cartaInformativa.maxAtmospheringSpeed = aux.max_atmosphering_speed;
                cartaInformativa.crew = aux.crew;
                cartaInformativa.passengers = aux.passengers;
                cartaInformativa.cargoCapacity = aux.cargo_capacity;
                cartaInformativa.consumables = aux.consumables;
                cartaInformativa.vehicleClass = aux.vehicle_class;
                break;
            case 4:
                cartaInformativa.model = aux.model;
                cartaInformativa.manufacturer = aux.manufacturer;
                cartaInformativa.cost = aux.cost_in_credits;
                cartaInformativa.length = aux.length;
                cartaInformativa.maxAtmospheringSpeed = aux.max_atmosphering_speed;
                cartaInformativa.crew = aux.crew;
                cartaInformativa.passengers = aux.passengers;
                cartaInformativa.cargoCapacity = aux.cargo_capacity;
                cartaInformativa.consumables = aux.consumables;
                cartaInformativa.hyperdriveRating = aux.hyperdrive_rating;
                cartaInformativa.MGLT = aux.MGLT;
                cartaInformativa.starship_class = aux.starship_class;
                break;
        }
        cartaInformativa.mostrar();
        
       
    }

    

    //la creacion de todos los botones
    for(var i = 0; i < maxNumBotones; i++ ){
        botones[i] = new Boton(i,resultadoJson.results[i].name || resultadoJson.results[i].title);
        botones[i].crear();
        botones[i].divBoton.onclick = onclickBoton;
    }

    function crearPaginacion(){
        if(paginaActual != Math.trunc(resultadoJson.count/10)){
            btSiguiente = new BotonPaginacion('siguiente', BOTON_SIGUIENTE);
            btSiguiente.crear(); 
            btSiguiente.divBoton.onclick = function(){
                paginaActual++;
                descargaArchivo(resultadoJson.next);
            } 
        }
        if(paginaActual != 0){
            btAnterior = new BotonPaginacion('anterior',BOTON_ANTERIOR);
            btAnterior.crear();
            btAnterior.divBoton.onclick = function(){
                paginaActual--;
                descargaArchivo(resultadoJson.previous);
            }
        }
    }
    

}