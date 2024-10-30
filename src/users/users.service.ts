/* eslint-disable prettier/prettier */
// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // Crear un nuevo usuario
    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    // Listar todos los usuarios
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // Obtener un usuario por ID
    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

    // Obtener un usuario por nombre de usuario
    async findByUsername(nombre: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { nombre } });
        if (!user) {
            throw new NotFoundException(`Usuario con nombre de usuario ${nombre} no encontrado`);
        }
        return user;
    }

    // Actualizar un usuario
    async update(id: number, userData: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, userData);
        return this.findOne(id);
    }

    // Eliminar un usuario
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    // Método para obtener solo los miembros
    async findMembers(): Promise<User[]> {
        return this.usersRepository.find({
            where: { rol: 'Miembro' }, // Asegúrate de que el rol esté correctamente configurado
        });
    }

    // Método para obtener solo los miembros
    async findLiders(): Promise<User[]> {
        return this.usersRepository.find({
            where: { rol: 'Lider' }, // Asegúrate de que el rol esté correctamente configurado
        });
    }
}
