<?php

declare(strict_types=1);

namespace App\Application\Actions\Favorite;

use App\Application\Actions\Action;
use App\Domain\Favorite\Favorite;
use App\Domain\Favorite\FavoriteItem;
use App\Domain\Product\Product;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\Factory\AppFactory;
use Slim\Logger;
use Slim\Psr7\Response;

class FavoritePostAction extends Action
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

        $payload = $this->request->getParsedBody();
        $userId = $payload['userId'];
        $productId = $payload['productId'];
        $favorite = $this->em->getRepository(Favorite::class)->findBy(array('user_id' => $userId))[0];

        $favoriteItem = new FavoriteItem($productId, $favorite->getFavoriteId());

        $product = $this->em->getRepository(Product::class)->find($productId);
        $favoriteItem->setProduct($product);



        $favoriteItem -> setFavorite($favorite);

        try {
            $this->em->persist($favoriteItem);
            $this->em->flush();
        } catch (OptimisticLockException | ORMException | TransactionRequiredException $e) {
            $this->logger->error($e->getMessage());
            return $this->respondWithData([$e->getMessage() => 'Error while adding to favorites.'], 500);
        }

        $this->response->withHeader('Access-Control-Allow-Origin', '*');

        return $this->respondWithData(['message' => 'Item successfully added to favorites', 'favorite_item_id' => $favoriteItem->getFavoriteItemId()], 201);
    }
}