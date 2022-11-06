<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class ReviewAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $slug = $this->resolveArg('reviewSlug');

        $fakeReviewResponse = [
            [
                'review_id' => 1,
                'product_id' => 1,
                'user_id' => 1,
                'rating' => 5,
                'review_title' => "This product is great!",
                'review_content' => "This food is delicious. I eat it everyday!",
                'slug' => $slug
            ]
        ];

        return $this->respondWithData($fakeReviewResponse);
    }
}
