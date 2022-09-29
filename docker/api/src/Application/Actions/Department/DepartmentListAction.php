<?php

declare(strict_types=1);

namespace App\Application\Action\Category;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class DepartmentListAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $fakeDepartmentResponse = [
            [
                'departmentId' => 1,
                'categoryName' => 'Produce'
            ],
            [
                'departmentId' => 2,
                'departmentName' => 'Bakery'
            ]
        ];

        return $this->respondWithData($fakeDepartmentResponse);
    }
}
