import * as mongoose from 'mongoose';

export const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: false },
},{
    timestamps: true
});

export interface Note extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  tags: [string];
  updatedAt: Date;
  createdAt: Date;
}