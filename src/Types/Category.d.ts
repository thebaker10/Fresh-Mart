export interface Category {
    statusCode: number;
    data:       Product[];
}

export interface Product {
    productId:           number;
    categoryId:          number;
    productName:         string;
    product_msrp:        number;
    product_price:       number;
    product_description: string;
}