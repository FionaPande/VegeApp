import { ThemeColors } from "react-navigation";
import FavoritesScreen from "../screens/FavoritesScreen";
import Category from "./category";

class Product {
    constructor(id, categoryId, title, brand, category, description, photo, stores){
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.photo = photo;
        this.stores = stores;
    }
}


export default Product;