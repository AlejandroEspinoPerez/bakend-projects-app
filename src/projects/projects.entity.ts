/* eslint-disable prettier/prettier */
// src/projects/project.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Activity } from '../activities/activities.entity';  // Importa la entidad Activity

@Entity('Project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;  // Descripción del proyecto

    @Column()
    tipo: string;  // Puede ser 'infraestructura', 'salud', 'educación', 'cultura'

    @Column()
    localidad: string;  // Localidad donde se lleva a cabo el proyecto

    @ManyToOne(() => User)  // Relación de muchos proyectos a un líder
    lider: User;

    @ManyToMany(() => User)  // Relación de muchos proyectos a muchos miembros
    @JoinTable()  // Tabla intermedia para almacenar los miembros del proyecto
    miembros: User[];

    // Ficha aprobada
    @Column()
    objetivos: string;  // Descripción de los objetivos del proyecto

    @Column()
    presupuesto: number;  // Presupuesto asignado al proyecto

    @Column()
    fechaInicio: Date;  // Fecha de inicio del proyecto

    @Column()
    fechaFin: Date;  // Fecha de finalización del proyecto

    @Column()
    resultado: string;  // Resultados esperados del proyecto

    // Relación con actividades
    @OneToMany(() => Activity, (activity) => activity.proyecto, { cascade: true })
    activities: Activity[];  // Un proyecto tiene muchas actividades

}
