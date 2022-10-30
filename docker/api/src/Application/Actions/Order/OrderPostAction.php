<?php

declare(strict_types=1);

namespace App\Application\Actions\Order;

use App\Application\Actions\Action;
use App\Domain\Order;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
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
        $orderDate = $payload['orderDate'];
        $orderPrice = $payload['orderPrice'];
        $order = new User_order($userId, $orderDate, $orderPrice);

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

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'Order successfully added', 'OrderId' => $order->getOrderId()], 201);
    }
}