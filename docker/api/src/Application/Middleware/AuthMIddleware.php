<?php

namespace App\Application\Middleware;

use App\Domain\User\User;
use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use Doctrine\ORM\EntityManager;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Factory\AppFactory;

class AuthMiddleware
{
    /**
     * Example middleware invokable class
     *
     * @param ServerRequestInterface $request  PSR7 request
     * @param ResponseInterface $response PSR7 response
     * @param callable $next     Next middleware
     *
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, callable $next): ResponseInterface{

        if(!$this->validateCookie()){

            throw new HttpUnauthorizedException($request);
        }


        $user_id = $request->getAttribute('user_id');
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

        return $next($request, $response);
    }

    private function validateCookie(): bool{
        if(empty($_COOKIE) || empty($_COOKIE['freshMartHash'])){
            return false;
        }

        $userId = $_COOKIE['freshMartUserId'];
        $cookieSalt = $_ENV['COOKIE_SALT'] ?? '';
        $cookieHash = hash('sha256',$userId.$cookieSalt);
        return $_COOKIE['freshMartHash'] === $cookieHash;
    }
}