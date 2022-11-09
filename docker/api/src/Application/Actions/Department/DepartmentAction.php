<?php

declare(strict_types=1);

namespace App\Application\Action\Category;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

class DepartmentAction extends Action
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // $users = $this->userRepository->findAll();

        // $this->logger->info("Users list was viewed.");

        $departmentId = $this->resolveArg('department_id');
        $fakeDepartmentResponse = [
                'departmentId' => $departmentId,
                'categoryName' => 'Produce'
        ];

        return $this->respondWithData($fakeDepartmentResponse);
    }
}
