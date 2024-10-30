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

    @IsOptional()
    @IsNumber()
    lider?: number;

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
