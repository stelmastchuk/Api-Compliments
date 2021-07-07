import { Repository, EntityRepository, Entity } from "typeorm"
import { Compliment } from "../entities/Compliments"

@EntityRepository(Compliment)
class ComplimentsRepositories extends Repository<Compliment>{


}

export { ComplimentsRepositories }