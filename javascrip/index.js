window.onload = function(){
    var rz = null;
    window.onresize = function(){
        clearTimeout(rz);
        rz = setTimeout(resizing, 100);
    };
    resizing();
    
    function resizing(){
        var puntoIntermedioY = window.innerHeight / 2;
    var puntoIntermedioX = window.innerWidth / 2;
    var dimenciones
    if(puntoIntermedioX >= puntoIntermedioY){
        dimenciones = puntoIntermedioY;
    }
    else{
        dimenciones = puntoIntermedioX;
    }
    var divMenu = document.getElementById("menu");
    var imgMenu = document.getElementById("imgMenu");
    imgMenu.style.setProperty("width",dimenciones+"px");
    imgMenu.style.setProperty("height",dimenciones+"px");
    divMenu.style.setProperty("left",(puntoIntermedioX-(dimenciones/2))+"px");
    divMenu.style.setProperty("top",(puntoIntermedioY-(dimenciones/2))+"px");
    }
    


    var divOpcion = document.createElement("div").setAttribute("id","opcion");


}