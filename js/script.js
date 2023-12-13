let JsonDatos;
var check = true;

const lol = new XMLHttpRequest();
lol.open("GET", "data/estaciones.json", true);
lol.send();
lol.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        JsonDatos = datos;
        setEstaciones();
    }
};
function setEstaciones(){
    let keyPost = Object.keys(JsonDatos);

    var i = 0;
    var select = document.getElementById("Estacion");
    /*
    deleteOptions.forEach(o => o.remove());
    */
    var opDefault = document.createElement("option");
    opDefault.text = "Estación Metro Línea 1";
    opDefault.value = "default";
    select.add(opDefault);
    while(i < keyPost.length){
        if(JsonDatos[keyPost[i]]["status"] == 0){
            i += 1;
        } else{
            var nuevaOpcion = document.createElement("option");
            nuevaOpcion.text = keyPost[i];
            select.add(nuevaOpcion);
            i += 1;
        }
    }
}


/* vvv funcion que borra el contenido de post vvv */
function deletePost(){
    const padre = document.getElementById("main");

    /* vvv eliminar el post anterior vvv */
    let antiguo = document.getElementById("post");
    padre.removeChild(antiguo)

    /* vvv crea nuevamente el post vvv */
    let nuevoPost = document.createElement("div");
    nuevoPost.setAttribute("id", "post");
    padre.appendChild(nuevoPost);
}
function cambioPost(){
    deletePost();
    
    if(check){
        document.getElementById("Estacion").remove("default");
        check = false;
    };
    const padrePost = document.getElementById("post");

    let estacion = document.getElementById("Estacion").value;
    var keyPost = Object.keys(JsonDatos);
    var posicion = keyPost.indexOf(estacion)

    let estacionDatos = JsonDatos[keyPost[posicion]];
    let comuna = estacionDatos["Comuna"];
    let ubicacion = estacionDatos["Ubicación"];

    let divNombre = document.createElement("div");
    divNombre.innerHTML = '<h1 id="title">'+keyPost[posicion]+'<img src="data/L1icono.svg" id="iconoL1"/></h1>';
    divNombre.setAttribute("id","titleMain")
    padrePost.appendChild(divNombre);

    /* vvv crea comuna y ubicacion vvv */
    let div = document.createElement("div");
    div.innerHTML = '<div id="contenedorBajada"><div class="cincuenta"><p>Comuna: '+comuna+'</p></div><div class="cincuenta"><p id="derecha">Ubicación: '+ubicacion+'</p></div></div>';
    div.setAttribute("id","descripcion");
    padrePost.appendChild(div);

    let KeysPost = Object.keys(estacionDatos["post"]);
    let i = 0;
    document.getElementById("content").scrollIntoView();
    while (i < KeysPost.length){
        let sec = Object.keys(estacionDatos["post"][KeysPost[i]]);
        
        let e = 0;
        let post = document.createElement("article");
        /* 
        let hr = document.createElement("hr");
        post.appendChild(hr);
        */
        while (e < sec.length){
            tipo = Object.keys(estacionDatos["post"][KeysPost[i]][sec[e]]);
            
            if(tipo[0] == "text"){
                let articulo = document.createElement("div");
                articulo.innerHTML = '<p>'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'</p>';
                articulo.setAttribute("id","text");
                post.appendChild(articulo);
                e += 1;
            }   else if(tipo[0] == "title"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<h2 id="title">'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'</h2>';
                    articulo.setAttribute("id","title");
                    post.appendChild(articulo);
                    e += 1;
            }   else if(tipo[0] == "img"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<img src="fotos/'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'">';
                    articulo.setAttribute("id","img");
                    post.appendChild(articulo);
                    e += 1;
            }   else if(tipo[0] == "subTitle"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<h2>'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'</h2>';
                    articulo.setAttribute("id","subTitle");
                    post.appendChild(articulo);
                    e += 1;
            }   else if(tipo[0] == "desc"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<p id="desc">'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'</p>';
                    articulo.setAttribute("id","text");
                    post.appendChild(articulo);
                    e += 1;
            }   else if(tipo[0] == "desc2"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<div id="desc2">'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'</div>';
                    articulo.setAttribute("id","transporte");
                    post.appendChild(articulo);
                    e += 1;
            }   else if(tipo[0] == "trans"){
                    let articulo = document.createElement("div");
                    let bici = estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]["bici"];
                    let bus = estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]["bus"];
                    let walk = estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]["walk"];
                    articulo.innerHTML = '<div id="desc2"><img src="data/Bici.svg" class="svgDesc"/><p><b>'+bici+'</b> min.</p><img src="data/Caminando.svg" class="svgDesc"/><p><b>'+walk+'</b> min.</p><img src="data/Bus.svg" class="svgDesc"/> <p><b>'+bus+'</b> min.</p></div>';
                    articulo.setAttribute("id","transporte");
                    post.appendChild(articulo); 
                    e += 1;
            }   else if(tipo[0] == "resume"){
                    let fuentes = estacionDatos["post"][KeysPost[i]][sec[e]]["fuentes"];
                    let a = 0;
                    while(a < fuentes.length){
                        let articulo = document.createElement("div");
                        let nun = a + 1;
                        articulo.innerHTML = '<div><a href='+fuentes[a]+' target="_blank" >Fuente '+nun+'</a></div>';
                        articulo.setAttribute("id","fuentes");
                        post.appendChild(articulo); 
                        a += 1;
                    }
                    e += 1;
            }   else if(tipo[0] == "ubi"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<a href="'+estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]]+'" target="_blank"><div><p>Mapa</p></div></a>';
                    articulo.setAttribute("id","mapa");
                    post.appendChild(articulo);
                    e += 1;
            }   else {
                e += 1;
            };
        };
        padrePost.appendChild(post);
        i += 1;
    };
    let post = document.createElement("article");
    let articulo = document.createElement("div");
    articulo.innerHTML = '<h2 id="title">¿Conoces mas proyectos? ¿Hay algun error?</h2>';
    articulo.setAttribute("id","title");
    let desc = document.createElement("div");
    desc.innerHTML = '<p>Si conoces algún otro proyecto que te gustaría agregar, ponte en contacto con nosotros para poder incluirlo en el futuro. <b><a href="feedback.html">Haz clic aquí.</a></b><br><br>Por otro lado, si encuentras algún error, ya sea de redacción o algún dato que no corresponda con la realidad, <b><a href="feedback.html">Haz clic aquí.</a><b/></p>';
    desc.setAttribute("id","text");
    post.appendChild(articulo);
    post.appendChild(desc);
    
    padrePost.appendChild(post);
};
let checkScroll = true;
window.onscroll = function() {
    if(window.scrollY > 200 && !checkScroll){
        let p = document.getElementById("scroll");
        p.style.opacity = "0";
        checkScroll = true
    }
};
function scroll() {
    if(window.scrollY < 200){
        let p = document.getElementById("scroll");
        p.style.opacity = "1";
        checkScroll = false;
    };
};
window.onload = function(){
    setTimeout(() => {
        scroll()
    }, "3500");
      
}