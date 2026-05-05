import { IsInt, IsPositive, IsString, Matches } from 'class-validator';

export class FromTemplateDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be YYYY-MM-DD' })
  date: string;

  @IsInt()
  @IsPositive()
  templateId: number;
}
