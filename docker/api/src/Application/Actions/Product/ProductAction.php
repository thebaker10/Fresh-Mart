<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Application\Actions\Action;
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

        $slug = $this->resolveArg('productSlug');

        $fakeProductResponse = [
            [
                'product_id' => 5,
                'category_id' => 1,
                'name' => 'Yellow Pepper',
                'msrp' => 0.75,
                'price' => 0.60,
                'image_link' => 'https://via.placeholder.com/500?text=Yellow Pepper',
                'stars' => 3.5,
                'slug' => $slug
            ]
        ];

        return $this->respondWithData($fakeProductResponse);
    }
}
