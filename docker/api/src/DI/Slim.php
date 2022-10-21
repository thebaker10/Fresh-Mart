<?php

/**
 * Retrieved from https://github.com/1ma/Slim-Doctrine-Demo/
 * 2022-10-10 CF
 */

declare(strict_types=1);

namespace UMA\DoctrineDemo\DI;

use App\Application\Actions\Action;
use Doctrine\ORM\EntityManager;
//use Faker;
use Psr\Container\ContainerInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Middleware\ContentLengthMiddleware;
use UMA\DIC\Container;
use UMA\DIC\ServiceProvider;
use App\Application\Actions\User\UserListAction;
use App\Application\Actions\User\UserViewAction;
/**
 * A ServiceProvider for registering services related
 * to Slim such as request handlers, routing and the
 * App service itself that wires everything together.
 */
final class Slim implements ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function provide(Container $c): void
    {
        $c->set(UserListAction::class, static function(ContainerInterface $c): Action {
            return new UserListAction(
                $c->get(EntityManager::class)
            );
        });

        $c->set(UserViewAction::class, static function(ContainerInterface $c): Action {
            return new UserViewAction(
                $c->get(EntityManager::class),
                //Faker\Factory::create()
            );
        });

        $c->set(App::class, static function (ContainerInterface $c): App {
            /** @var array $settings */
            $settings = $c->get('settings');

            $app = AppFactory::create(null, $c);

            $app->addErrorMiddleware(
                $settings['slim']['displayErrorDetails'],
                $settings['slim']['logErrors'],
                $settings['slim']['logErrorDetails']
            );

            $app->add(new ContentLengthMiddleware());

            $app->get('/users', ListUsers::class);
            $app->post('/users', CreateUser::class);

            return $app;
        });
    }
}