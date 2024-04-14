class Call{

    //arreglo columns: se espera que cada elemento sea un objeto json
    Call(){
        this.columns=[];
    }
    addColumn(column){
        this.columns.push(column);
    }

    // parametro column: nombre de la columna que se quiere consultar el valor
    // retorna el valor de dicha columna
    getValue(column){
        return this.columns.some(elemento => elemento.hasOwnProperty(column))[column];
    }
}