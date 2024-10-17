/* eslint-disable prettier/prettier */
// src/projects/projects.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { User } from '../users/users.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const { lider, miembros, ...projectData } = createProjectDto;

        // Asegúrate de que 'lider' y 'miembros' están definidos
        if (!lider) {
            throw new Error("El ID del líder es obligatorio");
        }

        const project = this.projectRepository.create({
            ...projectData,
            lider: { id: lider }, // Asegúrate de que está en el formato correcto
            miembros: miembros ? miembros.map(id => ({ id })) : [],
        });

        return this.projectRepository.save(project);
    }

    // Listar todos los proyectos
    findAll(): Promise<Project[]> {
        return this.projectRepository.find({ relations: ['lider', 'miembros'] });
    }

    // src/projects/projects.service.ts
    async findOne(id: number): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id }, relations: ['lider', 'miembros'] });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
        return project;
    }

    
    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id }, relations: ['lider', 'miembros'] });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }

        const { lider, miembros, ...data } = updateProjectDto;

        if (lider) {
            const leader = await this.userRepository.findOne({ where: { id: lider } });
            if (!leader) {
                throw new NotFoundException(`Líder con ID ${lider} no encontrado`);
            }
            project.lider = leader;
        }

        if (miembros) {
            project.miembros = await this.userRepository.findByIds(miembros);
        }

        Object.assign(project, data);

        return this.projectRepository.save(project);
    }

    async remove(id: number): Promise<void> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
        await this.projectRepository.delete(id);
    }

}
