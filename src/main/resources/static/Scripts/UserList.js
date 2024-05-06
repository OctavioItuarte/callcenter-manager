import {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, addEventDelete} from "./utils.js";
import DynamicTable from "./DynamicTable.js";

document.addEventListener('DOMContentLoaded', userTable);

const urlDestino="http://localhost:8080/user";

const columnNames={
    "email": "Email",
    "role": "Role",
    "trunk": "Trunk",
    "name": "Name",
    "formatCall": "IVRS"
}

async function userTable(){
    let data = await getDataServer(urlDestino);
    let dataTable = new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenido(dataTable);
    generarCheckBox();
    addEventDelete("http://localhost:8080/delete/", "email");
}