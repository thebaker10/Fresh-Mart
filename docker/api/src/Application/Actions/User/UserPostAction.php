<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\DuplicateEmailException;
use App\Domain\User\User;
use App\Domain\Cart\Cart;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use PharIo\Manifest\InvalidEmailException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;
use TypeError;

class UserPostAction extends Action
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

        try {
            $payload = $this->request->getParsedBody();
            $email = $payload['email'] ?? null;
            $userRepository = $this->em->getRepository(User::class);

            //Make sure the email matches a valid email address
            if(!preg_match('/(^\w.*?@\w.*?\.\w*$)/', $email)){
                throw new InvalidEmailException();
            }

            if($userRepository->findOneBy(['username' => $email])){
                throw new DuplicateEmailException();
            }

            $firstName = $payload['firstName'] ?? null;
            $lastName = $payload['lastName'] ?? null;
            $password = $payload['password'] ?? null;
            $balance = (float) 50;
            $user = new User($firstName, $lastName, $email, $password, $balance, 1);

            //Address
            if(!empty($payload['address'])){
                $user->setAddress($payload['address']);
            }

            //City
            if(!empty($payload['city'])){
                $user->setCity($payload['city']);
            }

            //State
            if(!empty($payload['state'])){
                $user->setState($payload['state']);
            }

            //Zip
            if(!empty($payload['zip'])){
                $user->setZip($payload['zip']);
            }

            //Country
            if(!empty($payload['country'])){
                $user->setCountry($payload['country']);
            }
        }catch(TypeError $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'The user could not be created because a value is missing.'], 500);
        }catch(DuplicateEmailException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'There already exists a user with this email address.'], 500);
        }catch(InvalidEmailException $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'A valid email address was not provided.'], 500);
        }

        /*
         * CF 2022-10-13
         * Method for adding a new entity in the database:
         * Create a new instance of the entity's class
         * Call $this->>em->persist($instance) to tell Doctrine ORM that we will be saving this to the database
         * Call $this->>em->flush() to perform the insert/update
         */

        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'Error while creating new user.'], 500);
        }

        $user -> setSessionCookie();

        $userId = $user-> getUserId();
        $cart = new Cart($userId);
        $cart -> setUser($user);
        try {
            $this->em->persist($cart);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => 'Error while creating new cart.'], 500);
        }

        

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'User successfully added', 'user_id' => $user->getUserId()], 201);
    }
}
