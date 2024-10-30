/* eslint-disable prettier/prettier */
// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

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
    @IsOptional()
    fechaFin?: string;

    @IsNotEmpty()
    @IsNumber()
    responsable: number; // ID del responsable

    @IsNotEmpty()
    @IsNumber()
    actividad: number; // ID de la actividad asociada
}