<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class UserOrderViewAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $order_id = $this->resolveArg('order_id');

        $fakeOrderResponse = [
            [
                'orderID' => $order_id,
                'orderNum' => 'A1234',
                'userID' => 1,
                'orderDate' => '2022-09-30 20:15:00',
                'orderPrice' => 16.20,
                'itemQuantity' => 27,
                'lineItems' => [
                    [
                        'orderID' => $order_id,
                        'productID' => 1,
                        'lineItemPrice' => 0.60,
                        'quantity' => 24
                    ],
                    [
                        'orderID' => $order_id,
                        'productID' => 3,
                        'lineItemPrice' => 0.60,
                        'quantity' => 3
                    ]
                ],
                'firstName' => 'John',
                'lastName' => 'Doe',
                'address' => '123 1st Street',
                'city' => 'Anywhere',
                'state' => 'CA',
                'zip' => '90132'
            ]
        ];

        return $this->respondWithData($fakeOrderResponse);
    }
}
