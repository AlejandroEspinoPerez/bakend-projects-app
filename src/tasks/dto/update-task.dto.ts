/* eslint-disable prettier/prettier */
// src/tasks/dto/update-task.dto.ts
import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsDateString()
    fechaInicio?: string;

    @IsOptional()
    @IsDateString()
    @IsOptional()
    fechaFin?: string;

    @IsOptional()
    @IsNumber()
    responsable?: number; // ID del responsable

    @IsOptional()
    @IsNumber()
    actividad?: number; // ID de la actividad asociada
}