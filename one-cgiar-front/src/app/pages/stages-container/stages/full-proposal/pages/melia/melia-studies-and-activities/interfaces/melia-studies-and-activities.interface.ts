export interface MeliaStudiesAndActivities {
  created_at?: string;
  updated_at?: string;
  id: number;
  initvStgId?: number;
  type_melia_id: string;
  type_melia: string;
  other_melia: string;
  result_title: string;
  anticipated_year_completion: string;
  co_delivery: string;
  management_decisions_learning: string;
  is_global?: boolean;
  active: boolean;
  countries: [];
  regions: [];
}