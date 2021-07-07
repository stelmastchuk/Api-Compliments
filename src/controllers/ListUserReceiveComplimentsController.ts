import { Response, Request } from "express";
import { ListUserReceiveCompliments } from "../services/ListUserReceiveCompliments";

class ListUserReceiveComplimentsController {

    async handle(request: Request, response: Response) {

        const { user_id } = request;

        const listUserReceiveCompliments = new ListUserReceiveCompliments();

        const compliments = await listUserReceiveCompliments.execute(user_id);

        console.log(compliments);

        return response.json(compliments);


    }




}

export { ListUserReceiveComplimentsController }