/* eslint-disable prettier/prettier */
// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Crear un usuario
    @Post()
    create(@Body() userData: Partial<User>): Promise<User> {
        return this.usersService.create(userData);
    }

    // Listar todos los usuarios
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // Obtener usuario por ID
    @Get('id/:id')  // Ruta específica para búsqueda por ID
    findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    // Obtener usuario por nombre
    @Get('nombre/:nombre')  // Ruta específica para búsqueda por nombre
    findByUsername(@Param('nombre') nombre: string): Promise<User> {
        return this.usersService.findByUsername(nombre);
    }

    // Modificar un usuario
    @Put(':id')
    update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
        return this.usersService.update(id, userData);
    }

    // Eliminar un usuario
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
