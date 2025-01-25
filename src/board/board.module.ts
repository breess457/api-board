import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { blogerSchema, commentBlogSchema } from './schema/blog.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStragy } from 'src/user/auth/jwt.strategy';
import { usersSchema } from 'src/user/schema/users.schema';

@Module({
  imports:[
    JwtModule.register({
      secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:"1d"}
    }),
    MongooseModule.forFeature([
      {name:"Bloger",schema:blogerSchema},
      {name:'User', schema:usersSchema},
      {name:'CommentBlog', schema:commentBlogSchema}
    ]),
    PassportModule
  ],
  controllers: [BoardController],
  providers: [BoardService,JwtStragy],
})
export class BoardModule {}
