export interface Orders {
    statusCode: number;
    data:       Order[];
}

export interface Order {
    orderId:    number;
    userId:     number;
    orderDate:  OrderDate;
    orderPrice: number;
}

export interface OrderDate {
    date:          string;
    timezone_type: number;
    timezone:      string;
}
