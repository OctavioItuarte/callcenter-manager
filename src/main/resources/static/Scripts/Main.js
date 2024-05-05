import DynamicTable from "../Scripts/DynamicTable.js";
import {generarIndiceTabla, generarContenido, getDataServer} from "./utils.js";

document.addEventListener('DOMContentLoaded', iniciar);

const urlDestino="http://localhost:8080/calls";

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

function renombrarAtributosJson(data){
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

function generarContenidoTabla(dynamicTable){
    generarContenido(dynamicTable);


    document.getElementById("page-number").textContent=dynamicTable.getNumPagina().toString();
    document.getElementById("page-max").textContent=dynamicTable.getCantidadPaginas().toString();
    document.getElementById("cantidadFilas").textContent="Resultado total "+(dynamicTable.getShownContents().length).toString()+" filas";

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

function toggleOrder(columnName, orders) {
    // Invierte el orden actual o lo establece a ascendente si no hay orden o es descendente
    let currentOrder = orders[columnName];
    orders[columnName] = currentOrder <= 0 ? 1 : -1;
    // Restablece todos los otros órdenes a neutral (0)
    Object.keys(orders).forEach(key => {
        if (key !== columnName) orders[key] = 0;
    });
}

function addEventOrder(dynamicTable) {
    // Agrega eventos de clic para ordenar las columnas
    document.querySelectorAll(".indiceTabla").forEach(elem => {
        elem.addEventListener("click", () => {
            let columnName = elem.classList[1];
            toggleOrder(columnName, orders);
            dynamicTable.reorder(columnName, orders[columnName]);
            generarContenidoTabla(dynamicTable);
        });
    });
}

function obtenerValor(selector) {
    return document.getElementById(selector).value;
}

function obtenerValorSeleccionado(selector) {
    const elemento = document.getElementById(selector);
    return elemento.options[elemento.selectedIndex].value;
}

function aplicarFiltro(dynamicTable, tipo, valor, campo1, campo2 = null) {
    if (valor) { // Solo aplicar filtro si hay un valor
        dynamicTable.filter(tipo, valor, campo1, campo2);
    }
}
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}
function cantHorasSourceTrunk(dynamicTable){
    let totalSeconds = 0;
    dynamicTable.getShownContents().forEach(item => {
        let duration = parseInt(item["duration"], 10);
        totalSeconds += duration;
    });

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds / 60) % 60);
    let seconds = totalSeconds % 60;

    // Usamos la función 'pad' para asegurar dos dígitos en minutos y segundos
    minutes = pad(minutes, 2);
    seconds = pad(seconds, 2);

    return `${hours}:${minutes}:${seconds}`;
}

function getWaitingTime(dynamicTable) {
    let totalSeconds = 0;
    dynamicTable.getShownContents().forEach(item => {
        let duration = parseInt(item["duration"], 10);
        let billingDuration = parseInt(item["billingDuration"], 10);
        totalSeconds += (duration - billingDuration);
    });

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds / 60) % 60);
    let seconds = totalSeconds % 60;

    // Asumiendo que 'pad' es una función que añade ceros a la izquierda para tener al menos dos dígitos
    minutes = pad(minutes, 2);
    seconds = pad(seconds, 2);

    return `${hours}:${minutes}:${seconds}`;
}

