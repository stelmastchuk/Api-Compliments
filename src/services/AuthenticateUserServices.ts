import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}



class AuthenticateUserServices {

    async execute({ email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({ email });

        if (!user) {
            throw new AppError("Email or password incorrect");
        }


        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {

            throw new AppError("Email or password incorrect");

        }

        const token = sign({
            email: user.email
        }, "eb370e1fd8c45f184f268646ce1cf942", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }



}

export { AuthenticateUserServices };