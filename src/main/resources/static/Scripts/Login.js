document.addEventListener('DOMContentLoaded', iniciar);

function iniciar(){
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en las credenciales');
                }
                return response.json();
            })
            .then(data => {
                // Guardar el token recibido para futuras solicitudes
                localStorage.setItem('token', data.token);
                console.log('Login exitoso:', data);
            })
            .catch(error => {
                console.error('Error durante el login:', error);
            });
    });

}