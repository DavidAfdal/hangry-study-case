import http from "http";
import UserController from "./controller/user-controller";
import ApiRespone from "./utils/api-respon";
import { GetReqBody } from "./utils/request-body";
import { DataUser } from "./data";


const userController = new UserController(DataUser);

const server = http.createServer(async (req:http.IncomingMessage, res:http.ServerResponse) => {
    //api for get all user `http://localhost:5000/api/users`
    if(req.url === "/api/users" && req.method === "GET") {
        const users = await userController.GetUsers();
        res.writeHead(200, {"Content-Type": "application/json"})
        return res.end(JSON.stringify(ApiRespone.StatusSuccessWithData("Succes get data user", users)));
    } 
    // api for get user by id "http://localhost:5000/api/users/1"
    else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method == "GET") {
        try {
        const id = req.url.split('/')[3];
        const user = await userController.GetUserById(id);

        res.writeHead(200, {"Content-Type": "application/json"})

        res.end(JSON.stringify(ApiRespone.StatusSuccessWithData("Succes get data user by id", user)));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify(ApiRespone.StatusError(error as string))); 
        }
    } 
    // api for update user by id "http://localhost:5000/api/users/1"
    else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split('/')[3];
            const userData = await GetReqBody(req) as string;
            const user = await userController.UpdateUser(id,JSON.parse(userData));
    
            res.writeHead(200, {"Content-Type": "application/json"})
    
            res.end(JSON.stringify(ApiRespone.StatusSuccessWithData("Succes update data user", user)));
            } catch (error) {
                res.writeHead(404, {"Content-Type": "application/json"})
                res.end(JSON.stringify(ApiRespone.StatusError(error as string))); 
            }
    } 
    // api for delete user by id "http://localhost:5000/api/users/1"
    else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split('/')[3];
            const user = await userController.DeleteUser(id);
    
            res.writeHead(200, {"Content-Type": "application/json"})
    
            res.end(JSON.stringify(ApiRespone.StatusSuccessWithData("Succes delete user", user)));
            } catch (error) {
                res.writeHead(404, {"Content-Type": "application/json"})
                res.end(JSON.stringify(ApiRespone.StatusError(error as string))); 
            }
    } 
    // api for create user "http://localhost:5000/api/users"
    else if (req.url === "/api/users" && req.method === "POST") {
        try {
            const userData= await GetReqBody(req);
            const user = await userController.CreateUser(JSON.parse(userData as string));
    
            res.writeHead(201, {"Content-Type": "application/json"})
            res.end(JSON.stringify(ApiRespone.StatusSuccessWithData("Succes create user", user)));
            } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify(ApiRespone.StatusError(error as string))); 
            }
    }
    else {
        res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify(ApiRespone.StatusError("url not exited"))); 
    }
})

server.listen(5000, () => {
    console.log("Running ports 5000");
})