/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activities.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Project } from '../projects/projects.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    // src/activities/activities.service.ts
    async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
        const { proyectoId, responsableId, ...activityData } = createActivityDto;

        const proyecto = await this.projectRepository.findOne({ where: { id: proyectoId } });
        if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${proyectoId} no encontrado.`);
        }

        const responsable = await this.userRepository.findOne({ where: { id: responsableId } }); // Asegúrate de importar y usar el repositorio de usuarios
        if (!responsable) {
            throw new NotFoundException(`Usuario con ID ${responsableId} no encontrado.`);
        }

        const actividad = this.activityRepository.create({ ...activityData, proyecto, responsable }); // Asignar responsable como objeto User
        return this.activityRepository.save(actividad);
    }

    // Obtener actividades por ID de proyecto
    async getActivitiesByProjectId(projectId: number): Promise<Activity[]> {
        const proyecto = await this.projectRepository.findOne({ where: { id: projectId } });
        if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado.`);
        }

        return this.activityRepository.find({ where: { proyecto: { id: projectId } }, relations: ['proyecto'] });
    }

    // Listar todas las actividades
    findAll(): Promise<Activity[]> {
        return this.activityRepository.find({ relations: ['proyecto'] });
    }

    // Obtener una actividad por ID
    findOne(id: number): Promise<Activity> {
        return this.activityRepository.findOne({ where: { id }, relations: ['proyecto'] });
    }

    // Actualizar una actividad
    async updateActivity(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
        const actividad = await this.activityRepository.findOne({ where: { id } });
        if (!actividad) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada.`);
        }

        Object.assign(actividad, updateActivityDto);
        return this.activityRepository.save(actividad);
    }

    // Eliminar una actividad
    async removeActivity(id: number): Promise<void> {
        const result = await this.activityRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada.`);
        }
    }
}
