<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Application\Actions\Action;
use App\Domain\Review\Review;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class ReviewPostAction extends Action
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
        $productId = $payload['productId'];
        $userId = $payload['userId'];
        $rating = $payload['rating'];
        $reviewTitle = $payload['reviewTitle'];
        $reviewContent = $payload['reviewContent'];
        $review = new Review($productId, $userId, $rating, $reviewTitle, $reviewContent);

        /*
         * CF 2022-10-13
         * Method for adding a new entity in the database:
         * Create a new instance of the entity's class
         * Call $this->>em->persist($instance) to tell Doctrine ORM that we will be saving this to the database
         * Call $this->>em->flush() to perform the insert/update
         */

        try {
            $this->em->persist($review);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'Error while creating new user.'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'User successfully added', 'user_id' => $review->getReviewId()], 201);
    }
}
