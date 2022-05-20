import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {

	@Prop({required: true})
	public title: string

	@Prop({required: true})
	public description: string

	@Prop({required: true})
	public author: string

}

export const BookSchema = SchemaFactory.createForClass<Book>(Book);
