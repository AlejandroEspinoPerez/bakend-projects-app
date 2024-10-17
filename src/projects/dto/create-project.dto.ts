/* eslint-disable prettier/prettier */
// src/projects/dto/create-project.dto.ts
// src/projects/dto/create-project.dto.ts
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsString()
    tipo: string;

    @IsString()
    localidad: string;

    @IsNumber()
    lider: number;  // ID del líder

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
