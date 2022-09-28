<?php

declare(strict_types=1);

namespace App\Application\Actions;

use Psr\Http\Message\ResponseInterface as Response;

class ProductAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $category = $this->resolveArg('category');
        $slug = $this->resolveArg('productSlug');

        $fakeProductResponse = [
            [
                'productId' => 5,
                'categoryId' => 1,
                'productName' => 'Yellow Pepper',
                'productMSRP' => 0.75,
                'productPrice' => 0.60,
                'productImageLink' => 'https://via.placeholder.com/500?text=Yellow Pepper',
                'reviewAverageScore' => 3.5,
                'slug' => "/$category/$slug"
            ]
        ];

        return $this->respondWithData($fakeProductResponse);
    }
}
