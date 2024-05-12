import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

@Schema({
  collection: 'books',
  timestamps: { createdAt: 'c_at', updatedAt: 'u_at' },
})
export class Book extends Document implements Omit<IBook, 'id'> {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  author: string;

  @Prop({ type: Number })
  price: number;

  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookDocument = HydratedDocument<Book>;

export interface IBook {
  id: Types.ObjectId;
  title: string;
  description: string;
  author: string;
  price: number;
  category: Category;
}

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}
