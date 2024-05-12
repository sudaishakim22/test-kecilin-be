import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, HydratedDocument } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'c_at', updatedAt: 'u_at' },
})
export class User extends Document implements Omit<IUsers, 'id'> {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
export type UsersDocument = HydratedDocument<User>;

export interface IUsers {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}
