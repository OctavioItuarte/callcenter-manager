import DynamicTable from "../Scripts/DynamicTable.js";

document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080";

async function llamarServer(){
    try {
        const response = await fetch(urlDestino+'/calls', {
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

const columnNames={
    "time": "Time",
    "caller": "Caller",
    "callee": "Callee",
    "duration": "Duration",
    "billingDuration": "Billing Duration",
    "disposition": "Disposition",
    "sourceTrunk": "Source Trunk",
    "destinationTrunk": "Destination Trunk",
    "comunicationType": "Communication Type",
    "pinUser": "Pin User"
}

function procesarData(data){
    let resultado=[];
    data.forEach( (e) =>{
        resultado.push({});
        let datoNuevo=resultado[resultado.length-1];
        Object.entries(columnNames).forEach(([key, value])=>{
            datoNuevo[value]=e[key];
        });
    });
    return resultado;
}

function generarIndiceTabla(){
    let thead=document.getElementById("headerTable");
    let th;
    //let div;
    thead.remove();
    thead=document.createElement("thead");
    thead.id="headerTable";
    let tabla=document.getElementById("tabla");
    tabla.prepend(thead);
    Object.entries(columnNames).forEach(([clave,valor]) => {
        th= document.createElement("th");
        //div=document.createElement("div");
        th.textContent=valor;
        th.classList.add("indiceTabla");
        //th.appendChild(div);
        thead.appendChild(th);
        th.classList.add(clave);
    });
}

function generarContenidoTabla(dynamicTable){
    let td, tr;
    let bodyTable=document.getElementById("bodyTable");

    bodyTable.remove();
    bodyTable=document.createElement("tbody");
    bodyTable.id="bodyTable";
    let tabla=document.getElementById("tabla");
    tabla.appendChild(bodyTable);
    let shownContents=dynamicTable.getElementosPaginaActual();

    document.getElementById("page-number").textContent=dynamicTable.getNumPagina().toString();
    document.getElementById("page-max").textContent=dynamicTable.getCantidadPaginas().toString();
    document.getElementById("cantidadFilas").textContent="Resultado total "+(dynamicTable.getShownContents().length).toString()+" filas";

    shownContents.forEach((call) => {
        tr= document.createElement("tr");
        let values=Object.entries(call);
        values.forEach(([clave, valor]) =>
        {
            td= document.createElement("td");
            //div=document.createElement("div");
            td.textContent=valor;
            //td.appendChild(div);
            tr.appendChild(td);
            td.classList.add(clave);
        });
        bodyTable.appendChild(tr);
    });
}

let orders={
    "time": 0,
    "caller": 0,
    "callee": 0,
    "duration": 0,
    "billingDuration": 0,
    "disposition": 0,
    "sourceTrunk": 0,
    "destinationTrunk": 0,
    "comunicationType": 0,
    "pinUser": 0
}

function addEventOrder(dynamicTable){
    //order es un entero, (negativo es descendente) (positivo es ascendente)
    document.querySelectorAll(".indiceTabla").forEach(elem=>{
        elem.addEventListener("click", e => {
            let columnName = elem.classList[1];
            let order = orders[columnName];
            if (order <= 0) {
                order = 1;
                dynamicTable.reorder(columnName, order);
            } else {
                order = -1;
                dynamicTable.reorder(columnName, order);
            }
            orders[columnName] = order;
            Object.keys(orders).forEach(clave => {
                if (clave != columnName)
                    orders[clave] = 0;
            });
            generarContenidoTabla(dynamicTable);
        });
    });
}

function limpiarTabla(idElemento){
    let elemento=document.getElementById(idElemento);
    elemento.remove();
    while (elemento.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function filtrarTabla(dynamicTable){

    document.getElementById("cantHorasCallee").textContent="";

    let valor = document.getElementById("barra_entrada_date1").value;
    dynamicTable.filter("mayor", valor.toString().replace('T', " "), "time");

    valor = document.getElementById("barra_entrada_date2").value;
    dynamicTable.filter("menor", valor.toString().replace('T', " "), "time");

    valor = document.getElementById("barra_entrada_call_from").value;
    dynamicTable.filter("igual", valor.toString(), "caller");

    valor = document.getElementById("barra_entrada_call_to").value;
    dynamicTable.filter("igual", valor.toString(), "callee");
    let callee=valor;

    valor = document.getElementById("barra_entrada_waiting_time").value;
    dynamicTable.filter("diferencia", valor.toString(), "duration");

    valor = document.getElementById("selectStatus");
    valor = valor.options[valor.selectedIndex].value;
    dynamicTable.filter("igual", valor.toString(), "disposition");

    valor = document.getElementById("selectCom");
    valor = valor.options[valor.selectedIndex].value;
    dynamicTable.filter("igual", valor.toString(), "comunicationType");

    valor = document.getElementById("selectSource");
    valor = valor.options[valor.selectedIndex].value;
    dynamicTable.filter("igual", valor.toString(), "sourceTrunk");
    let sourceTrunk=valor;

    if(sourceTrunk!=""){
        let time=dynamicTable.cantHorasSourceTrunk();
        document.getElementById("cantHorasSourceTrunk").textContent="La linea "+sourceTrunk+" tuvo "+time+" de tiempo ocupado";
    }
    if(callee!=""){
        let time=dynamicTable.getWaitingTime();
        document.getElementById("cantHorasCallee").textContent=callee+" tuvo "+time+" de tiempo de demora";
    }
}

function addEventFilter(dynamicTable){
    let filter=document.getElementById('filter');

    filter.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById("cantHorasCallee").textContent="";
        document.getElementById("cantHorasSourceTrunk").textContent="";
        dynamicTable.deleteFilter();
        filtrarTabla(dynamicTable);
        dynamicTable.resetNumPagina();
        generarContenidoTabla(dynamicTable);
    });
}

function addEventPasarPagina(dynamicTable){
    document.getElementById("pagAnterior").addEventListener("click", e=>{
        let pageNumber=dynamicTable.getNumPagina();
        if(pageNumber>1){
            dynamicTable.setNumPagina(pageNumber-1);
            generarContenidoTabla(dynamicTable);
        }
    });
    document.getElementById("pagSiguiente").addEventListener("click", e=>{
        let pageNumber=dynamicTable.getNumPagina();
        let pageMax=dynamicTable.getCantidadPaginas();
        if(pageNumber<pageMax){
            dynamicTable.setNumPagina(pageNumber+1);
            generarContenidoTabla(dynamicTable);
        }
    });
    document.getElementById("ultimaPagina").addEventListener("click", e=>{
        dynamicTable.setNumPagina(dynamicTable.getCantidadPaginas());
        generarContenidoTabla(dynamicTable);
    });
    document.getElementById("primerPagina").addEventListener("click", e=>{
        dynamicTable.resetNumPagina();
        generarContenidoTabla(dynamicTable);
    });
}

function addEventPageLimit(dynamicTable){
    let select=document.getElementById("cantLlamadasXPagina");
    select.addEventListener("change", e=>{
        let limite=select.options[select.selectedIndex].value;
        dynamicTable.setCantElementosPagina(parseInt(limite));
        dynamicTable.setNumPagina(1);
        generarContenidoTabla(dynamicTable);
    });
}

async function enviarContenidoDescargable(contenido){
    let data={};
    data.data=contenido;
    console.log(data);
    try {
        let csvContent = await fetch(urlDestino+'/filesProcessor/tocsv', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        });
        console.log(csvContent);

        csvContent.text().then(function(text) {
            let blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
            let url = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "output.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    }
}

function addEventDownload(dynamicTable){
    document.getElementById("downloadAll").addEventListener("click", e=>{
        let data=procesarData(dynamicTable.getShownContents());
        enviarContenidoDescargable(data);
    });
    document.getElementById("downloadCurrentPage").addEventListener("click", e=>{
        let data=procesarData(dynamicTable.getElementosPaginaActual());
        enviarContenidoDescargable(data);
    });
}

/*
function addEventMostrarColumnas(dynamicTable, tabla){
    let selectMostrar=document.getElementById('selectMostrar');
    console.log(document.getElementById('selectMostrar'));

    selectMostrar.addEventListener('click', (e) => {
        let optionMostrar = selectMostrar.options[selectMostrar.selectedIndex];
        tabla.querySelectorAll("." + optionMostrar.value).forEach(elem => {
            dynamicTable.modificarColumna(optionMostrar.value);
            generarIndiceTabla(dynamicTable);
            generarContenidoTabla(dynamicTable);
        });
        selectMostrar.selectedIndex = 0;
    });
}
*/
async function iniciar() {
    "use strict"

    let tabla = document.getElementById("tabla");
    let dynamicTable = new DynamicTable();

    let data= await llamarServer();

    dynamicTable.addContents(data);

    generarIndiceTabla(tabla);
    addEventOrder(dynamicTable, tabla);
    generarContenidoTabla(dynamicTable);
    //addEventMostrarColumnas(dynamicTable, tabla);
    addEventFilter(dynamicTable, tabla);
    addEventPasarPagina(dynamicTable);
    addEventPageLimit(dynamicTable);
    addEventDownload(dynamicTable);
}
