const keysUrl = window.location.search;
const urlParametros = new URLSearchParams(keysUrl);
let estacion = urlParametros.get("est");
let postId = urlParametros.get("post");
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
    const padrePost = document.getElementById("main");
    const error = document.getElementById("error")
    var keyPost = Object.keys(JsonDatos);
    var posicion = keyPost.indexOf(estacion);
    if (posicion == -1 || postId=="a1" || postId == "a0"){
        document.title="404 not found"
    }   else{
        let estacionDatos = JsonDatos[keyPost[posicion]];
        if(Object.keys(estacionDatos["post"]).indexOf(postId) == -1){
            document.title="404 not found"
        }   else{
            padrePost.removeChild(error)
            let KeysPost = Object.keys(estacionDatos["post"][postId]);
            console.log(KeysPost)
            let i = 0;
            let post = document.createElement("article");
            while (i < KeysPost.length){
                tipo = Object.keys(estacionDatos["post"][postId][KeysPost[i]]);
                console.log(tipo[0]);
                console.log(estacionDatos["post"][postId][KeysPost[i]][tipo[0]])
                    
                    
                if(tipo[0] == "text"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<p>'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'</p>';
                    articulo.setAttribute("id","text");
                    post.appendChild(articulo);
                    
                    i += 1;
                }   else if(tipo[0] == "title"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<h2 id="title">'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'</h2>';
                    articulo.setAttribute("id","title");
                    post.appendChild(articulo);
                    document.title=estacionDatos["post"][postId][KeysPost[i]][tipo[0]] + " | Arquitectura Chilena";
                    i += 1;
                }   else if(tipo[0] == "img"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<img src="fotos/'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'">';
                    articulo.setAttribute("id","img");
                    post.appendChild(articulo);
                    i += 1;
                }   else if(tipo[0] == "subTitle"){
                let articulo = document.createElement("div");
                    articulo.innerHTML = '<h2>'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'</h2>';
                    articulo.setAttribute("id","subTitle");
                    post.appendChild(articulo);
                    i += 1;
                }   else if(tipo[0] == "desc"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<p id="desc">'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'</p>';
                    articulo.setAttribute("id","text");
                    post.appendChild(articulo);
                    i += 1;
                }   else if(tipo[0] == "desc2"){
                    let articulo = document.createElement("div");
                    articulo.innerHTML = '<div id="desc2">'+estacionDatos["post"][postId][KeysPost[i]][tipo[0]]+'</div>';
                    articulo.setAttribute("id","transporte");
                    post.appendChild(articulo);
                    i += 1;
                }   else if(tipo[0] == "resume"){
                    let fuentes = estacionDatos["post"][postId][KeysPost[i]]["fuentes"];
                    let a = 0;
                    while(a < fuentes.length){
                        let articulo = document.createElement("div");
                        let nun = a + 1;
                        articulo.innerHTML = '<div><a href='+fuentes[a]+' target="_blank" >Fuente '+nun+'</a></div>';
                        articulo.setAttribute("id","fuentes");
                        post.appendChild(articulo); 
                        a += 1;
                        }
                        i += 1;
                } else {
                    i += 1;
                };
            };
            padrePost.appendChild(post);
        };
        
    };
    
};