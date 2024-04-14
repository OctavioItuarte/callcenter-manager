document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080";

document.getElementById('seleccionarArchivo').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('myfile');
    const formData = new FormData();
    formData.append('archivo', fileInput.files[0]);

    fetch(urlDestino+"/files", {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});

async function llamarServer(){
    try{
        const response = await fetch('http://localhost/8080/files', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }
    catch (error){
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    }
}

function iniciar() {
    "use strict"

    let tr= document.createElement("tr")
    let tabla = document.getElementById("tabla");
    tabla.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);

    llamarServer().then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
}