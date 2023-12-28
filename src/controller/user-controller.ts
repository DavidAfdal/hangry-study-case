import { User } from "../models/user-model"

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
                reject(`User with ${id} does not exist`);
            }
         });
    }

    public CreateUser(user : User) {
        return new Promise((resolve, reject) => {
            const exitedUser = this.dataUser.find((data) => data.email === user.email);

            if (exitedUser) {
                return reject(`User with ${exitedUser.email} already exists`);
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

            if (!user) {
                reject("User not exits");
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
                return reject("User not exits");
            }
            
            const data = this.dataUser.filter((data) => data.id !== parseInt(id));
            console.log(data)
            this.dataUser = data;
            return resolve(exitedUser);
        })
    }

   
}