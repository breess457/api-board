import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User extends Document {
    @Prop({ required : true })
    firstname:string;

    @Prop({ required : true })
    lastname:string;

    @Prop({ required : true })
    phone:string;

    @Prop({ required : true })
    username:string;

    @Prop({ required : true })
    password:string;

    @Prop({ default: Date.now })
    createDate: Date;
}

export const usersSchema = SchemaFactory.createForClass(User);
