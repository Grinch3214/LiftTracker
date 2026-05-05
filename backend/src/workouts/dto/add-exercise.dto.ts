import { IsInt, IsPositive } from 'class-validator';

export class AddExerciseDto {
  @IsInt()
  @IsPositive()
  exerciseId: number;
}
