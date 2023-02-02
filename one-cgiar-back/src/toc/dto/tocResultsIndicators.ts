export class TocResultsIndicatorsDto{
    toc_result_indicator_id : string;
    toc_result_id: string;
    indicator_description:string;
    unit_messurament:string;
    type_value:string;
    baseline_value:string;
    baseline_date:Date;
    target_value:string;
    target_date:Date;
    data_colletion_source:string;
    data_collection_method:string;
    frequency_data_collection:string;
    location:string;
    countries_id:string;
    regions_id:string;
    is_active:boolean;
}