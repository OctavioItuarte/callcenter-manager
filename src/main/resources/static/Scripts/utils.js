function generarIndiceTabla(tabla, columnNames){
    let thead=document.getElementById("headerTable");
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

function generarContenido(tabla, dynamicTable){
    let td, tr;
    let bodyTable=document.getElementById("bodyTable");
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
export {generarIndiceTabla, generarContenido};