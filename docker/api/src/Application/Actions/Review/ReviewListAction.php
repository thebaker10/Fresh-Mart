<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class ReviewListAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $fakeReviewResponse = [
            [
                'reviewId' => 1,
                'productId' => 1,
                'userId ' => 1,
                'rating' => 5,
                'reviewTitle' => "Test",
                'reviewContent' => "Test"
            ],
            [
                'reviewId' => 2,
                'productId' => 2,
                'userId ' => 1,
                'rating' => 3,
                'reviewTitle' => "Test2",
                'reviewContent' => "Test2"
            ]
        ];

        return $this->respondWithData($fakeReviewResponse);
    }
}
