import { IsNotEmpty } from "class-validator";
class CreateBoardDto {

    @IsNotEmpty()
    readonly category:string;

    @IsNotEmpty()
    readonly title:string;

    @IsNotEmpty()
    readonly detail:string;
}

class CreateCommentBlogDto {
    @IsNotEmpty()
    readonly textcomment:string

    @IsNotEmpty()
    readonly blogerId:string
}

export { CreateBoardDto,CreateCommentBlogDto }