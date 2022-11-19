<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\DuplicateEmailException;
use App\Domain\User\EmailNotFoundException;
use App\Domain\User\InvalidPasswordException;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use PharIo\Manifest\InvalidEmailException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;
use TypeError;

class UserLoginAction extends Action
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
    protected function action(): ResponseInterface
    {

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        try {
            $payload = $this->request->getParsedBody();
            $email = $payload['email'] ?? null;
            $password = $payload['password'] ?? null;
            $userRepository = $this->em->getRepository(User::class);

            //Make sure the email matches a valid email address
            if(!preg_match('/(^\w.*?@\w.*?\.\w*$)/', $email)){
                throw new InvalidEmailException();
            }

            /** @var User $user */
            $user = $userRepository->findOneBy(['username' => $email]);

            if(!$user){
                throw new EmailNotFoundException();
            }

            if(!$user->verifyPassword($password)){
                throw new InvalidPasswordException();
            }

            $user->setSessionCookie();
            return $this->respondWithData(['message' => 'User successfully logged in', 'user_id' => $user->getUserId()], 201);

        }catch(EmailNotFoundException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 404);
        }catch(InvalidEmailException | InvalidPasswordException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        }
    }
}
