
interface List{
    name?:string;
    total?: string | number;
    valuesList?: valuesList[];
}

interface valuesList{
    value : string | number;
    typeId? : string | number;
}

export class BudgetModel{
    headerNames:string[];
    list:List[];

    constructor(){
        this.list = []
    }

    pushItem(item: List) {
        this.list.push(
            {
                name: item.name || 'unnamed',
                total: item.total || 0,
                valuesList: item.valuesList || []
            }
        )
    }

}

