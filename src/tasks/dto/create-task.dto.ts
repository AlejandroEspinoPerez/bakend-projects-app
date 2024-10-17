/* eslint-disable prettier/prettier */
// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsDateString()
    fechaInicio: string;

    @IsNotEmpty()
    @IsDateString()
    fechaFin: string;

    @IsNotEmpty()
    @IsNumber()
    responsable: number; // ID del responsable

    @IsNotEmpty()
    @IsNumber()
    actividad: number; // ID de la actividad asociada
}