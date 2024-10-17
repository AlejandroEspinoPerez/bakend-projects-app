/* eslint-disable prettier/prettier */
// src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { User } from '../users/users.entity';  // Importar la entidad de usuario

@Module({
    imports: [TypeOrmModule.forFeature([Project, User])],
    providers: [ProjectsService],
    controllers: [ProjectsController],
})
export class ProjectsModule { }
