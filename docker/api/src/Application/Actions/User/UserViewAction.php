<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;
use Slim\Factory\AppFactory;
use Slim\Handlers\Strategies\RequestHandler;
use Slim\Logger;
use Slim\Psr7\Factory\StreamFactory;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use User;

class UserViewAction extends Action
{

    private EntityManager $em;

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
        $user_id = $this->resolveArg('user_id');

        $em = $this->em;
        try {
            $user = $em->find(User::class, $user_id);
            //print_r($user);
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            return $this->respondWithData(null, 404);
        }

        $fakeUserResponse = [
            [
                'userID' => $user_id,
                'firstName' => 'John',
                'lastName' => 'Doe',
                'balance' => 199.00,
                'shoppingCart' => [
                    'items' => []
                ]
            ]
        ];

        return $this->respondWithData($fakeUserResponse);
    }
}
