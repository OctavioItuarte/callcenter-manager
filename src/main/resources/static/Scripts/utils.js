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
        console.log(values);
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

async function deleteDataServer(urlDestino){
    try {
        let response = await fetch(urlDestino, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        let data = await response.text();
        displayServerResponse(data);
        setTimeout(() => {
            location.reload();
        }, 2000);
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
        input.classList.add("selectRow");

        td.appendChild(input);
        elem.prepend(td);
    });

}

function addEventDelete(url, classElem){
    let tr; let value;
    document.getElementById("button-delete").addEventListener("click",e=>{
        document.querySelectorAll(".selectRow").forEach(async elem=>{
            if(elem.checked){
                tr=elem.parentElement.parentElement;
                value=tr.querySelector("."+classElem).textContent;
                console.log(value);
                await deleteDataServer(url + value);
            }
        });
    });
}
function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

function displayServerResponse(data) {
    const serverResponseDiv = document.getElementById('serverResponse');
    serverResponseDiv.textContent = data;
    serverResponseDiv.style.display = 'block';
}



export {generarIndiceTabla, generarContenido, getDataServer, generarCheckBox, displayErrorMessage, displayServerResponse, addEventDelete};