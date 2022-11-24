<?php

declare(strict_types=1);

namespace App\Application\Actions\Cart;

use App\Application\Actions\Action;
use App\Domain\Cart\Cart;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CartListAction extends Action
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
        $slug = $this->resolveArg('cartSlug');
        $cart = $this->em->getRepository(Cart::class)->findBy(array('user_id' => $slug));
        return $this->respondWithData($cart);
    }
    
}
