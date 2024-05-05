document.addEventListener('DOMContentLoaded', fileTable);

const urlDestino="localhost:8080/files"

async function llamarServer(){
    try {
        const response = await fetch(urlDestino, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        let data = await response.json();
        return (data);
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    }
}

async function fileTable(){
    let data = await llamarServer();
    console.log(data);

}
