<?php

declare(strict_types=1);

namespace App\Application\Actions\LineItem;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class LineItemAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {


        $fakeOrderResponse = [
            [
                'orderId' => 1,
                'productId' => 1,
                'lineItemPrice' => 1,
                'quantity' => 5,
            ]
        ];

        return $this->respondWithData($fakeOrderResponse);
    }
}