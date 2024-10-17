/* eslint-disable prettier/prettier */
// src/tasks/task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from '../activities/activities.entity';
import { User } from '../users/users.entity'; // Asegúrate de importar la entidad User

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ type: 'date' })
    fechaInicio: string;

    @Column({ type: 'date' })
    fechaFin: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' }) // Relación con User
    responsable: User;  // Relación con el responsable

    @ManyToOne(() => Activity, (activity) => activity.tasks, { onDelete: 'CASCADE' })
    actividad: Activity;  // Relación con la actividad
}
