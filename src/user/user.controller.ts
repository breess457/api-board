import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { config } from 'dotenv';
import { JwtAuthGuard } from './auth/jwt.auth';

config()

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService:JwtService
  ) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res({passthrough:true}) response:Response
  ) {
    try{
      const createUser = await this.userService.createUsers(createUserDto);
      if(createUser){
        const token = this.jwtService.sign(
          {id:createUser.id, username:createUser.username, firstname:createUser.firstname}
        )
        const expires = new Date()
        response.cookie('Authentication', token,{
            secure:true,
            httpOnly:true,
            expires
        })
        return {
          statusCode:201,
          message:"create user success fully",
          nameuser:createUser.firstname,
          token:token
        }
      }
      return {
        statusCode:409,
        message:"have user"
      }
      
    }catch(e){
      console.log(e)
    }
  }

  @Post('login')
  async getLogin(
    @Body()loginUserDto:LoginUserDto,
    @Res({ passthrough:true }) response:Response
  ){
      try{
        const getUser = await this.userService.getLogin(loginUserDto)
        if(getUser){
          const token = this.jwtService.sign(
            {id:getUser.id,username:getUser.username,firstname:getUser.firstname},
          )
          const expires = new Date();
          response.cookie('Authentication',token,{
            secure:false,
            httpOnly:true,
            sameSite: 'lax',
            expires
          })
          return {
            statusCode:201,
            message:"login success fully",
            nameuser:getUser.firstname,
            token:token
          }
        }
        return{
          statusCode:409,
          message:'Email or password is incorrect.'
        }
      }catch(e){
        console.log(e)
      }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req){
      const getProfile = await this.userService.getProfile(req.user)
      if(getProfile){
        return {
          statusCode: 200,
            message: 'Profile retrieved successfully',
            data: {Profile:getProfile}
        }
      }
      return null
  }
}
