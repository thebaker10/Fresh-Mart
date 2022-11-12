<?php

declare(strict_types=1);

namespace App\Application\Actions\Order;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class OrderAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        

        $fakeOrderResponse = [
            [
                'orderId' => 1,
                'userId' => 1,
                'orderDate' => 1,
                'orderPrice' => 5,
            ]
        ];

        return $this->respondWithData($fakeOrderResponse);
    }
}