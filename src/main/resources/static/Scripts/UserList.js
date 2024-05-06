import {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, addEventDelete} from "./utils.js";
import DynamicTable from "./DynamicTable.js";

document.addEventListener('DOMContentLoaded', fileTable);

const urlDestino="http://localhost:8080/users";

const columnNames={
    "name":"Name",
    "uploadDate":"Upload date",
    "rows":"Rows"
}

async function fileTable(){
    let data = await getDataServer(urlDestino);
    console.log(data);
    let dataTable = new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenido(dataTable);
    generarCheckBox();
    addEventDelete("http://localhost:8080/delete/", "email");
}