import { User } from "../models/user-model";

export const validateInput = (user: User) => {
   if(user.email.trim() === "" || user.name.trim() === "" || user.birthDate.trim() === "" ) {
    return "Field can't be empty.";
   }
   return null;
}

export const validateEmail = (email: string) => {
    const Regex = /^\S+@\S+\.\S+$/;
    return Regex.test(email)
}