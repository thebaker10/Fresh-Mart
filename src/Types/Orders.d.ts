export interface Orders {
    statusCode: number;
    data:       Order[];
}

export interface Order {
    orderID:      number;
    orderNum:     string;
    userID:       number;
    orderDate:    string;
    orderPrice:   number;
    itemQuantity: number;
    lineItems:    LineItem[];
    firstName:    string;
    lastName:     string;
    address:      string;
    city:         string;
    state:        string;
    zip:          string;
}

export interface LineItem {
    orderID:       number;
    productID:     number;
    lineItemPrice: number;
    quantity:      number;
}