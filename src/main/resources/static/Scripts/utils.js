import DynamicTable from "./DynamicTable.js";

async function getDataServer(urlDestino){
    try {
        const response = await fetch(urlDestino, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let data = await response.json();
        return (data);
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    }
}

function generarIndiceTabla(columnNames){
    let thead=document.getElementById("headerTable");
    let tabla=document.getElementById("table");
    let th;
    thead.remove();
    thead=document.createElement("thead");
    thead.id="headerTable";
    tabla.prepend(thead);
    Object.entries(columnNames).forEach(([clave,valor]) => {
        th= document.createElement("th");
        th.textContent=valor;
        th.classList.add("indiceTabla");
        thead.appendChild(th);
        th.classList.add(clave);
    });
}

function generarContenido(dynamicTable){
    let td, tr;
    let bodyTable=document.getElementById("bodyTable");
    let tabla=document.getElementById("table");
    bodyTable.remove();
    bodyTable=document.createElement("tbody");
    bodyTable.id="bodyTable";

    tabla.appendChild(bodyTable);
    let shownContents=dynamicTable.getElementosPaginaActual();

    shownContents.forEach((call) => {
        tr= document.createElement("tr");
        let values=Object.entries(call);
        values.forEach(([clave, valor]) =>
        {
            td= document.createElement("td");
            td.textContent=valor;
            tr.appendChild(td);
            td.classList.add(clave);
        });
        bodyTable.appendChild(tr);
    });
}

async function sendData(urlDestino){
    try {
        await fetch(urlDestino, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    }
}

function generarCheckBox(){
    let td; let input;
    let thead=document.getElementById("headerTable");
    thead.prepend(document.createElement("th"));
    document.getElementById("bodyTable").querySelectorAll("tr").forEach(elem=>{
        td=document.createElement("td");
        input=document.createElement("input"); input.type="checkbox";
        input.classList.add("selectFile");

        td.appendChild(input);
        elem.prepend(td);
    });

}


export {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, sendData};