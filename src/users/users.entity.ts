/* eslint-disable prettier/prettier */
// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from '../activities/activities.entity'; // Importa la entidad Activity

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'miembro' })
    rol: string;  // Puede ser 'jefe directivo', 'administrador', 'líder', 'miembro'

    @Column({ default: false })  // El valor por defecto es 'false' para usuarios no activados
    isActive: boolean;

    @OneToMany(() => Activity, (activity) => activity.responsable) // Relación inversa
    activities: Activity[]; // Opcional: agregar esta propiedad si necesitas acceder a las actividades de un usuario
}

