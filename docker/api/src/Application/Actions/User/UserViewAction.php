<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
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

class UserViewAction extends Action
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
        $user_id = (int) $this->resolveArg('user_id');

        try {
            /*
             * CF 2022-10-13
             * To retrieve an entity:
             *  Call $this->em->getRepository(Entity::class) to tell Doctrine ORM the type of entity we are searching fo
             *  Call $repository->find($primaryKey) to get the database record
             */

            $userRepository = $this->em->getRepository(User::class);
            $user = $userRepository->find($user_id);
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->alert($e->getMessage());
            return $this->respondWithData(null, 500);
        }
        return $this->respondWithData($user);
    }
}
