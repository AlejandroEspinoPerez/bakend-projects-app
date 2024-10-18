/* eslint-disable prettier/prettier */
import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsInt()
    cantidadParticipantes?: number;

    @IsOptional()
    @IsDate()
    fechaRealizacion?: string; // Puedes usar Date, pero se convierte a string para simplificar
}
