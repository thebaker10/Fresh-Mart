<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Favorite;

use App\Domain\User\User;
use App\Domain\Favorite\FavoriteItem;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

#[Entity, Table(name: 'favorite')]
class Favorite implements \JsonSerializable{

    #[Id, Column(name: 'favorite_id', type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $favorite_id;

    #[Column(type: 'integer',unique: true, nullable: false)]
    private int $user_id;

    #[OneToOne(inversedBy: 'favorites', targetEntity: User::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private User $user;

    #[OneToMany(mappedBy: 'favorite', targetEntity: FavoriteItem::class)]
    #[JoinColumn(name: 'favorite_id', referencedColumnName: 'favorite_id')]
    private PersistentCollection $favorite_items;

    public function __construct(int $favorite_id, int $user_id){
        $this->setFavoriteId($favorite_id);
        $this->setUserId($user_id);
    }

    /**
     * @param int $favorite_id
     */
    public function setFavoriteId(int $favorite_id): void
    {
        $this->favorite_id = $favorite_id;
    }

    public function getFavoriteId(): int
    {
        return $this->favorite_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    #[ArrayShape(['favoriteId' => "int", 'userId' => "int", 'favoriteItems' => "\Doctrine\Common\Collections\ArrayCollection"])]
    public function jsonSerialize(): array{
        return [
            'favoriteId' => $this->favorite_id,
            'userId' => $this->user->getUserId(),
            'favoriteItems' => $this->favorite_items->getValues()
        ];
    }
}