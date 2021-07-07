import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {

    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }

    //vai ignorar a primeira posição, o split vai separar pelo espaço, e o token vai entrar na variavel token do array
    const [, token] = authtoken.split(" ");


    try {

        const { sub } = verify(token, "eb370e1fd8c45f184f268646ce1cf942") as IPayload;

        request.user_id = sub;

        return next();


    } catch (err) {
        return response.status(401).end();
    }





}