function filtrarTabla(dynamicTable) {
    // Limpieza inicial
    document.getElementById("cantHorasCallee").textContent = "";
    document.getElementById("cantHorasSourceTrunk").textContent = "";

    // Aplicación de filtros
    aplicarFiltro(dynamicTable, "mayor", obtenerValor("barra_entrada_date1").replace('T', " "), "time");
    aplicarFiltro(dynamicTable, "menor", obtenerValor("barra_entrada_date2").replace('T', " "), "time");
    aplicarFiltro(dynamicTable, "content", obtenerValor("barra_entrada_call_from"), "caller");
    aplicarFiltro(dynamicTable, "content", obtenerValor("barra_entrada_call_to"), "callee");
    aplicarFiltro(dynamicTable, "diferencia", obtenerValor("barra_entrada_waiting_time"), "duration", "billingDuration");
    aplicarFiltro(dynamicTable, "igual", obtenerValorSeleccionado("selectStatus"), "disposition");
    aplicarFiltro(dynamicTable, "igual", obtenerValorSeleccionado("selectCom"), "comunicationType");
    aplicarFiltro(dynamicTable, "igual", obtenerValorSeleccionado("selectSource"), "sourceTrunk");

    // Mostrar información específica si corresponde
    let sourceTrunk = obtenerValorSeleccionado("selectSource");
    let callee = obtenerValor("barra_entrada_call_to");

    if (sourceTrunk) {
        let time = cantHorasSourceTrunk(dynamicTable);
        document.getElementById("cantHorasSourceTrunk").textContent = "La línea " + sourceTrunk + " tuvo " + time + " de tiempo ocupado";
    }
    if (callee) {
        let time = getWaitingTime(dynamicTable);
        document.getElementById("cantHorasCallee").textContent = callee + " tuvo " + time + " de tiempo de demora";
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

function addPaginationEventListeners(dynamicTable) {
    // Función auxiliar para añadir manejadores de eventos de forma segura
    function addEventListenerSafely(selector, eventType, handler) {
        const element = document.getElementById(selector);
        if (element) {
            element.addEventListener(eventType, handler);
        }
    }

    // Manija de la página anterior
    addEventListenerSafely("pagAnterior", "click", () => {
        let pageNumber = dynamicTable.getNumPagina();
        if (pageNumber > 1) {
            dynamicTable.setNumPagina(pageNumber - 1);
            generarContenidoTabla(dynamicTable);
        }
    });

    // Manija de la página siguiente
    addEventListenerSafely("pagSiguiente", "click", () => {
        let pageNumber = dynamicTable.getNumPagina();
        let pageMax = dynamicTable.getCantidadPaginas();
        if (pageNumber < pageMax) {
            dynamicTable.setNumPagina(pageNumber + 1);
            generarContenidoTabla(dynamicTable);
        }
    });

    // Manija de la última página
    addEventListenerSafely("ultimaPagina", "click", () => {
        dynamicTable.setNumPagina(dynamicTable.getCantidadPaginas());
        generarContenidoTabla(dynamicTable);
    });

    // Manija de la primera página
    addEventListenerSafely("primerPagina", "click", () => {
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
        let data=renombrarAtributosJson(dynamicTable.getShownContents());
        enviarContenidoDescargable(data);
    });
    document.getElementById("downloadCurrentPage").addEventListener("click", e=>{
        let data=renombrarAtributosJson(dynamicTable.getElementosPaginaActual());
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






let myChart;
function addChart(dynamicTable, graph) {
    if(myChart)
        myChart.destroy();

    let calles={};

    dynamicTable.getShownContents().forEach(elem=>{
        //if((elem["comunicationType"]==="Inbound")){
        if (!calles.hasOwnProperty(elem["callee"]))
            calles[elem["callee"]] = 1;
        else
            calles[elem["callee"]] += 1;
        //}
    });
    const labels = Object.keys(calles);
    const colors = ['rgb(69,177,223)', 'rgb(99,201,122)', 'rgb(203,82,82)', 'rgb(229,224,88)'];

    const data = {
        labels: labels,
        datasets: [{
            data: Object.values(calles),
            backgroundColor: colors
        }]
    };

    const config = {
        type: 'bar',
        data: data,
    };

    myChart=new Chart(graph, config);
}


function addEventDownloadChart(dynamicTable){
    document.getElementById("downloadChart").addEventListener("click", e=>{
        descargarPDF(dynamicTable);
    });
}

function descargarPDF(dynamicTable) {
    const graph = document.getElementById('primerGrafico');
    addChart(dynamicTable, graph);

    html2canvas(graph).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jspdf.jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [graph.offsetWidth, graph.offsetHeight]
        });
        console.log(pdf);
        pdf.addImage(imgData, 'PNG', 0, 0, graph.offsetWidth, graph.offsetHeight);
        pdf.save('descarga.pdf');
    });
}

function procesarData(data){
    data.forEach( (elem) =>{
        if(elem.hasOwnProperty("billingDuration") && elem.hasOwnProperty("duration")) {
            elem["billingDuration"] = parseInt(elem["billingDuration"]);
            elem["duration"] = parseInt(elem["duration"]);
        }
    });
    return data;
}
async function iniciar() {
    "use strict"

    let data=await getDataServer(urlDestino);

    $(document).ready(function() {
        $("#toggleFiltersButton").click(function() {
            $("#filtersDiv").toggle();
        });
    });

    let dataTable = new DynamicTable();
    data=procesarData(data);
    dataTable.addContents(data);
    generarIndiceTabla(columnNames);
    generarContenidoTabla(dataTable);

    addEventOrder(dataTable);
    //addEventMostrarColumnas(dynamicTable, tabla);
    addEventFilter(dataTable);
    addPaginationEventListeners(dataTable);
    addEventPageLimit(dataTable);
    addEventDownload(dataTable);
    //addEventDownloadChart(dynamicTable);

}
