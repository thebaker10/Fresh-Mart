<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Application\Actions\Action;
use App\Domain\Product\Product;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CategoryListProductsAction extends Action
{
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
        $slug = $this->resolveArg('categorySlug');
        $products = $this->em->getRepository(Product::class)->findBy(array('category_id' => $slug));
        return $this->respondWithData($products);
    }
    
}
