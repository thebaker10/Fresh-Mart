<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Application\Actions\Action;
use App\Domain\Review\Review;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ProductReviewUserAction extends Action
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
        $slug = $this->resolveArg('productSlug');
        $reviews = $this->em->getRepository(Review::class)->findBy(array('product_id' => $slug));
        $usernames = [];
        foreach($reviews as $review){
            array_push($usernames, $review -> getUser() -> getFirstName() . ' ' . $review -> getUser() -> getLastName());
        }
        return $this->respondWithData($usernames);
    }
    
}
