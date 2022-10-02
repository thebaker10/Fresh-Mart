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
                'order_id' => $order_id,
                'user_id' => 1,
                'orderDate' => '2022-09-30 20:15:00',
                'orderPrice' => 16.20,
                'lineItems' => [
                    [
                        'order_id' => $order_id,
                        'product_id' => 1,
                        'lineItemPrice' => 0.60,
                        'quantity' => 24
                    ],
                    [
                        'order_id' => $order_id,
                        'product_id' => 3,
                        'lineItemPrice' => 0.60,
                        'quantity' => 3
                    ]
                ]
            ]
        ];

        return $this->respondWithData($fakeOrderResponse);
    }
}
