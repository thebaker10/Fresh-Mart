<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\EmailNotFoundException;
use App\Domain\User\InvalidPasswordException;
use App\Domain\User\User;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;
use TypeError;

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
    protected function action(): Response
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

            /*
             * CF 2022-11-04 Guided by https://www.youtube.com/watch?v=l662In2_J1w&list=PLNuh5_K9dfQ2-8nxh-kBYL0_wDqhsN5tB&index=58
             */
            $_SESSION['user'] = [
                'id' => $user->getUserId(),
                'username' => $user->getUsername()
            ];

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
