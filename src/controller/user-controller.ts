import { setError } from "../models/error-model";
import { User } from "../models/user-model"
import { errBadRequest, errNotFound, errUserExists } from "../utils/error";
import { validateEmail, validateInput } from "../utils/validate";

export default class UserController {
   private dataUser: User[]

    public constructor(data : User[]) {
        this.dataUser = data;
    }

    public GetUsers(){
        return new Promise<User[]>((resolve, _) =>{
            resolve(this.dataUser)
        } );
    } 

    public GetUserById(id:string)    {
        return new Promise<User>((resolve, reject) => {
            const user = this.dataUser.find((data) => data.id === parseInt(id));
            if(user) {
                resolve(user);
            } else {
                reject(setError(errNotFound,`User with ${id} does not exist`));
            }
         });
    }

    public CreateUser(user : User) {
        return new Promise((resolve, reject) => {
            
            const checkInput = validateInput(user);
            const checkEmail = validateEmail(user.email)

            if(typeof checkInput === 'string') {
               return reject(setError(errBadRequest, "Field can't be empty"));
            }

            if(!checkEmail) {
              return reject(setError(errBadRequest, "Email is not valid"));
            }

            const exitedUser = this.dataUser.find((data) => data.email === user.email);

            if (exitedUser) {
                return reject(setError(errUserExists,`User with ${exitedUser.email} already exists`));
            } 
            
                const data = {
                    id: (this.dataUser.at(-1)?.id || 0) + 1,
                    name: user.name,
                    email: user.email,
                    birthDate: user.birthDate
                }

                this.dataUser.push(data);
                return resolve(data);
            
        })
    }

    public UpdateUser(id: string, data: User) {
        return new Promise((resolve, reject) => {
            const user = this.dataUser.find((data) => data.id === parseInt(id));

            const checkInput = validateInput(data);
            const checkEmail = validateEmail(data.email)

            if(typeof checkInput === 'string') {
               return reject(setError(errBadRequest, "Field can't be empty"));
            }

            if(!checkEmail) {
              return reject(setError(errBadRequest, "Email is not valid"));
            }


            if (!user) {
                reject(setError(errNotFound, "User not found"));
            } else {
                user.name = data.name; 
                user.email = data.email;
                user.birthDate = data.birthDate;
                resolve(user);
            }
    
        })
    }

    public DeleteUser(id: string) {
        return new Promise((resolve, reject) => {
            const exitedUser = this.dataUser.find((data) => data.id === parseInt(id));
            
            if(!exitedUser) {
                return reject(setError(errNotFound, "User not found"));
            }
            
            const data = this.dataUser.filter((data) => data.id !== parseInt(id));
            console.log(data)
            this.dataUser = data;
            return resolve(exitedUser);
        })
    }

   
}