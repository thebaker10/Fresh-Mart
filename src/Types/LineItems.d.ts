export interface LineItems {
    statusCode: number;
    data:       LineItemOrder[];
}

export interface LineItemOrder {
    orderID:      string;
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
    orderID:       string;
    productID:     number;
    lineItemPrice: number;
    quantity:      number;
}
