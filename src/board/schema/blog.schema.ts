import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Bloger extends Document {
    @Prop({ required : true })
    userId:string;

    @Prop({ required : true })
    category:string;

    @Prop({ required : true })
    title:string;

    @Prop({ required : true })
    detail:string;

    @Prop({ default: Date.now })
    createDate: Date;
}

@Schema()
export class CommentBlog extends Document {
    @Prop({ required : true })
    userId:string;

    @Prop({ required : true })
    blogerId:string;

    @Prop({ required : true })
    textcomment:string;

    @Prop({ default: Date.now })
    createDate: Date;
}

 const blogerSchema = SchemaFactory.createForClass(Bloger);
 const commentBlogSchema = SchemaFactory.createForClass(CommentBlog)

 export { blogerSchema,commentBlogSchema }