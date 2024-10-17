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

    async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
        const { proyecto, responsable, ...restoDatos } = createActivityDto;

        // Busca el proyecto por ID
        const project = await this.projectRepository.findOne({ where: { id: proyecto } });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${proyecto} no encontrado.`);
        }

        // Busca el responsable por ID
        const responsableEntity = await this.userRepository.findOne({ where: { id: responsable } });
        if (!responsableEntity) {
            throw new NotFoundException(`Responsable con ID ${responsable} no encontrado.`);
        }

        // Crea la actividad con el proyecto y el responsable asociados
        const newActivity = this.activityRepository.create({
            ...restoDatos,
            proyecto: project,        // Relaciona el proyecto encontrado
            responsable: responsableEntity,  // Relaciona el responsable encontrado
        });

        return await this.activityRepository.save(newActivity);
    }


    // Obtener actividades por ID de proyecto
    async getActivitiesByProjectId(projectId: number): Promise<Activity[]> {
        const proyecto = await this.projectRepository.findOne({ where: { id: projectId } });
        if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado.`);
        }

        // Añadir la relación con 'responsable'
        return this.activityRepository.find({
            where: { proyecto: { id: projectId } },
            relations: ['proyecto', 'responsable'],  // Asegúrate de incluir ambas relaciones
        });
    }


    // Listar todas las actividades
    findAll(): Promise<Activity[]> {
        return this.activityRepository.find({ relations: ['proyecto','responsable'] });
    }

    // Obtener una actividad por ID
    findOne(id: number): Promise<Activity> {
        return this.activityRepository.findOne({ where: { id }, relations: ['proyecto','responsable'] });
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
