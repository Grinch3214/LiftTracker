import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { FromTemplateDto } from './dto/from-template.dto';
import { UpsertSetDto } from './dto/upsert-set.dto';

const workoutInclude = {
  exercises: {
    include: { sets: { orderBy: { order: 'asc' as const } } },
    orderBy: { order: 'asc' as const },
  },
};

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByDate(date: string) {
    return this.prisma.workoutLog.findUnique({
      where: { date },
      include: workoutInclude,
    });
  }

  async findAll() {
    return this.prisma.workoutLog.findMany({
      include: workoutInclude,
      orderBy: { date: 'desc' },
    });
  }

  async create(dto: CreateWorkoutDto) {
    return this.prisma.workoutLog.upsert({
      where: { date: dto.date },
      update: {},
      create: { date: dto.date },
      include: workoutInclude,
    });
  }

  async addExercise(workoutId: number, dto: AddExerciseDto) {
    const workout = await this.prisma.workoutLog.findUnique({ where: { id: workoutId } });
    if (!workout) throw new NotFoundException(`Workout ${workoutId} not found`);

    const order = await this.prisma.workoutExercise.count({ where: { workoutLogId: workoutId } });

    return this.prisma.workoutLog.update({
      where: { id: workoutId },
      data: {
        exercises: {
          create: { exerciseId: dto.exerciseId, order },
        },
      },
      include: workoutInclude,
    });
  }

  async removeExercise(workoutId: number, workoutExerciseId: number) {
    await this.prisma.workoutExercise.delete({ where: { id: workoutExerciseId } });
    return this.prisma.workoutLog.findUnique({ where: { id: workoutId }, include: workoutInclude });
  }

  async addSet(workoutExerciseId: number, dto: UpsertSetDto) {
    const exercise = await this.prisma.workoutExercise.findUnique({ where: { id: workoutExerciseId } });
    if (!exercise) throw new NotFoundException(`WorkoutExercise ${workoutExerciseId} not found`);

    const order = await this.prisma.workoutSet.count({ where: { workoutExerciseId } });

    return this.prisma.workoutSet.create({
      data: { ...dto, order, workoutExerciseId },
    });
  }

  async updateSet(setId: number, dto: UpsertSetDto) {
    return this.prisma.workoutSet.update({
      where: { id: setId },
      data: dto,
    });
  }

  async removeSet(setId: number) {
    return this.prisma.workoutSet.delete({ where: { id: setId } });
  }

  async fromTemplate(dto: FromTemplateDto) {
    const template = await this.prisma.workoutTemplate.findUnique({
      where: { id: dto.templateId },
      include: { exercises: { orderBy: { order: 'asc' } } },
    });
    if (!template) throw new NotFoundException(`Template ${dto.templateId} not found`);

    return this.prisma.workoutLog.upsert({
      where: { date: dto.date },
      update: {},
      create: {
        date: dto.date,
        exercises: {
          create: template.exercises.map((te) => ({
            exerciseId: te.exerciseId,
            order: te.order,
            sets: {
              create: Array.from({ length: te.defaultSets }, (_, i) => ({
                weight: te.defaultWeight,
                reps: te.defaultReps,
                order: i,
              })),
            },
          })),
        },
      },
      include: workoutInclude,
    });
  }

  async getExerciseHistory(exerciseId: number) {
    const entries = await this.prisma.workoutExercise.findMany({
      where: { exerciseId },
      include: {
        sets: { orderBy: { order: 'asc' } },
        workoutLog: true,
      },
      orderBy: { workoutLog: { date: 'asc' } },
    });

    const history = entries.map((entry) => {
      const maxWeight = Math.max(...entry.sets.map((s) => s.weight));
      const totalVolume = entry.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
      const bestSet = entry.sets.reduce(
        (best, s) => (s.weight > best.weight ? s : best),
        entry.sets[0],
      );
      return { date: entry.workoutLog.date, sets: entry.sets, maxWeight, totalVolume, bestSet };
    });

    const pr = history.reduce(
      (best, h) => (h.maxWeight > best ? h.maxWeight : best),
      0,
    );

    return { exerciseId, pr, history };
  }
}
