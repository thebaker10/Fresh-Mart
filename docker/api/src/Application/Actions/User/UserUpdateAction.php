<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\DuplicateEmailException;
use App\Domain\User\InvalidEmailException;
use App\Domain\User\User;
use App\Domain\User\UserNotFoundException;
use Doctrine\ORM\EntityManager;
use Exception;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use TypeError;

class UserUpdateAction extends Action
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

        try {
            $userID = $this->resolveArg('user_id');
            $payload = $this->request->getParsedBody();
            $userRepository = $this->em->getRepository(User::class);
            /** @var User $user */
            $user = $userRepository->findOneBy(['user_id' => $userID]);

            if(!$user){
                throw new UserNotFoundException();
            }

            print_r($user);

            $firstName = $payload['firstName'] ?? '';
            $lastName = $payload['lastName'] ?? '';
            $address = $payload['address'] ?? '';
            $city = $payload['city'] ?? '';
            $state = $payload['state'] ?? '';
            $zip = $payload['zip'] ?? '';
            $country = $payload['country'] ?? '';
            $email = $payload['email'] ?? '';

            //Todo do pasword
           // $password = $payload['password'] ?? null;

            $user->setFirstName($firstName);
            $user->setLastName($lastName);
            $user->setAddress($address);
            $user->setUsername($email);
            $user->setCity($city);
            $user->setState($state);
            $user->setZip($zip);
            $user->setCountry($country);

            $this->em->flush();

        }catch(Exception $e){
            $this->logger->error($e->getMessage());
            return $this->respondWithData(['message' => $e->getMessage()], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');
        return $this->respondWithData(['message' => 'User updated', 'user_id' => $user->getUserId()]);
    }
}
