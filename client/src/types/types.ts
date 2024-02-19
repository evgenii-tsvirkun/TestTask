export type Product = {
  id?: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
};
export type productsType = Array<Product> | [];

export interface IUser {
  id?: number;
  login?: string;
  email?: string;
  password?: string;
}

export interface ICart {
  id?: number;
  userId?: number;
  itemId?: number;
  countItem?: number;
}

export interface IItemProps {
  product: Product;
}

export interface ICartProps {
  cart: Product;
}

export interface IProductsState {
  products: Product[];
  cart: Product[];

}
