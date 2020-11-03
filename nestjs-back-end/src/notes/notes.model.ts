import * as mongoose from 'mongoose';

export const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
},{
    timestamps: true
});

export interface Note extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
}