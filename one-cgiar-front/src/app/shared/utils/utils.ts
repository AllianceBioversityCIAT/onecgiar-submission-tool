export class UtilsHandler {
    constructor(){}
    public groupByProp(array, key) {
        let result = array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
        return result;
    };

}




