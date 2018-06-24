import { Gateway } from "./gateway";
import { User } from "../entities";

export interface UserGateway extends Gateway<string, User> {
    getByEmail(email: string): Promise<User>
}
