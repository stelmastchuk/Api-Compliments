import { Request, Response } from "express"
import { CreateTagsService } from "../services/CreateTagsService";




class CreateTagController {

    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createTagsService = new CreateTagsService();

        const tag = await createTagsService.execute({ name });

        return response.json(tag);


    }

}

export { CreateTagController }