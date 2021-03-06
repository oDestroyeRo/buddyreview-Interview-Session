import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus,Query } from '@nestjs/common';
import { query } from 'express';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    async addNote(
        @Body('title') noteTitle: string,
        @Body('content') noteContent: string,
        @Body('tags') noteTag: [string],
    ) {
        const note = await this.notesService.insertNote(
            noteTitle,
            noteContent,
            noteTag
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Note added successfully',
            data: note,
        };
    }

    @Get()
    async getAllnotes(
        @Query('sort') sort: string,
        @Query('sortField') sortField: string,
        @Query('tags') tag: [string]) {
        const notes = await this.notesService.getNotes(sort, sortField, tag);
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
        @Body('content') noteDesc: string,
        @Body('tags') noteTags: [string],
    ) {
        const note = await this.notesService.updateNote(
            noteId,
            noteTitle,
            noteDesc,
            noteTags,
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