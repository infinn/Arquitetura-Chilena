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
    let cont = 0
    const padrePost = document.getElementById("post");
    
    while(i < keyPost.length){
        if(JsonDatos[keyPost[i]]["status"] == 0){
            i += 1;
        } else{
            let proyectosKeys = Object.keys(JsonDatos[keyPost[i]]["post"]);
            e = 1;
            
            while(e < proyectosKeys.length){

                let nombre = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["a1"]["title"];
                let imagen = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["i1"]["img"];
                let desc = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["info"]["resume"];
                let tipo = JsonDatos[keyPost[i]]["post"][proyectosKeys[e]]["info"]["tipo"];

                let post = document.createElement("article");

                console.log(keyPost[i]);
                /** estacionDatos["post"][KeysPost[i]][sec[e]][tipo[0]] */
                let titulo = document.createElement("div");
                titulo.innerHTML = '<div><a href="post.html?est='+keyPost[i]+'&post='+proyectosKeys[e]+'"><h1>'+nombre+'</h1></a></div><div><p>'+desc+'</p></div><div><p id="estilo"><b>Estilo:</b><em> '+tipo+'</em></p></div>';
                titulo.setAttribute("id","title");
                post.appendChild(titulo);


                let foto = document.createElement("div");
                foto.innerHTML = '<a href="post.html?est='+keyPost[i]+'&post='+proyectosKeys[e]+'"><img src="fotos/'+imagen+'" alt="'+nombre+'"></a>';
                foto.setAttribute("id", "foto");
                post.appendChild(foto);


                post.setAttribute("class","contenedor");
                padrePost.appendChild(post);
                cont += 1;
                e +=1;
            };
            i += 1;
        };
    };
    const parrafo = document.getElementById("descContador");
    parrafo.innerHTML = "Este archivo contiene todos los hitos arquitectónicos de Santiago de Chile que tenemos a disposición. En total, contamos con ¡<b>"+cont+"</b> proyectos!. Puedes realizar búsquedas utilizando la sección a continuación. Utiliza el buscador ingresando el nombre del proyecto para encontrar la información que necesitas."
}

document.addEventListener("keyup", e=> {

    if (e.target.matches("#Buscador")){

        if (e.key =="Escape")e.target.value = ""

        document.querySelectorAll(".contenedor").forEach(post =>{
            
            post.childNodes[0].childNodes[0].textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?post.classList.remove("filtro")
            :post.classList.add("filtro")
        });
        
    };
});
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
    }, "2000");
      
}