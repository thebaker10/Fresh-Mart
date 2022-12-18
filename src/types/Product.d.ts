export interface SearchProductType {
    product_id:       number;
    category_id:      number;
    product_name:     string;
    product_msrp:     number;
    product_price:    number;
    product_description: string;
    product_image_link: string;
    rating: number;
}

export interface Products {
    statusCode: number;
    data:       Product;
}

export interface Product {
    productId:           number;
    categoryId:          number;
    productName:         string;
    product_msrp:        number;
    product_price:       number;
    product_description: string;
}

