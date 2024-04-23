document.addEventListener('DOMContentLoaded', formArchive);

const urlDestino="http://localhost:8080";

function formArchive() {
    document.getElementById('seleccionarArchivo').addEventListener('submit', function (event) {
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

}