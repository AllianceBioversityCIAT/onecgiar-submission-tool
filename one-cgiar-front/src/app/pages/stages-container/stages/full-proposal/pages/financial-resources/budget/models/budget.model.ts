
interface List {
    name?: string;
    total?: string | number;
    valuesList?: {};
    active?: Boolean;
    table_name?: string;
    col_name?: string;
    id?: string | number;
    financial_type?: string;
    financial_type_id?: string | number;
}

// interface valuesList{
//     value : string | number;
//     typeId? : string | number;
// }

export class BudgetModel {
    headerNames: string[];
    list: List[];
    years = [];

    constructor() {
        this.list = []
    }

    pushItem(item: List) {
        this.list.push(
            {
                name: item.name || 'unnamed',
                total: item.total || 0,
                valuesList: item.valuesList || {},
                active: item.active || true,
                table_name: null,
                col_name: null,
                id: null,
                financial_type: null,
                financial_type_id:null
            }
        )
    }

}

