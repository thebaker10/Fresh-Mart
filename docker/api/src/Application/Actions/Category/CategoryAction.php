<?php

declare(strict_types=1);

namespace App\Application\Action\Category;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class CategoryAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $categoryId = $this->resolveArg('category_id');
        $fakeCategoryResponse = [
                'categoryId' => $categoryId,
                'categoryName' => 'Vegetables'
        ];

        return $this->respondWithData($fakeCategoryResponse);
    }
}
