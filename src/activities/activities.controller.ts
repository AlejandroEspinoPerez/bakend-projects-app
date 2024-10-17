/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActivityService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    // Endpoint para crear una actividad
    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activityService.createActivity(createActivityDto);
    }

    // Endpoint para listar todas las actividades
    @Get()
    findAll() {
        return this.activityService.findAll();
    }

    // Endpoint para obtener una actividad por ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activityService.findOne(+id);
    }

    // Endpoint para obtener actividades por ID de proyecto
    @Get('project/:projectId')  // Nuevo endpoint
    getActivitiesByProjectId(@Param('projectId') projectId: string) {
        return this.activityService.getActivitiesByProjectId(+projectId);
    }

    // Endpoint para actualizar una actividad
    @Put(':id')
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activityService.updateActivity(+id, updateActivityDto);
    }

    // Endpoint para eliminar una actividad
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.removeActivity(+id);
    }
}
