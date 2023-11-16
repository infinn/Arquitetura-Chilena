let JsonDatos;

const lol = new XMLHttpRequest();
lol.open("GET", "data/estaciones.json", true);
lol.send();
lol.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        JsonDatos = datos;
        setEstaciones("Linea_1");
    }
};
function setEstaciones(linea){
    let keyPost = Object.keys(JsonDatos);

    var i = 0;
    var select = document.getElementById("Estacion");
    var deleteOptions = document.querySelectorAll('#Estacion option');
    deleteOptions.forEach(o => o.remove());
    while(i < keyPost.length){
        if(JsonDatos[keyPost[i]]["linea"].indexOf(linea) == -1){
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
    const padrePost = document.getElementById("post");

    let estacion = document.getElementById("Estacion").value;
    console.log(estacion)
    var keyPost = Object.keys(JsonDatos);
    var posicion = keyPost.indexOf(estacion)

    let estacionDatos = JsonDatos[keyPost[posicion]];
    let comuna = estacionDatos["Comuna"];
    let ubicacion = estacionDatos["Ubicación"];

    console.log(comuna, ubicacion)
    let divNombre = document.createElement("div");
    divNombre.innerHTML = '<h1 id="title">'+keyPost[posicion]+'</h1>';
    padrePost.appendChild(divNombre);

    /* vvv crea comuna y ubicacion vvv */
    let div = document.createElement("div");
    div.innerHTML = '<div class="cincuenta"><p>Comuna: '+comuna+'</p></div><div class="cincuenta"><p>Ubicación: '+ubicacion+'</p></div>';
    div.setAttribute("id","descripcion");
    padrePost.appendChild(div);

    let KeysPost = Object.keys(estacionDatos["post"]);
    let i = 0;

    while (i < KeysPost.length){
        let tipo = Object.keys(estacionDatos["post"][KeysPost[i]]); /* para saber el tipo -> tipo[0] */
        console.log(tipo[0]);
        if(tipo[0] == "text"){
            let articulo = document.createElement("div");
            articulo.innerHTML = '<p>'+estacionDatos["post"][KeysPost[i]][tipo[0]]+'</p>';
            articulo.setAttribute("id","text");
            padrePost.appendChild(articulo);
            i += 1;
        }  else if(tipo[0] == "title"){
            let articulo = document.createElement("div");
            articulo.innerHTML = '<h2 id="title">'+estacionDatos["post"][KeysPost[i]][tipo[0]]+'</h2>';
            articulo.setAttribute("id","title");
            padrePost.appendChild(articulo);
            i += 1;
        }   else if(tipo[0] == "img"){
            let articulo = document.createElement("div");
            articulo.innerHTML = '<img src="fotos/'+estacionDatos["post"][KeysPost[i]][tipo[0]]+'">';
            articulo.setAttribute("id","img");
            padrePost.appendChild(articulo);
            i += 1;
        }  else if(tipo[0] == "subTitle"){
            let articulo = document.createElement("div");
            articulo.innerHTML = '<h2 id="subTitle">'+estacionDatos["post"][KeysPost[i]][tipo[0]]+'</h2>';
            articulo.setAttribute("id","subTitle");
            padrePost.appendChild(articulo);
            i += 1;
        }   else{
            i += 1;
        };
    };
};