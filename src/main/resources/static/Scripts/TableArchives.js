import {generarIndiceTabla, generarContenido} from "./utils.js";
import DynamicTable from "./DynamicTable.js";

document.addEventListener('DOMContentLoaded', fileTable);

const urlDestino="http://localhost:8080/files";

const columnNames={
    "name":"Name",
    "rows":"Rows",
    "uploadDate":"Upload date"
}

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
    let tabla=document.getElementById("tableArchive");
    let dataTable= new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(tabla, columnNames);
    generarContenido(tabla, dataTable);
}
