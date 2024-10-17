/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activities.entity';
import { ActivityService } from './activities.service';
import { ActivityController } from './activities.controller';
import { Project } from '../projects/projects.entity';
import { User } from 'src/users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Activity, Project,User])],
    controllers: [ActivityController],
    providers: [ActivityService],
})
export class ActivityModule { }
