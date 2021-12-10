import { InitiativeTeamList } from "./initiativeTeamList.interface";

export interface InitiativeTeamData {
  id: number;
  gender_diversity_inclusion: string;
  capacity_development: string;
  active: boolean;
  section: string;
  updateFiles: any[];
  initvTeam: InitiativeTeamList[];
}
