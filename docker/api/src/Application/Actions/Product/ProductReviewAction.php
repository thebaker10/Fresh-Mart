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
                'review_id' => 1,
                'product_id' => $product_id,
                'user_id' => 1,
                'user_name' => 'AUserName',
                'rating' => 3,
                'review' => 'I really liked this food item. I am very impressed by its taste and texture.',
                'date' => '2022-12-15 00:00:00'
            ],
            [
                'review_id' => 2,
                'product_id' => $product_id,
                'user_id' => 1,
                'user_name' => 'AUserName',
                'rating' => 1,
                'review' => 'I did not like it.  I think if was spoiled.',
                'date' => '2022-12-15 00:00:00'
            ],
            [
                'review_id' => 3,
                'product_id' => $product_id,
                'user_id' => 1,
                'user_name' => 'AUserName',
                'rating' => 5,
                'review' => 'This is great!',
                'date' => '2022-12-15 00:00:00'
            ]
        ];

        return $this->respondWithData($fakeProductResponse);
    }
}
