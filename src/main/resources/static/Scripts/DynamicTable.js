class DynamicTable{

    //arreglo contents de objetos "Call"
    constructor(){
        this.contents=[];
    }

    addContents(array){
        this.contents= [...this.contents, ...array];
        return this.contents;
    }

    getSize(){
        return this.contents.length;
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

    getContentByFilter(comparable, value, columnName){
        let compare= (e) =>{
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
                return false;
            }
        }
        return this.contents.filter(compare);
    }

}
export default DynamicTable;