import{displayErrorMessage, displayServerResponse} from "./utils.js";

document.addEventListener('DOMContentLoaded', formArchive);

const urlDestino="http://localhost:8080";

async function formArchive() {
    const errorMessageDiv = document.getElementById('errorMessage');
    const processingMessage = document.getElementById('processingMessage');
    const serverResponseDiv = document.getElementById('serverResponse');

    document.getElementById('seleccionarArchivo').addEventListener('submit', async function (event) {
        event.preventDefault();

        errorMessageDiv.style.display = 'none';
        serverResponseDiv.style.display = 'none';

        const fileInput = document.getElementById('myfile');
        if (!fileInput.files || fileInput.files.length === 0) {
            console.error('No se ha seleccionado ningún archivo.');
            displayErrorMessage('No se ha seleccionado ningún archivo.');
            return;
        }

        processingMessage.style.display = 'block';
        const formData = new FormData();
        formData.append('csvFile', fileInput.files[0]);

        try {
            const response = await fetch(urlDestino + "/files", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error en la solicitud:', errorMessage);
                displayErrorMessage(errorMessage);
                return;
            }

            const data = await response.text();
            console.log('Respuesta del servidor:', data);
            displayServerResponse(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            processingMessage.style.display = 'none';
        }
    });
}


