/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'int' })
    cantidadParticipantes: number;

    @Column({ type: 'date' })
    fechaRealizacion: string; // Puedes usar Date, pero se convierte a string para simplificar
}
