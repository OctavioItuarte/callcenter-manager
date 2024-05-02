document.addEventListener('DOMContentLoaded', formUser);

const urlDestino="http://localhost:8080";


async function formUser(){

    const errorMessageDiv = document.getElementById('errorMessage');
    const serverResponseDiv = document.getElementById('serverResponse');

    document.getElementById('formUser').addEventListener('submit', async function (event) {
        event.preventDefault();

        errorMessageDiv.style.display = 'none';
        serverResponseDiv.style.display = 'none';

        const formDataJson = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            trunk: document.getElementById('trunk').value
        };


        const formDataJsonString = JSON.stringify(formDataJson);


        console.log (formDataJsonString);

        console.log(localStorage.getItem('token'))

        try {
            const response = await fetch(urlDestino + "/register", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formDataJsonString
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(errorMessage);
                displayErrorMessage(errorMessage);
            }

            const data = await response.text();
            displayServerResponse(data);
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error:', error);
        }


    })

}

function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

function displayServerResponse(data) {
    const serverResponseDiv = document.getElementById('serverResponse');
    serverResponseDiv.textContent = data;
    serverResponseDiv.style.display = 'block';
}
