<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Application\Actions\Action;
use App\Domain\Category\Category;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class CategoryPostAction extends Action
{

    private EntityManager $em;

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
        $app = AppFactory::create();
        $c = $app->getContainer();
        $logger = $c->get(Logger::class);
        parent::__construct($logger);
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {

        $payload = $this->request->getParsedBody();
        $categoryName = $payload['categoryName'];
        $category = new Category($categoryName);


        try {
            $this->em->persist($category);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData([$e->getMessage() => 'Error while creating new category.'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'Category successfully added', 'cateogry_id' => $category->getCategoryId()], 201);
    }
}
