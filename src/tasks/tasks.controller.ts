/* eslint-disable prettier/prettier */
// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // Endpoint para crear una tarea
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    // Endpoint para listar todas las tareas
    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    // Endpoint para obtener una tarea por ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id);
    }

    // Endpoint para obtener tareas por ID de actividad
    @Get('activity/:activityId')  // Nuevo endpoint
    getTasksByActivityId(@Param('activityId') activityId: string) {
        return this.taskService.getTasksByActivityId(+activityId);
    }

    // Endpoint para actualizar una tarea
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(+id, updateTaskDto);
    }

    // Endpoint para eliminar una tarea
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.removeTask(+id);
    }
}
