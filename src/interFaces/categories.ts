export interface ICateReq {
    name: string;
    description?: string;
    image?: File;
}

export interface Icate {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    created_at: Date;
    updated_at: Date;
}