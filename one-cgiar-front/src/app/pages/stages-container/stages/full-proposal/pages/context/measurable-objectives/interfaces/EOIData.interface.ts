export interface EOIData {
    initvStgId: number;
    id: number;
    type_name: string;
    wp_name?: string;
    wp_acronym?: string;
    result_type: number;
    result_title: string;
    is_global: number;
    active: number;
    result_description: string;
    indicators: Indicator[];
    geo_scope: Geoscope;
  }
  
  interface Geoscope {
    regions: any[];
    countries: any[];
  }
  
  interface Indicator {
    id: number;
    indicator_name: string;
    unit_measurement: string;
    results_id: number;
    baseline_value: string;
    baseline_year: number;
    target_value: string;
    target_year: number;
    active: number;
    data_source: string;
    data_collection: string;
    frequency_data_collection: string;
    created_at: string;
    updated_at: string;
  }