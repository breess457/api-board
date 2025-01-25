import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, Payload } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel:Model<User>
  ){}
  async createUsers(createUserDto: CreateUserDto):Promise<User | null> {
    const checkusers = await this.usersModel.findOne({username:createUserDto.username})
    if(!checkusers){
      const newUsers = new this.usersModel({
        firstname: createUserDto.firstname,
        lastname:createUserDto.lastname,
        phone:createUserDto.phone,
        username:createUserDto.username,
        password: await bcrypt.hash(createUserDto.password,10)
      })
      return newUsers.save()
    }
    return null
  }

  async getLogin(loginDto:LoginUserDto):Promise<User | null>{
    const findUsers = await this.usersModel.findOne({username:loginDto.username})
    if(findUsers && (await bcrypt.compare(loginDto.password, findUsers.password))){
      return findUsers
    }
    return null
  }

  async getProfile(payload:Payload):Promise<User | null>{
    return await this.usersModel.findById(payload.id).select('-password').exec()
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
