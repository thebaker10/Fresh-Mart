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
    orderId:       number;
    productId:     number;
    lineItemPrice: number;
    quantity:      number;
}

export interface OrderDate {
    date:          string;
    timezone_type: number;
    timezone:      string;
}
