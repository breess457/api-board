import { Injectable } from '@nestjs/common';
import { CreateBoardDto, CreateCommentBlogDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bloger, CommentBlog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { Payload } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schema/users.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Bloger.name) private blogerModel:Model<Bloger>,
    @InjectModel(User.name) private usersModel:Model<User>,
    @InjectModel(CommentBlog.name) private commentBlogModel:Model<CommentBlog>
  ){}
  async createBlog(createBoardDto: CreateBoardDto,payload:Payload):Promise<any> {
    const createBloger = new this.blogerModel({
      userId:payload.id,
      category:createBoardDto.category,
      title:createBoardDto.title,
      detail:createBoardDto.detail
    })
    return createBloger.save()
  }

  async updateBlog(updateDto:UpdateBoardDto,payload:Payload){
    try{
      return await this.blogerModel.updateOne(
        {_id:updateDto.BlogId, userId:payload.id},
        {$set:updateDto}
      )
    }catch(e){
      console.log(e)
      return null
    }
  }

  async removeBlog(blogId:string,payload:Payload) {
    try{
        return await this.blogerModel.deleteOne({_id:blogId,userId:payload.id})
    }catch(e){
      console.log(e)
      return null
    }
  }

  async findAll(category?:string) {
    const query = category ? {category:category} : {}
    let blogger = await this.blogerModel.find(query).exec()
    if (!blogger.length) {
      return [];
    }
    const result = await Promise.all(
      blogger.map(async (blogdata)=>{
        let users = await this.usersModel.findById(blogdata.userId).select('-password').exec() 
        let countComment = await this.commentBlogModel.countDocuments({blogerId:blogdata._id}) 
        return {
          ...blogdata.toObject(),
          users,
          countComment
        }
      })
    )
    
    return result
  }

  async findBlogOne(blogid: string) {
    try{
      const bloger = await this.blogerModel.findById(blogid)
      if (bloger) {
        let users = await this.usersModel.findById(bloger.userId).select('-password').exec()
        let countComment = await this.commentBlogModel.countDocuments({blogerId:blogid})
        return {
          ...bloger.toObject(),
          users,
          countComment
        }
      }
      
      return null
    }catch(e){
      return null
    }

  }

  createComment(createCommentBlog:CreateCommentBlogDto, payload:Payload){
    try{
      const createcomment = new this.commentBlogModel({
        userId:payload.id,
        blogerId:createCommentBlog.blogerId,
        textcomment:createCommentBlog.textcomment
      })
      return createcomment.save()
    }catch(e){
      console.log(e)
      return null
    }
  }

  async listComment(blogerId:string){
    try{
      const listcomment = await this.commentBlogModel.find({blogerId:blogerId}).exec()
      if(!listcomment){
        return null
      }
      const resultdata = await Promise.all(
        listcomment.map(async(list:any)=>{
          let users = await this.usersModel.findById(list?.userId).select('-password').exec() 
          return {
            ...list.toObject(),
              users
          }
        })
      )
      return resultdata
    }catch(e){
      console.log(e)
      return null
    }
  }

  async listBlogOut(payload:Payload):Promise<any>{
    try{
      const listblogout = await this.blogerModel.find({userId:payload.id}).exec()
      if(!listblogout){
          return []
      }
      const resultblogqut = await Promise.all(
        listblogout.map(async(list:any)=>{
          const countComment = await this.commentBlogModel.countDocuments({blogerId:list?._id})
          return {
            ...list.toObject(),
            countComment
          }
        })
      )
      return resultblogqut
    }catch(e){
      console.log(e)
      return null
    }
  }

}
