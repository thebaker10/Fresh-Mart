<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class UserViewAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $user_id = $this->resolveArg('user_id');

        $fakeUserResponse = [
            [
                'user_id' => $user_id,
                'firstName' => 'John',
                'lastName' => 'Doe',
                'balance' => 199.00,
                'shoppingCart' => [
                    'items' => []
                ]
            ]
        ];

        return $this->respondWithData($fakeUserResponse);
    }
}
