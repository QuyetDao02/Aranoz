export class users{
    userID:number;
    UserName: string;
    Password: string;
    role: number;

    constructor(id:number,name:string,pass:string,role:number){
        this.userID = id;
        this.UserName = name;
        this.Password = pass;
        this.role = role;
    }
}