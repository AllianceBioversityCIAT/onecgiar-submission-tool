import { KeyValue } from "@angular/common";

export class UtilsHandler {
    constructor() { }
    public groupByProp(array, key) {
        let result = array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
        return this.groupData(result);
    };

    public groupData(data) {
        let result = []
        for (var property in data) {
            let ele = {};
            if (data.hasOwnProperty(property) && property != 'null') {
                ele['data'] = data[property];
                ele['title'] = property;
                ele['order'] = data[property][0]['order'];
                result.push(ele)
            }
        }
        return result;
    }
}




