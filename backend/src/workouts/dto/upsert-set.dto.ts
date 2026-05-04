import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class UpsertSetDto {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsInt()
  @IsPositive()
  reps: number;
}
