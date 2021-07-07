import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare, hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}


class CreateUserService {

    async execute({ name, email, admin = false, password }: IUserRequest) {

        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new AppError("Email or password incorrect");
        }

        if (!password) {
            throw new AppError("Email or password incorrect");
        }

        const userAlreadyExist = await usersRepository.findOne({ email, });

        if (userAlreadyExist) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await usersRepository.save(user);


        return user;

    }


}

export { CreateUserService };