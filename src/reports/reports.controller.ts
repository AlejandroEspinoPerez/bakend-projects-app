import { Controller, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ProjectsService } from '../projects/projects.service';
import { EventsService } from '../events/events.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly pdfGeneratorService: ReportsService,
        private readonly projectService: ProjectsService,
        private readonly eventService: EventsService,
    ) { }

    @Get('/pdf')
    async generatePDFReport(@Res() res: Response) {
        try {
            const projects = await this.projectService.findAll();
            const events = await this.eventService.findAll();
            const doc = this.pdfGeneratorService.generateProjectReport(projects, events);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=general-report.pdf');
            doc.pipe(res);

            doc.on('end', () => console.log('PDF generado correctamente.'));
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            throw new HttpException('Error al generar el reporte', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/projects/pdf')
    async generateProjectsReport(@Res() res: Response) {
        try {
            const projects = await this.projectService.findAll();
            const doc = this.pdfGeneratorService.generateProjectsReport(projects);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=projects-report.pdf');
            doc.pipe(res);

            doc.on('end', () => console.log('Reporte de Proyectos generado correctamente.'));
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            throw new HttpException('Error al generar el reporte', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/events/pdf')
    async generateEventsReport(@Res() res: Response) {
        try {
            const events = await this.eventService.findAll();
            const doc = this.pdfGeneratorService.generateEventsReport(events);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=events-report.pdf');
            doc.pipe(res);

            doc.on('end', () => console.log('Reporte de Eventos generado correctamente.'));
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            throw new HttpException('Error al generar el reporte', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
