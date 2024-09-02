export interface Iuser{
    id : number | string
}
export interface IFormUser{
    name? : string,
    email : string,
    password : string,
    password_confirmation? : string;
    remember?: boolean
} 