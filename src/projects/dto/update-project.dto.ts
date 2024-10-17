/* eslint-disable prettier/prettier */
// src/projects/dto/update-project.dto.ts
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
export class UpdateProjectDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsString()
    tipo: string;

    @IsString()
    localidad: string;

    @IsNumber()
    lider?: number;  // ID del líder

    @IsArray()
    @IsOptional()
    miembros?: number[];  // IDs de los miembros del proyecto

    @IsString()
    objetivos: string;

    @IsNumber()
    presupuesto: number;

    @IsString()
    fechaInicio: string;

    @IsString()
    fechaFin: string;

    @IsString()
    resultado: string;
}