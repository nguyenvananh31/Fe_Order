export interface ICateReq {
    name?: string;
    description?: string;
    image?: File;
    status?: boolean;
}

export interface ICate {
    id: number;
    name: string;
    status: boolean;
    description: string | null;
    image: string | null;
    subcategory: ICate[] | [];
    created_at: Date;
    updated_at: Date;
    parent_id: number;
    level? : number;
    name_parent: string | null;
}