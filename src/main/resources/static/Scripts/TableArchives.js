import {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, addEventDelete} from "./utils.js";
import DynamicTable from "./DynamicTable.js";
import {URLFILES, URLDELETEFILES} from "./constants.js";

document.addEventListener('DOMContentLoaded', fileTable);

const columnNames={
    "name":"Name",
    "uploadDate":"Upload date",
    "rows":"Rows"
}

async function fileTable(){
    let data = await getDataServer(URLFILES);
    let dataTable = new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenido(dataTable);
    generarCheckBox();
    addEventDelete(URLDELETEFILES, "name");
}
