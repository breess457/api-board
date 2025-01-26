import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from './schema/users.schema';
import { JwtModule,JwtService } from '@nestjs/jwt';
import { Mongoose } from 'mongoose';

describe('UserController', () => {
  let controller: UserController;
  let userService:UserService;
  let jwtservice:JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({secret:"myLuzuduSecretKey",signOptions:{expiresIn : '1d'}}),
        MongooseModule.forRoot('mongodb://localhost:27017/unittestboarddatawow'),
        MongooseModule.forFeature([{name:User.name, schema:usersSchema}])
      ],
      controllers: [UserController],
      // providers: [UserService,JwtService,{
      //   provide:getModelToken(User.name),
      //   useValue:{find: jest.fn}
      // }],
      providers: [UserService,JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
