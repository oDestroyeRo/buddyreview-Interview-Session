import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    async addNote(
        @Body('title') noteTitle: string,
        @Body('description') noteDesc: string,
    ) {
        const note = await this.notesService.insertNote(
            noteTitle,
            noteDesc,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Note added successfully',
            data: note,
        };
    }

    @Get()
    async getAllnotes() {
        const notes = await this.notesService.getNotes();
        return notes;
    }

    @Get(':id')
    getNote(@Param('id') noteId: string) {
        return this.notesService.getSingleNote(noteId);
    }

    @Patch(':id')
    async updateNote(
        @Param('id') noteId: string,
        @Body('title') noteTitle: string,
        @Body('description') noteDesc: string,
    ) {
        const note = await this.notesService.updateNote(
            noteId,
            noteTitle,
            noteDesc,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Note updated successfully',
            note: note,
        };
    }

    @Delete(':id')
    async removeNote(@Param('id') noteId: string) {
        const isDeleted = await this.notesService.deleteNote(noteId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Note deleted successfully',
            };
        }
    }
}