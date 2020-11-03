import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note } from './notes.model';

@Injectable()
export class NotesService {
    constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

    async insertNote(title: string, content: string, tags: [string]) {
        const newNote = new this.noteModel({
            title,
            content,
            tags,
        });
        const result = await newNote.save();
        return result;
    }

    async getNotes(sort: string, sortField: string, tags: [string]) {
        let notes
        if (sort && !sortField){
            throw new NotFoundException('Please input id or createdAt or updatedAt with sortField param');
        }
        else if (!sort && sortField){
            throw new NotFoundException('Please input desc or asc with sort param');
        }
        else if (sort && sortField){
            if (sort != 'asc' && sort != 'desc'){
                throw new NotFoundException('Please input desc or asc with sort param');
            }
            if (sortField != 'createdAt' && sortField != 'updatedAt' && sortField != '_id' && sortField != 'title'&& sortField != 'content'){
                throw new NotFoundException('Please input _id or createdAt or updatedAt or title or content with sortField param');
            }
            if (tags){
                notes = await this.noteModel.find({ "tags": tags }).sort([[sortField, sort]]).exec();
            }
            else{
                notes = await this.noteModel.find().sort([[sortField, sort]]).exec();
            }
            
        }
        else if (!sort && !sortField){
            if (tags){
                notes = await this.noteModel.find({ "tags": tags }).exec();
            }
            notes = await this.noteModel.find().exec();
        }
        return notes.map(note => ({
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        }));
    }

    async getSingleNote(noteId: string) {
        const note = await this.findNote(noteId);
        return {
            id: note.id,
            title: note.title,
            tags: note.tags,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        };
    }

    async updateNote(noteId: string, title: string, content: string, tags: [string]) {
        const updatedNote = await this.findNote(noteId);
        if (title) {
        updatedNote.title = title;
        }
        if (content) {
        updatedNote.content = content;
        }
        if (tags) {
            updatedNote.tags = tags;
        }
        updatedNote.save();
        return updatedNote;
    }

    async deleteNote(noteId: string) {
        const result = await this.noteModel.deleteOne({ _id: noteId }).exec();
        if (result.n === 0) {
        throw new NotFoundException('Could not find note.');
        }
        return true;
    }


    private async findNote(id: string): Promise<Note> {
        let note;
        try {
            note = await this.noteModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find note.');
        }
        if (!note) {
            throw new NotFoundException('Could not find note.');
        }
        return note;
    }
    }