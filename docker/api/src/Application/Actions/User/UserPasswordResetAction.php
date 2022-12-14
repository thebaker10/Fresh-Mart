<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\PasswordMismatchException;
use App\Domain\User\User;
use App\Domain\User\UserResetTokenException;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use PharIo\Manifest\InvalidEmailException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;

class UserPasswordResetAction extends Action
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

            /** @var User $user */
            $payload = $this->request->getParsedBody();
            $password = $payload['password'] ?? null;
            $confirmPassword = $payload['confirm_password'] ?? null;

            if($password !== $confirmPassword){
                throw new PasswordMismatchException();
            }


            $resetToken = $payload['reset_token'] ?? null;
            $userRepository = $this->em->getRepository(User::class);
            $user = $userRepository->findOneBy(['password_reset_token' => $resetToken]);

            if(!$user){
                throw new UserResetTokenException();
            }

            $user->setPasswordResetToken('');
            $user->setPasswordHash($password);
            $this->em->flush();

            $user->setSessionCookie();

            return $this->respondWithData(['message' => 'User successfully logged in', 'user_id' => $user->getUserId()], 201);

        } catch(InvalidEmailException | ORMException | PasswordMismatchException | UserResetTokenException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        }
    }
}
