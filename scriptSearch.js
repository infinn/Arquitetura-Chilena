let JsonDatos;

const jsonData = new XMLHttpRequest();
jsonData.open("GET", "data/estaciones.json", true);
jsonData.send();
jsonData.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        JsonDatos = datos;
        setProyectos();
    }
};

function setProyectos(){
    let keyPost = Object.keys(JsonDatos);
    i = 0;
    
    const padrePost = document.getElementById("post");
    
    while(i < keyPost.length){
        if(JsonDatos[keyPost[i]]["status"] == 0){
            i += 1;
        } else{
            let proyectosKeys = Object.keys(JsonDatos[keyPost[i]]["post"]);
            console.log(proyectosKeys);
            e = 1;
            while(e < proyectosKeys.length){

                let nombre = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["a1"]["title"];
                let imagen = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["i1"]["img"];

                let post = document.createElement("article");

                console.log(keyPost[i]);
                /** estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]] */
                let titulo = document.createElement("div");
                titulo.innerHTML = '<div><h1>'+nombre+'</h1></div> <div><p>descripcion</p></div><div><p>Tipo</p></div>';
                titulo.setAttribute("id","title");
                post.appendChild(titulo);


                let foto = document.createElement("div");
                foto.innerHTML = '<img src="fotos/'+imagen+'">';
                foto.setAttribute("id", "foto");
                post.appendChild(foto);


                post.setAttribute("class","contenedor");

                padrePost.appendChild(post);
                e +=1;
            }
            i += 1;
        }
    }
}

document.addEventListener("keyup", e=> {
    e.target.matches("#Buscador")

})