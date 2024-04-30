document.addEventListener('DOMContentLoaded', formArchive);

const urlDestino="http://localhost:8080";

async function formArchive() {
    document.getElementById('seleccionarArchivo').addEventListener('submit', async function (event) {
        event.preventDefault();

        const fileInput = document.getElementById('myfile');
        if (!fileInput.files || fileInput.files.length === 0) {
            console.error('No se ha seleccionado ningún archivo.');
            displayErrorMessage('No se ha seleccionado ningún archivo.');
            return;
        }

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
            }

            const data = await response.text();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    });


}

function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

