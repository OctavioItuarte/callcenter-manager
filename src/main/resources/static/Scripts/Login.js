import{displayErrorMessage} from "./utils.js";

document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080";

function iniciar(){
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        fetch(urlDestino+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        })
            .then(async response => {
                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error en la solicitud:', errorMessage);
                    displayErrorMessage(errorMessage);
                    throw new Error('Error en la solicitud');
                }
                return response.text();
            })
            .then(data => {
                localStorage.setItem('token', data);
                console.log('Login exitoso:', data);
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

