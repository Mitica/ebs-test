
import { MongoRepository } from './mongo/mongo-repository';
import { UserGateway, User } from 'test-domain';

export class UserRepository extends MongoRepository<string, User> implements UserGateway {
    getByEmail(email: string): Promise<User | null> {
        return this.model.one({ where: { email } });
    }
    getByFacebookId(facebookId: string): Promise<User | null> {
        return this.model.one({ where: { facebookId } });
    }
}
