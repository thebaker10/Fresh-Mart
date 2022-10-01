<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class ProductReviewAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $product_id = $this->resolveArg('product_id');

        $fakeProductResponse = [
            [
                'reviewId' => 1,
                'productId' => $product_id,
                'userId' => 1,
                'rating' => 3,
                'reviewContent' => 'I really liked this food item. I am very impressed by its taste and texture.'
            ],
            [
                'reviewId' => 2,
                'productId' => $product_id,
                'userId' => 1,
                'rating' => 1,
                'reviewContent' => 'I did not like it.  I think if was spoiled.'
            ],
            [
                'reviewId' => 3,
                'productId' => $product_id,
                'userId' => 1,
                'rating' => 5,
                'reviewContent' => 'This is great!'
            ]
        ];

        return $this->respondWithData($fakeProductResponse);
    }
}
