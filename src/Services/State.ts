import { UserData } from '../Types/User';
import { BehaviorSubject } from "rxjs";

export const $User = new BehaviorSubject<UserData | null>(null)

