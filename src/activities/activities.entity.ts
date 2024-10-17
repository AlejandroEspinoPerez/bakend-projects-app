/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { User } from '../users/users.entity'; // Asegúrate de importar la entidad User
import { Task } from '../tasks/tasks.entity'; // Importa la entidad Task
@Entity()
export class Activity {
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
    responsable: User;  // Cambiar a relación con User

    @ManyToOne(() => Project, (project) => project.activities, { onDelete: 'CASCADE' })
    proyecto: Project;  // Relación con el proyecto

    @OneToMany(() => Task, (task) => task.actividad) // Relación con las tareas
    tasks: Task[]; // Opcional: agregar esta propiedad si necesitas acceder a las tareas de una actividad
}
