import { IsNotEmpty } from "class-validator";
class CreateUserDto {
    @IsNotEmpty()
    readonly firstname:string;

    @IsNotEmpty()
    readonly lastname:string;

    @IsNotEmpty()
    readonly phone:string;

    @IsNotEmpty()
    readonly username:string;

    @IsNotEmpty()
    readonly password:string;
}
class LoginUserDto {
    @IsNotEmpty()
    readonly username:string;

    @IsNotEmpty()
    readonly password:string;
}

class Payload {
    @IsNotEmpty()
    readonly id:string;

    @IsNotEmpty()
    readonly username:string;

    @IsNotEmpty()
    readonly firstname:string;
}

export {CreateUserDto,LoginUserDto,Payload}