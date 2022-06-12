// export interface LeadsData{
//     lead_name:string,
//     lead_email:string,
//     lead_id:string,
//     co_lead_name:string,
//     co_lead_email:string,
//     co_lead_id:string
// }



export interface RootObject {
    response: ServiceResponse;
    title: string;
}

export interface ServiceResponse {
    generalInformation?: GeneralInformation;
    budget?: Budget;
    geoScope?: GeoScope;
}

export interface GeoScope {
    regions: Region[];
    countries: Country[];
    goblalDimension: number;
}

export interface Country {
    country_id: number;
    name: string;
    initvStgId: number;
}

export interface Region {
    region_id: number;
    name: string;
    initvStgId: number;
}

export interface Budget {
    created_at?: string;
    updated_at?: string;
    id?: number;
    value: string;
    table_name?: string;
    col_name?: string;
    active?: number;
}

export interface GeneralInformation {
    initvStgId?: number;
    generalInformationId?: number;
    name: string;
    lead_id?: number;
    first_name?: string;
    email?: string;
    co_lead_id?: number;
    co_first_name?: string;
    co_email?: string;
    action_area_description?: string;
    action_area_id?: number;
    budget_value?: string,
    table_name?: string,
    col_name?: string,
    active?: boolean,
    budgetId?: string,
    is_global?: string,
    acronym?: string
}





