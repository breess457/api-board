import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
    @IsString()
    @IsOptional()
    BlogId:string
}
