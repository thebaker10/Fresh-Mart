<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use Psr\Http\Message\ResponseInterface as Response;

class UserOrderListAction extends UserAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $user_id = $this->resolveArg('user_id');

        $fakeOrderResponse = [
            [
                'user_id' => $user_id,
                'categoryId' => 1,
                'productName' => 'Yellow Pepper',
                'productMSRP' => 0.75,
                'productPrice' => 0.60,
                'productImageLink' => 'https://via.placeholder.com/500?text=Yellow Pepper',
                'reviewAverageScore' => 3.5
            ]
        ];

        return $this->respondWithData($fakeOrderResponse);
    }
}
