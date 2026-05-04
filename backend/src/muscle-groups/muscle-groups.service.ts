import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MuscleGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.muscleGroup.findMany({
      include: { exercises: true },
      orderBy: { id: 'asc' },
    });
  }
}
