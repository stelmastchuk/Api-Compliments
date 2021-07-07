import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
    name: string;
}





class CreateTagsService {

    async execute({ name }: ITagRequest) {

        const tagsRepository = getCustomRepository(TagsRepositories);


        if (!name) {
            throw new AppError("NameTag incorrect");
        }

        const tagAlreadyExist = await tagsRepository.findOne({ name });


        if (tagAlreadyExist) {
            throw new AppError("Tag already exists")
        }


        const tags = tagsRepository.create({ name });

        await tagsRepository.save(tags);

        return tags;



    }



}



export { CreateTagsService }