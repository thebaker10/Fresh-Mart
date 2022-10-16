<?php

declare(strict_types=1);

namespace App\Application\Action\Category;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class CategoryListAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $fakeCategoryResponse = [
            [
                'categoryId' => 1,
                'departmentId' => 1,
                'categoryName' => 'Vegetables'
            ],
            [
                'categoryId' => 2,
                'departmentId' => 1,
                'categoryName' => 'Fruits'
            ],
            [
                'categoryId' => 1,
                'departmentId' => 1,
                'categoryName' => 'Vegetables'
            ]
        ];

        return $this->respondWithData($fakeCategoryResponse);
    }
}
