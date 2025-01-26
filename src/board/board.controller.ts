import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req,Query, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, CreateCommentBlogDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt.auth';
import { JwtService } from '@nestjs/jwt';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly jwtService:JwtService
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBoardDto: CreateBoardDto, @Req() req) {
    const createBlog = await this.boardService.createBlog(createBoardDto,req.user);
    if(createBlog){
        return {
          statusCode:201,
          message:"insert success",
          data:createBlog
        }
    }
    return {
      statusCode:301,
      message:"insert false"
    }
  }

  @Put('updateblog')
  @UseGuards(JwtAuthGuard)
  async updateBlog(@Body() updateDto:UpdateBoardDto,@Req() req){
    const updateData = await this.boardService.updateBlog(updateDto,req.user)
    if(updateData){
        return {
          statusCode:201,
          message:"update success",
          data:updateData
        }
    }
    return {
      statusCode:301,
      message:"update failed"
    }
  }

  @Delete('deleteblog')
  @UseGuards(JwtAuthGuard)
  async deleteBlog(@Query('blogid') blogId:string, @Req() req){
    console.log({blogId, payload:req.user})
      try{
        const deletedata = await this.boardService.removeBlog(blogId,req.user)
        if(deletedata){
          return {
            statusCode:201,
            message:"delete success",
            data:deletedata
          }
        }
      }catch(e){
        return {
          statusCode:301,
          message:"error"
        }
      }
  }

  @Get('boardall')
  findAll(@Query('category') category?:string) {
    return this.boardService.findAll(category);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    console.log({id})
    return this.boardService.findBlogOne(id);
  }

  @Post('createcomment')
  @UseGuards(JwtAuthGuard)
  async createCommenr(@Body() createComment:CreateCommentBlogDto, @Req() req){
      const createcomments = await this.boardService.createComment(createComment,req.user)
      if(createcomments){
          return {
            statusCode:201,
            message:"create comment success",
            data:createcomments
          }
      }
      return {
        statusCode:301,
        message:"create comment false"
      }
  }

  @Get('listcomment/:blogid')
  async listCommentBlog(@Param('blogid') id:string){
    return await this.boardService.listComment(id)
  }

  
  @Get('outblog')
  @UseGuards(JwtAuthGuard)
  async outBlog(@Req() req){
      console.log("dd:",req.user)
      return await this.boardService.listBlogOut(req.user)
  }
}
