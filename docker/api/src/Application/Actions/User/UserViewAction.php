<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\User;
use App\Domain\User\UserAccessDeniedException;
use App\Domain\User\UserNotFoundException;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use JetBrains\PhpStorm\Pure;
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
    protected function action(): \Psr\Http\Message\ResponseInterface
    {

        if(isset($this->args['user_id'])) {
            $user_id = (int)$this->resolveArg('user_id');
        }else{
            $user_id = (int) $_COOKIE['freshMartUserId'];
        }

        try {

            $userRepository = $this->em->getRepository(User::class);
            /** @var User $user */
            $user = $userRepository->find($user_id);

            if($user === null){
                throw new UserNotFoundException();
            }elseif(!$this->canAccessUser($user)){
               throw new UserAccessDeniedException();
            }
        } catch (UserAccessDeniedException $e){
            return $this->respondWithData($e->getMessage(), 401);
        } catch (UserNotFoundException $e){
            return $this->respondWithData($e->getMessage(), 404);
        }

        return $this->respondWithData($user);
    }

    #[Pure]
    private function canAccessUser(User $user): bool{

        //@TODO Add Role check here
        $isAdmin = false;
        $user_id = $_COOKIE['freshMartUserId'] ?? null;

        return $isAdmin || $user_id == $user->getUserId();
    }
}
