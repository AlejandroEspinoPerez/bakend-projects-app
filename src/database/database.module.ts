/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activities/activities.entity';
import { Event } from 'src/events/events.entity';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import { User } from 'src/users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'project_db',
            entities: [User, Project, Activity,Task,Event],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule { }
