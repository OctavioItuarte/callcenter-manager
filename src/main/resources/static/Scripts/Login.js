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
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en las credenciales');
                }
                location.reload();
                return response.text();
            })
            .then(data => {
                // Guardar el token recibido para futuras solicitudes
                localStorage.setItem('token', data);
                console.log('Login exitoso:', data);
                return data;
            })
            .then(data=> {
                fetch(urlDestino + '/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => response.text())
                /*
                .then(data => {
                    console.log(data);
                    return data;
                })
                .then(html => {
                    document.body.innerHTML=""; //        TODO muy precario!!!!!!!!
                    document.body.insertAdjacentHTML('beforeend', html)
                })
                .catch(error => console.error('Error en la solicitud:', error));
        })*/
            })
            .catch(error => {
                console.error('Error durante el login:', error);
            });
    });
}