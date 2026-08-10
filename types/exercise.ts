import { type EquipmentType } from './equipment-type';

export interface Exercise {
  id: string;
  muscleGroupId: string;
  name: string;
  isCustom: boolean;
  equipment?: EquipmentType;
  order?: number;
}
