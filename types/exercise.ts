import { type EquipmentType } from './equipment-type';

export interface Exercise {
  id: string;
  muscleGroupId: string; // links to MuscleGroup.id
  name: string;
  isCustom: boolean; // true if added by the user, false for the built-in catalog
  equipment?: EquipmentType;
  order?: number; // display order within the muscle group
}
