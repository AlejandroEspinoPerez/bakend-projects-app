/* eslint-disable prettier/prettier */
// src/activities/dto/update-activity.dto.ts
import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class UpdateActivityDto {
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
    fechaFin?: string;

    @IsOptional()
    @IsNumber()
    responsableId?: number; // Cambia responsable a responsableId
}
