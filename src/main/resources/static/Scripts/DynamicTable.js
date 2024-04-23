class DynamicTable{

    //arreglo contents de llamadas json
    constructor(){
        this.contents=[];
        this.shownContents=[];
        this.visibleHeader=[];
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
    getWaitingTime(){
        let seg=0;
        this.shownContents.forEach(e=>{
            var time1=e["callDuration"].split(":");
            var time2=e["talkDuration"].split(":");
            seg+=((parseInt(time1[0])-parseInt(time2[0]))*60*60)+((parseInt(time1[1])-parseInt(time2[1]))*60)+((parseInt(time1[2])-parseInt(time2[2])));
        });
        console.log(seg);
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
                    var time1=e["callDuration"].split(":");
                    var time2=e["talkDuration"].split(":");
                    var result=((parseInt(time1[0])-parseInt(time2[0]))*60*60)+((parseInt(time1[1])-parseInt(time2[1]))*60)+((parseInt(time1[2])-parseInt(time2[2])));
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
        return this.shownContents;
    }

    modificarColumna(columnName){

        if(this.visibleHeader.includes(columnName))
            this.visibleHeader.filter(elem=>{elem===columnName});

        else
            this.visibleHeader.push(columnName);

    }

}
export default DynamicTable;