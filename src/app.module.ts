/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { ActivityModule } from './activities/activities.module';
import { TaskModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    ActivityModule,
    TaskModule,
    EventsModule
  ],
})
export class AppModule { }
