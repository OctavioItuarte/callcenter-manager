document.addEventListener('DOMContentLoaded', formUser);

const urlDestino="http://localhost:8080";


async function formUser(){

    document.getElementById('formUser').addEventListener('submit', async function (event) {
        event.preventDefault();

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
                throw new Error('La solicitud Fetch no fue exitosa: ' + response.status);
            }

            const data = await response.text();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error:', error);
        }



    })

}