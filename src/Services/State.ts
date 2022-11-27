import { UserData } from './../Types/User.d';
import { BehaviorSubject } from "rxjs";

export const $User = new BehaviorSubject<UserData | null>(null)

