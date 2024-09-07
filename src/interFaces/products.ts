interface IproductDetail {
    id:number,
    size:number[],
    price:number,
    quantity:number,
    sale:boolean,
    status:boolean,
  }
export interface Iproducts{
    id: number,
    name: string,
    image: string[],
    status: boolean,
    sub_categories_ID:number,
    productDetail:IproductDetail
}