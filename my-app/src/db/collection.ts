import { database } from "./mongodb";
const UserCollection = database.collection("users");
const ProductCollection = database.collection("products");
const Wishlistcollection = database.collection("wishlist");
export { UserCollection, ProductCollection, Wishlistcollection };
