import {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, addEventDelete} from "./utils.js";
import DynamicTable from "./DynamicTable.js";
import {URLGETUSER, URLDELETEUSER} from "./constants.js";

document.addEventListener('DOMContentLoaded', userTable);

const columnNames={
    "email": "Email",
    "role": "Role",
    "trunk": "Trunk",
    "name": "Name",
    "formatCall": "IVRS"
}

async function userTable(){
    let data = await getDataServer(URLGETUSER);
    let dataTable = new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenido(dataTable);
    generarCheckBox();
    addEventDelete(URLDELETEUSER, "email");
}