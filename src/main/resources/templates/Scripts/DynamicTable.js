class DynamicTable{

    //arreglo contents de objetos "Call"
    DynamicTable(){
        this.contents=[];
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
    getContent(index){
        if(index>=0 && index<this.contents.length)
            return this.contents[index];
        return null;
    }
    getContentByFilter(comparable, value, columnName){

        let compare= (e) =>{
            if(comparable === "greater")
                return e > value;
            else if(comparable === "greater/equals")
                return e >= value;
            else if (comparable === "lower")
                return e < value;
            else if(comparable === "lower/equals")
                return e <= value;
            else if(comparable === "equals")
                return e === value;
            return false;
        }

        return this.contents.filter(compare);
    }
}