import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { config } from 'dotenv';
import { Payload } from "../dto/create-user.dto";

config()

@Injectable()
export class JwtStragy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken() ,
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET
        })
    }

    async validate(payload:Payload){
        return {id:payload.id, username:payload.username, firstname:payload.firstname}
    }
}
