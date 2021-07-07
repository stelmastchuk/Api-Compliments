import { getCustomRepository } from "typeorm"
import { AppError } from "../errors/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSenderCompliments {

    async execute(id: string) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);


        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: id,
            },
            relations: ["userReceiver", "userSender", "tag"]
        });

        if (!compliments) {
            throw new AppError("Not compliments sended");
        }

        return compliments;




    }



}

export { ListUserSenderCompliments }