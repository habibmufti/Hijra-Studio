export interface Message {
  message: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface FindUser {
  name: string;
  username: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
