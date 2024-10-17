/* eslint-disable prettier/prettier */
// src/tasks/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Activity } from '../activities/activities.entity';
import { User } from '../users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Activity, User])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule { }
