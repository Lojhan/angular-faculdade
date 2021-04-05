export default class User {
    username: string
    token: string
    id: number


    constructor(
        username: string = '',
        token: string = '',
        id: number = 0
        ){
       this.username = username
       this.token = token
       this.id = id
    }

}