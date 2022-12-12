export interface Cart {
    statusCode: number;
    data:       CartData[];
}

export interface CartData {
    userId:       number;
    firstName:    string;
    lastName:     string;
    email:        string;
    balance:      string;
    shoppingCart: ShoppingCart;
    favorites:    Favorites;
    address:      null;
    city:         null;
    state:        null;
    zip:          null;
    country:      null;
}

export interface Favorites {
    favoriteId:    number;
    userId:        number;
    favoriteItems: any[];
}

export interface ShoppingCart {
    cartId:    number;
    userId:    number;
    cartItems: CartItem[];
}

export interface CartItem {
    cartItemId: number;
    product:    Product;
    quantity:   number;
}

export interface Product {
    productId:           number;
    categoryId:          number;
    productName:         string;
    product_msrp:        number;
    product_price:       number;
    product_description: string;
}
