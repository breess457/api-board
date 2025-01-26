import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Bloger, blogerSchema } from './schema/blog.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';


describe('BoardController', () => {
  let controller: BoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({secret:"myLuzuduSecretKey",signOptions:{expiresIn : '1d'}}),
        MongooseModule.forRoot('mongodb://localhost:27017/unittestboarddatawow'),
        MongooseModule.forFeature([{name:Bloger.name, schema:blogerSchema}])
      ],
      controllers: [BoardController],
      providers: [BoardService,JwtService],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
