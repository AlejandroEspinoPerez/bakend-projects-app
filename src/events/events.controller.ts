/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './events.entity';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    create(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Event> {
        return this.eventsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.eventsService.remove(id);
    }
}
