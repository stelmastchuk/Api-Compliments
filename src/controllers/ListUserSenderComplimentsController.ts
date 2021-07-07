import { Response, Request } from "express";
import { ListUserSenderCompliments } from "../services/ListUserSendCompliments";

class ListUserSendComplimentsController {

    async handle(request: Request, response: Response) {

        const { user_id } = request;

        const listUserSendCompliments = new ListUserSenderCompliments();

        const compliments = await listUserSendCompliments.execute(user_id);

        console.log(compliments);

        return response.json(compliments);


    }




}

export { ListUserSendComplimentsController }