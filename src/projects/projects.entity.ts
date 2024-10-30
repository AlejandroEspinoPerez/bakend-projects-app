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
    descripcion: string;

    @Column()
    tipo: string;

    @Column()
    localidad: string;

    @ManyToOne(() => User)  // Relación de muchos proyectos a un líder
    lider: User;

    @ManyToMany(() => User)  // Relación de muchos proyectos a muchos miembros
    @JoinTable()  // Tabla intermedia para almacenar los miembros del proyecto
    miembros: User[];

    @Column()
    objetivos: string;

    @Column()
    presupuesto: number;

    @Column()
    fechaInicio: Date;

    @Column({ nullable: true })  // Hacemos que la columna sea opcional
    fechaFin: Date;

    @Column()
    resultado: string;

    @OneToMany(() => Activity, (activity) => activity.proyecto, { cascade: true })
    activities: Activity[];
}
