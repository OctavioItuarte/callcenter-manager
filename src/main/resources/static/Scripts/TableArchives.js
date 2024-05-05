import {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, sendData} from "./utils.js";
import DynamicTable from "./DynamicTable.js";

document.addEventListener('DOMContentLoaded', fileTable);

const urlDestino="http://localhost:8080/files";

const columnNames={
    "name":"Name",
    "uploadDate":"Upload date",
    "rows":"Rows"
}

function addEventDelete(){
    let tr; let fileName;
    document.getElementById("button-delete").addEventListener("click",e=>{
        document.querySelectorAll(".selectFile").forEach(async elem=>{
            if(elem.checked){
                tr=elem.parentElement.parentElement;
                fileName=tr.querySelector(".name").textContent;
                console.log(fileName);
                await sendData("http://localhost:8080/files/"+fileName);
            }
        });
    });
}

async function fileTable(){
    let data = await getDataServer(urlDestino);
    let dataTable = new DynamicTable();
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenido(dataTable);
    generarCheckBox();
    addEventDelete();
}
