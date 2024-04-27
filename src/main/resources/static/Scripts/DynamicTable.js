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

    getName(){
        return this.name;
    }
    setName(name){
        this.name=name;
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

    pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    cantHorasSourceTrunk(){
        let seg=0;
        this.shownContents.forEach(e=>{
            var time1=e["duration"];
            seg+=(parseInt(time1));
        });
        let hora=Math.floor(seg/3600);
        let min=Math.floor(((seg)/60)%60);
        seg=seg-hora*3600-min*60;
        //hora=pad(hora, 2);
        min=this.pad(min, 2);
        seg=this.pad(seg, 2);
        return hora.toString()+":"+min.toString()+":"+seg.toString();
    }
    getWaitingTime(){
        let seg=0;
        this.shownContents.forEach(e=>{
            var time1=e["duration"];
            var time2=e["billingDuration"];
            seg+=(parseInt(time1)-parseInt(time2));
        });
        let hora=Math.floor(seg/3600);
        let min=Math.floor(((seg)/60)%60);
        seg=seg-hora*3600-min*60;
        //hora=pad(hora, 2);
        min=this.pad(min, 2);
        seg=this.pad(seg, 2);
        return hora.toString()+":"+min.toString()+":"+seg.toString();
    }
    filter(comparable, value, columnName){
        let compare= (e) =>{
            if(value==="")
                return true;

            if(columnName!="" && e.hasOwnProperty(columnName)){
                var value2 = e[columnName];
                if(comparable==null)
                    return value2 === value;
                if(comparable === "mayor")
                    return value2 > value;
                else if (comparable === "menor")
                    return value2 < value;
                else if(comparable === "igual")
                    return value2 === value;
                else if(comparable === "content")
                    return value2.includes(value);
                else if(comparable === "diferencia"){
                    var time1=e["duration"];
                    var time2=e["billingDuration"];
                    var result=parseInt(time1)-parseInt(time2);
                    return (result>=value);
                }
            }
            return false;
        }
        this.shownContents=this.shownContents.filter(compare);
        return this.shownContents;
    }

    reorder(column, orden){
        let compare=(a, b)=>{
            if(orden>0){
                if(a[column]<b[column])
                    return -1;
                if(a[column]>b[column])
                    return 1;
            }
            if(orden<0){
                if(a[column]<b[column])
                    return 1;
                if(a[column]>b[column])
                    return -1;
            }
            else return 0;
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