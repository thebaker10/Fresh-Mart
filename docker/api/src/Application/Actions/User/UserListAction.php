<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class UserListAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {




        $fakeUsersResponse = [

            [
                'user_id' => 1,
                'firstName' => 'John',
                'lastName' => 'Doe',
                'balance' => 199.00,
                'shoppingCart' => [
                    'items' => []
                ]
            ],
            [
                'user_id' => 2,
                'firstName' => 'Jane',
                'lastName' => 'Doe',
                'balance' => 250.00,
                'shoppingCart' => [
                    'items' => []
                ]
            ]
        ];

        return $this->respondWithData($fakeUsersResponse);
    }
}
