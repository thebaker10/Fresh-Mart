export interface Orders {
    statusCode: number;
    data:       Order[];
}

export interface Order {
    orderId:    string;
    userId:     number;
    orderDate:  OrderDate;
    orderPrice: number;
    lineItems:  LineItem[];
}

export interface LineItem {
    lineItemId:    number;
    orderId:       number;
    product:       Product;
    lineItemPrice: number;
    quantity:      number;
}

export interface Product {
    productId:           number;
    categoryId:          number;
    productName:         string;
    product_msrp:        number;
    product_price:       number;
    product_description: string;
}

export interface OrderDate {
    date:          string;
    timezone_type: number;
    timezone:      string;
}
