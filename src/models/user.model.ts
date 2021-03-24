export default class User {
    email: string
    username: string
    token: string


    constructor(
        email: string = '',
        username: string = '',
        token: string = '',
        ){
       this.email = email
       this.username = username
       this.token = token
    }

    static fromJSON(json: any): User{
        return new User(
            json["username"],
            json["email"],
            json["access_token"],
        )
    }
}