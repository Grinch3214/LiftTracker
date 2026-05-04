import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { FromTemplateDto } from './dto/from-template.dto';
import { UpsertSetDto } from './dto/upsert-set.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  findAll(@Query('date') date?: string) {
    if (date) return this.workoutsService.findByDate(date);
    return this.workoutsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateWorkoutDto) {
    return this.workoutsService.create(dto);
  }

  @Post('from-template')
  fromTemplate(@Body() dto: FromTemplateDto) {
    return this.workoutsService.fromTemplate(dto);
  }

  @Post(':id/exercises')
  addExercise(@Param('id', ParseIntPipe) id: number, @Body() dto: AddExerciseDto) {
    return this.workoutsService.addExercise(id, dto);
  }

  @Delete(':id/exercises/:exerciseId')
  removeExercise(
    @Param('id', ParseIntPipe) id: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    return this.workoutsService.removeExercise(id, exerciseId);
  }

  @Post(':id/exercises/:exerciseId/sets')
  addSet(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Body() dto: UpsertSetDto,
  ) {
    return this.workoutsService.addSet(exerciseId, dto);
  }

  @Put(':id/exercises/:exerciseId/sets/:setId')
  updateSet(@Param('setId', ParseIntPipe) setId: number, @Body() dto: UpsertSetDto) {
    return this.workoutsService.updateSet(setId, dto);
  }

  @Delete(':id/exercises/:exerciseId/sets/:setId')
  removeSet(@Param('setId', ParseIntPipe) setId: number) {
    return this.workoutsService.removeSet(setId);
  }

  @Get('progress/:exerciseId')
  getExerciseHistory(@Param('exerciseId', ParseIntPipe) exerciseId: number) {
    return this.workoutsService.getExerciseHistory(exerciseId);
  }
}
