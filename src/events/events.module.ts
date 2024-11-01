/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './events.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService, TypeOrmModule],
})
export class EventsModule { }
