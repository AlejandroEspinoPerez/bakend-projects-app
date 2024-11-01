/* eslint-disable prettier/prettier */
// src/projects/projects.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    // src/projects/projects.controller.ts
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.projectsService.findOne(id);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.projectsService.remove(id);
    }
}
