import { getCustomRepository } from "typeorm"
import { AppError } from "../errors/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceiveCompliments {

    async execute(id: string) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);


        const compliments = await complimentsRepositories.find({ user_receiver: id });

        if (!compliments) {

            throw new AppError("No compliments received");
        }

        return compliments;







    }



}

export { ListUserReceiveCompliments }