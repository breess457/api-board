import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from './schema/users.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStragy } from './auth/jwt.strategy';
config()

@Module({
  imports:[
    JwtModule.register({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:"1d"}
    }),
    MongooseModule.forFeature([
      {name:'User', schema:usersSchema}
    ]),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserService,JwtStragy],
})
export class UserModule {}
