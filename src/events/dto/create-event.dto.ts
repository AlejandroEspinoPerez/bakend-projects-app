/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt, IsString, IsDate } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    cantidadParticipantes: number;

    @IsNotEmpty()
    @IsDate()
    fechaRealizacion: string; // Puedes usar Date, pero se convierte a string para simplificar
}
