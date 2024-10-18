/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const event = this.eventsRepository.create(createEventDto);
        return this.eventsRepository.save(event);
    }

    async findAll(): Promise<Event[]> {
        return this.eventsRepository.find();
    }

    async findOne(id: number): Promise<Event> {
        const event = await this.eventsRepository.findOneBy({ id });
        if (!event) {
            throw new NotFoundException(`Evento con ID ${id} no encontrado`);
        }
        return event;
    }

    async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
        await this.findOne(id); // Verificar que el evento existe
        await this.eventsRepository.update(id, updateEventDto);
        return this.findOne(id); // Retornar el evento actualizado
    }

    async remove(id: number): Promise<void> {
        const result = await this.eventsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Evento con ID ${id} no encontrado`);
        }
    }
}
