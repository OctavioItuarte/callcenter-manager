import DynamicTable from "../Scripts/DynamicTable.js";

document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080";
const debug=true;

async function llamarServer(){
    //usado para cargar el token desde POSTMAN
    if (debug){
        //let token = prompt("introduci el token:");
        let token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJndWlsbGVybW8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM5NzY3NzAsImV4cCI6MTcxMzk4MDM3MH0.1R5AR7zR3iZMV1i6YmVNfzDT71n4Ugls6dZO1EWmI9XXtmt4mbgMHvpT-u5_ny6n"
        try{
            const response = await fetch(urlDestino+'/calls/1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            })
                let data = await response.json();
            return (data);
        }
        catch (error){
            console.log("Hubo un problema con la petición Fetch:" + error.message);
        }
    }
    else {
        try {
            const response = await fetch(urlDestino+'/calls/1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }

            })
            let data = await response.json();
            return (data);
        } catch (error) {
            console.log("Hubo un problema con la petición Fetch:" + error.message);
        }
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
        Object.keys(columnNames).forEach((clave)=>{
            datoNuevo[clave]=e[clave];
        });
    });
    return resultado;
}

function generarIndiceTabla(){
    let thead=document.getElementById("headerTable");
    let th;
    let div;
    while (thead.firstChild) {
        thead.removeChild(thead.firstChild);
    }
    Object.entries(columnNames).forEach(([clave,valor]) => {
        th= document.createElement("th");
        div=document.createElement("div");
        div.textContent=valor;
        div.classList.add("indiceTabla");
        th.appendChild(div);
        thead.appendChild(th);
        div.classList.add(clave);
    });
}


function generarContenidoTabla(dynamicTable){
    let div, td, tr;
    let bodyTable=document.getElementById("bodyTable");

    let shownContents=dynamicTable.getShownContents();

    limpiarTabla();
    document.getElementById("cantidadFilas").textContent=shownContents.length + " filas";
    console.log(shownContents);
    shownContents.forEach((call) => {
        tr= document.createElement("tr");
        let values=Object.entries(call);
        values.forEach(([clave, valor]) =>
        {
            td= document.createElement("td");
            div=document.createElement("div");
            div.textContent=valor;
            td.appendChild(div);
            tr.appendChild(td);
            div.classList.add(clave);
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
            console.log(orders[columnName]);
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

function limpiarTabla(){
    let tbody=document.getElementById("bodyTable");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function filtrarTabla(dynamicTable){

    document.getElementById("cantHorasCallee").textContent="";

    let valor = document.getElementById("barra_entrada_date1").value;
    dynamicTable.filter("mayor", valor.toString(), "time");

    valor = document.getElementById("barra_entrada_date2").value;
    dynamicTable.filter("menor", valor.toString(), "time");

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
        console.log(dynamicTable.getShownContents().length);
        generarContenidoTabla(dynamicTable);
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
function iniciar() {
    "use strict"

    let tabla = document.getElementById("tabla");
    let dynamicTable = new DynamicTable();

    llamarServer()
        .then(data => {
            let array=procesarData(data);
            dynamicTable.addContents(array);
            console.log(dynamicTable);
            generarIndiceTabla(tabla);
            addEventOrder(dynamicTable, tabla);
            generarContenidoTabla(dynamicTable);
        });
    //addEventMostrarColumnas(dynamicTable, tabla);
    addEventFilter(dynamicTable, tabla);
}