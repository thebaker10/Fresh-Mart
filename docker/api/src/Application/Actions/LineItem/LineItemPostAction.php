<?php

declare(strict_types=1);

namespace App\Application\Actions\LineItem;

use App\Application\Actions\Action;
use App\Domain\LineItem;
use App\Domain\LineItem\Line_Item\Line_Item;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class LineItemPostAction extends Action
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
        $orderId = $payload['orderId'];
        $productId = $payload['productId'];
        $lineItemPrice = $payload['lineItemPrice'];
        $quantity = $payload['quantity'];
        $lineItem = new Line_Item($orderId, $productId, $lineItemPrice, $quantity);
        $product = $this->em->getRepository(Product::class)->find($productId);
        $lineItem->setProduct($product);

        /*
         * CF 2022-10-13
         * Method for adding a new entity in the database:
         * Create a new instance of the entity's class
         * Call $this->>em->persist($instance) to tell Doctrine ORM that we will be saving this to the database
         * Call $this->>em->flush() to perform the insert/update
         */

        try {
            $this->em->persist($lineItem);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'Error while creating new lineItem.'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'LineItem successfully added', 'OrderId' => $lineItem->getOrderId()], 201);
    }
}