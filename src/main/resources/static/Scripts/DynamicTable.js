class DynamicTable{

    //arreglo contents de llamadas json
    constructor(){
        this.contents=[];
        this.shownContents=[];
        this.visibleHeader=[];
        this.paginaActual=1;
        this.cantElementosPagina=300;
    }

    addContents(array){
        this.contents= [...this.contents, ...array];
        if(this.contents.length>0){
            this.visibleHeader=Object.keys(this.contents[0]);
        }

        this.shownContents=[...this.shownContents, ...array];
        return this.contents;
    }

    getVisibleHeader(){
        return this.visibleHeader;
    }

    getSize(){
        return this.shownContents.length;
    }
    addContent(content){
        this.contents.push(content);
    }
    getContent(){
        return this.contents;
    }

    getShownContents(){
        return this.shownContents;
    }

    deleteFilter(){
        this.shownContents=this.contents;
    }

    filter(comparable, value, columnName, extraColumn = null) {
        let compare = (e) => {
            if (value === "") return true;

            if (columnName !== "" && e.hasOwnProperty(columnName)) {
                let value2 = e[columnName];

                switch (comparable) {
                    case "mayor":
                        return value2 > value;
                    case "menor":
                        return value2 < value;
                    case "igual":
                        return value2 === value;
                    case "content":
                        return value2.includes(value);
                    case "diferencia":
                        if ((extraColumn) && (e.hasOwnProperty(extraColumn))) {
                            let time1 = parseInt(value2, 10);
                            let time2 = parseInt(e[extraColumn], 10);
                            return (time1 - time2) >= value;
                        }
                        return false;
                    default:
                        return false;
                }
            }
            return false;
        };
        this.shownContents = this.shownContents.filter(compare);
        return this.shownContents;
    }

    reorder(column, orden){
        let compare = (a, b) => {
            let valA = a[column];
            let valB = b[column];

            if (valA < valB) return orden > 0 ? -1 : 1;
            if (valA > valB) return orden > 0 ? 1 : -1;
            return 0;
        }
        this.shownContents=this.shownContents.sort(compare);
    }
/*
    modificarColumna(columnName){

        if(this.visibleHeader.includes(columnName))
            this.visibleHeader.filter(elem=>{elem===columnName});

        else
            this.visibleHeader.push(columnName);

    }
*/
    resetNumPagina(){
        if(this.shownContents.length>0)
            this.paginaActual=1;
        else this.paginaActual=0;
    }
    setNumPagina(valor){
        if(valor>=0 && valor<=this.getCantidadPaginas())
            this.paginaActual=valor;
    }
    getNumPagina(){
        return this.paginaActual;
    }
    getElementosPaginaActual(){
        let start=(this.paginaActual-1)*this.cantElementosPagina;
        let end=start + this.cantElementosPagina;
        if(end>this.shownContents.length){
            end=this.shownContents.length;
        }
        return this.shownContents.slice(start, end);
    }
    setCantElementosPagina(cantidad){
        this.cantElementosPagina=cantidad;
    }
    getCantidadPaginas(){
        return Math.ceil(this.shownContents.length/this.cantElementosPagina);
    }

}
export default DynamicTable;