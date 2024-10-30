/* eslint-disable prettier/prettier */
// src/activities/dto/create-activity.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateActivityDto {
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
    proyecto: number;

    @IsNotEmpty()
    @IsNumber()
    responsable: number; // Añade esta línea
}
