import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.workoutTemplate.findMany({
      include: {
        exercises: {
          include: { exercise: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
  }
}
