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
    lider: number;

    @IsArray()
    @IsOptional()
    miembros?: number[];

    @IsString()
    objetivos: string;

    @IsNumber()
    presupuesto: number;

    @IsString()
    fechaInicio: string;

    @IsOptional()
    @IsString()
    fechaFin?: string;

    @IsString()
    resultado: string;
}
