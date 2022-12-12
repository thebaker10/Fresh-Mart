<?php

declare(strict_types=1);

namespace App\Application\Actions\Order;

use App\Application\Actions\Action;
use App\Domain\Order\Order;
use App\Domain\User\User;
use DateTime;
use App\Domain\LineItem\LineItem;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Doctrine\ORM\PersistentCollection;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class OrderPostAction extends Action
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
        $orderDate = new DateTime();

        $user = $this->em->getRepository(User::class)->find($userId);
        $cart = $user-> getCart();
        $cartItems = $cart-> getCartItems();
        $orderPrice = 0;
        
        // Returns error message if cart is empty
        if(count($cartItems) == 0){
            return $this->respondWithData(['message' => "Cart is empty."], 500);
        }

        // Calculates total order price by summing each cartItem multiplied by its quantity
        foreach($cartItems as $item){
            $orderPrice += $item -> getProduct() -> getProductPrice() * $item -> getQuantity();
        }
        // If the total order price is greater than the user's balance, return error message
        if($orderPrice > $user->getUserBalance()){
            return $this->respondWithData(['message' => 'Not enough credit in user balance.'], 500);
        }
        
        // Creates new order 
        $order = new Order($userId, $orderDate, $orderPrice);
        $order->setUser($user);

        /*
         * CF 2022-10-13
         * Method for adding a new entity in the database:
         * Create a new instance of the entity's class
         * Call $this->>em->persist($instance) to tell Doctrine ORM that we will be saving this to the database
         * Call $this->>em->flush() to perform the insert/update
         */

        try {
            $this->em->persist($order);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'Error while creating new order.'], 500);
        }
        
        // For each cart item, creates line item
        foreach($cartItems as $item){
             $lineItem = new LineItem($order->getOrderId(), $item->getProductId(), $item->getProduct()->getProductPrice(), $item->getQuantity());
             $lineItem->setOrder($order);
             $lineItem->setProduct($item->getProduct());
             try {
                $this->em->persist($lineItem);
            } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
                $this->logger->error($e->getMessage());
                return $this->respondWithData(['message' => 'Error while creating line items. '], 500);
            }
        }

        // Sets the new user's balance (previous subtracted by order price)
        $user ->setUserBalance(number_format($user->getUserBalance() - $orderPrice, 2));

        // Removes all the cart items in the user's cart
        foreach($cartItems as $item){
            $this->em->remove($item);
        }  

        try {
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData([$e->getMessage() => 'Error while updating cart'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'Order successfully added', 'OrderId' => $order->getOrderId()], 201);
    }
}