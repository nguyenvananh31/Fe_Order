export interface Iuser{
    id : number | string;
    name : string | null;
    email: string;
    created_at: Date;
    updated_at: Date;
}
export interface IFormUser{
    name? : string,
    email : string,
    password : string,
    password_confirmation? : string;
    remember?: boolean
} 