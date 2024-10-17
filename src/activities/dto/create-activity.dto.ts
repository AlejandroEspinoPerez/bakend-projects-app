/* eslint-disable prettier/prettier */
// src/activities/dto/create-activity.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

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
    fechaFin: string;

    @IsNotEmpty()
    @IsNumber()
    proyectoId: number;

    @IsNotEmpty()
    @IsNumber()
    responsableId: number; // Añade esta línea
}
