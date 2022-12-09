<?php

namespace App\Application\Middleware;

use App\Domain\User\User;
use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use Doctrine\ORM\EntityManager;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Factory\AppFactory;
use Slim\MiddlewareDispatcher;

class AuthMiddleware
{
    /**
     * Example middleware invokable class
     *
     * @param ServerRequestInterface $request PSR7 request
     * @param RequestHandlerInterface $requestHandler
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $requestHandler): ResponseInterface{

        $user_id = $request->getAttribute('user_id');

        if(empty($user_id)){
            return $requestHandler->handle($request);
        }

        if(!$this->validateCookie()){

            throw new HttpUnauthorizedException($request);
        }


        if($user_id !== $_COOKIE['freshMartUserId'] && $request->getMethod() !== 'GET'){
            $container = new Container();
            AppFactory::setContainer($container);
            try {
                $em = $container->get(EntityManager::class);
            } catch (DependencyException | NotFoundException $e) {
                throw new HttpUnauthorizedException($request);
            }

            $userRepo = $em->getRepository(User::class);
            $user =  $userRepo->findOneBy(['user_id' => $_COOKIE['freshMartUserId']]);

            if(!$user->isAdmin()){
                throw new HttpUnauthorizedException($request);
            }
        }

        return $requestHandler->handle($request);
    }

    private function validateCookie(): bool{
        if(empty($_COOKIE)){
            return false;
        }

        $userId = $_COOKIE['freshMartUserId'];
        $cookieSalt = $_ENV['COOKIE_SALT'] ?? '';
        $cookieHash = hash('sha256',$userId.$cookieSalt);
        $freshMartHash = $_COOKIE['freshMartHash'] ?? '';
        return $freshMartHash === $cookieHash;
    }
}