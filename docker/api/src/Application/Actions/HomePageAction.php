<?php

declare(strict_types=1);

namespace App\Application\Actions;

use Psr\Http\Message\ResponseInterface as Response;

class HomePageAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
       // $users = $this->userRepository->findAll();

       // $this->logger->info("Users list was viewed.");

        $fakeHomepageResponse = [
            'featuredProducts' => [
                [
                    'productId' => 1,
                    'categoryId' => 1,
                    'productName' => 'Apple',
                    'productMSRP' => 0.75,
                    'productPrice' => 0.60,
                    'productImageLink' => 'https://via.placeholder.com/500?text=Apple',
                    'slug' => '/produce/apple',
                    'reviewAverageScore' => 3.5
                ],
                [
                    'productId' => 2,
                    'categoryId' => 1,
                    'productName' => 'Orange',
                    'productMSRP' => 0.75,
                    'productPrice' => 0.60,
                    'productImageLink' => 'https://via.placeholder.com/500?text=Orange',
                    'slug' => '/produce/orange',
                    'reviewAverageScore' => 3.5
                ],
                [
                    'productId' => 3,
                    'categoryId' => 1,
                    'productName' => 'Onion',
                    'productMSRP' => 0.75,
                    'productPrice' => 0.60,
                    'productImageLink' => 'https://via.placeholder.com/500?text=Onion',
                    'slug' => '/produce/onion',
                    'reviewAverageScore' => 3.5
                ],
                [
                    'productId' => 4,
                    'categoryId' => 1,
                    'productName' => 'Green Pepper',
                    'productMSRP' => 0.75,
                    'productPrice' => 0.60,
                    'productImageLink' => 'https://via.placeholder.com/500?text=Green Pepper',
                    'slug' => '/produce/green-pepper',
                    'reviewAverageScore' => 3.5
                ],
                [
                    'productId' => 5,
                    'categoryId' => 1,
                    'productName' => 'Yellow Pepper',
                    'productMSRP' => 0.75,
                    'productPrice' => 0.60,
                    'productImageLink' => 'https://via.placeholder.com/500?text=Yellow Pepper',
                    'slug' => '/produce/yellow-pepper',
                    'reviewAverageScore' => 3.5
                ]
            ],
            'userProfile' => [
                'firstName' => 'John',
                'lastName' => 'Doe',
                'balance' => 199.00,
                'shoppingCart' => [
                    'items' => [
                        [
                            'productId' => 5,
                            'categoryId' => 1,
                            'productName' => 'Yellow Pepper',
                            'productMSRP' => 0.75,
                            'productPrice' => 0.60,
                            'productImageLink' => 'https://via.placeholder.com/500?text=Yellow Pepper',
                            'reviewAverageScore' => 3.5,
                            'slug' => '/produce/yellow-pepper'
                        ]
                    ]
                ]
            ]
        ];

        return $this->respondWithData($fakeHomepageResponse);
    }
}
