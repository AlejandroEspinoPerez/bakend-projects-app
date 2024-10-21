// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ProjectsService } from '../projects/projects.service';
import { EventsService } from '../events/events.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [ProjectsModule, EventsModule],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
