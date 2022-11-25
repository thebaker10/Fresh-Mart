<?php

declare(strict_types=1);

namespace App\Application\Actions\Favorite;

use App\Application\Actions\Action;
use App\Domain\Favorite\Favorite;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class FavoriteListAction extends Action
{
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
        $slug = $this->resolveArg('favoriteSlug');
        $favorite = $this->em->getRepository(Favorite::class)->findBy(array('user_id' => $slug));
        return $this->respondWithData($favorite);
    }

}