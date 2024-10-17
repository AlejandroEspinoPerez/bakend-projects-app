/* eslint-disable prettier/prettier */
// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Activity } from '../activities/activities.entity';
import { User } from '../users/users.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { actividad, responsable, ...restoDatos } = createTaskDto;

        // Busca la actividad por ID
        const activity = await this.activityRepository.findOne({ where: { id: actividad } });
        if (!activity) {
            throw new NotFoundException(`Actividad con ID ${actividad} no encontrada.`);
        }

        // Busca el responsable por ID
        const responsableEntity = await this.userRepository.findOne({ where: { id: responsable } });
        if (!responsableEntity) {
            throw new NotFoundException(`Responsable con ID ${responsable} no encontrado.`);
        }

        // Crea la tarea con la actividad y el responsable asociados
        const newTask = this.taskRepository.create({
            ...restoDatos,
            actividad: activity,        // Relaciona la actividad encontrada
            responsable: responsableEntity,  // Relaciona el responsable encontrado
        });

        return await this.taskRepository.save(newTask);
    }

    // Obtener tareas
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({ relations: ['actividad', 'responsable'] });
    }

    // Obtener una tarea por ID
    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['actividad', 'responsable'] });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
        }
        return task;
    }

    // Obtener tareas por actividad
    async getTasksByActivityId(activityId: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { actividad: { id: activityId } },
            relations: ['actividad', 'responsable']
        });
    }

    // Actualizar tarea
    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id);
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }

    // Eliminar tarea
    async removeTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
        }
    }
}
