<?php

declare(strict_types=1);

namespace App\Application\Actions\Cart;

use App\Application\Actions\Action;
use App\Domain\Cart\CartItem;
use App\Domain\Cart\Cart;
use App\Domain\Product\Product;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class CartRemoveItemAction extends Action
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
        $userId = $payload['userId'];
        $productId = $payload['productId'];
        
        $cart = $this->em->getRepository(Cart::class)->findBy(array('user_id' => $userId))[0];
        $cartItems = $cart -> getCartItems();
        foreach($cartItems as $item){
            if($item -> getProductId() == $productId){
                $this->em->remove($item);
            }
        }  
        
        try {
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData([$e->getMessage() => 'Error while removing item from cart.'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'Product successfully removed from cart'], 201);
    }
}
