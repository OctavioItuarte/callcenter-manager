document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080";

document.getElementById('seleccionarArchivo').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('myfile');
    if (!fileInput.files || fileInput.files.length === 0) {
        console.error('No se ha seleccionado ningún archivo.');
        return;
    }

    const formData = new FormData();
    formData.append('csvFile', fileInput.files[0]);

    fetch(urlDestino + "/files", {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud Fetch no fue exitosa: ' + response.status);
            }
            return response.text(); // Manejar la respuesta como texto
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => console.error('Error:', error));
});

async function llamarServer(){
    try{
        const response = await fetch('http://localhost:8080/calls/1', {
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
        console.log(data);
    });
}