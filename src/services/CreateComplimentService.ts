import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}




class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

        const complimentRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        const userReceiverrExists = await userRepositories.findOne(user_receiver);

        if (user_sender === user_receiver) {
            throw new AppError("Incorrect User Receiver")
        }

        if (!userReceiverrExists) {

            throw new AppError("User Receiver does not exists")
        }

        const compliment = complimentRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentRepositories.save(compliment);


        return compliment;

    }


}

export { CreateComplimentService }