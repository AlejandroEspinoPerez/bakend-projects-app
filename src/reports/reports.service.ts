import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { Project } from '../projects/projects.entity';
import { Event } from '../events/events.entity';
import * as fs from 'fs';

@Injectable()
export class ReportsService {
    generateProjectReport(projects: Project[], events: Event[]) {
        const doc = new PDFDocument({ margin: 50 });
        this.addHeader(doc, 'Reporte General de Proyectos y Eventos');
        this.addSectionTitle(doc, 'Proyectos:'); // Título alineado
        this.addProjectsTable(doc, projects);
        doc.moveDown(2); // Espacio entre secciones
        this.addSectionTitle(doc, 'Eventos:'); // Título alineado
        this.addEventsTable(doc, events);
        doc.end();
        return doc;
    }

    private addSectionTitle(doc: PDFKit.PDFDocument, title: string) {
        // Alineación del título al margen izquierdo similar en ambas secciones
        doc.fontSize(16).text(title, 50, doc.y, { underline: true }).moveDown();
    }

    generateProjectsReport(projects: Project[]) {
        const doc = new PDFDocument({ margin: 50 });
        this.addHeader(doc, 'Reporte de Proyectos');
        this.addProjectsTable(doc, projects);
        doc.end();
        return doc;
    }

    generateEventsReport(events: Event[]) {
        const doc = new PDFDocument({ margin: 50 });
        this.addHeader(doc, 'Reporte de Eventos');
        this.addEventsTable(doc, events);
        doc.end();
        return doc;
    }

    private addHeader(doc: PDFKit.PDFDocument, title: string) {
        const logoPath = 'src/assets/logo.png';
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 30, { width: 100 });
        }
        doc.moveDown(2);
        doc.fontSize(20).text(title, { align: 'center' }).moveDown(2);
    }

    private addProjectsTable(doc: PDFKit.PDFDocument, projects: Project[]) {
        const table = {
            headers: ['#', 'Nombre', 'Tipo', 'Líder'],
            rows: projects.map((project, index) => [
                (index + 1).toString(),
                project.nombre,
                project.tipo,
                `${project.lider.nombre} ${project.lider.apellido}`,
            ]),
        };
        this.generateTable(doc, table);
    }

    private addEventsTable(doc: PDFKit.PDFDocument, events: Event[]) {
        const table = {
            headers: ['#', 'Nombre', 'Participantes', 'Fecha'],
            rows: events.map((event, index) => [
                (index + 1).toString(),
                event.nombre,
                event.cantidadParticipantes.toString(),
                new Date(event.fechaRealizacion).toISOString().split('T')[0],
            ]),
        };
        this.generateTable(doc, table);
    }

    private generateTable(doc: PDFKit.PDFDocument, table: { headers: string[], rows: string[][] }) {
        const columnWidths = [50, 150, 150, 150]; // Ancho fijo para cada columna
        const rowHeight = 30; // Altura fija para las filas

        // Dibujar encabezado de la tabla
        let y = doc.y;
        table.headers.forEach((header, i) => {
            doc.rect(50 + this.sumWidths(columnWidths, i), y, columnWidths[i], rowHeight).stroke();
            doc.text(header, 55 + this.sumWidths(columnWidths, i), y + 10, { width: columnWidths[i] - 10, align: 'center' });
        });

        y += rowHeight;

        // Dibujar las filas de la tabla
        table.rows.forEach((row) => {
            row.forEach((cell, i) => {
                doc.rect(50 + this.sumWidths(columnWidths, i), y, columnWidths[i], rowHeight).stroke();
                doc.text(cell, 55 + this.sumWidths(columnWidths, i), y + 10, { width: columnWidths[i] - 10, align: 'center' });
            });
            y += rowHeight;
        });
    }

    private sumWidths(widths: number[], index: number) {
        return widths.slice(0, index).reduce((a, b) => a + b, 0);
    }
}
