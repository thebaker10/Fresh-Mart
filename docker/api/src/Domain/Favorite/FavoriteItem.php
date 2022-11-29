<?php /** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Favorite;

use App\Domain\Product\Product;
use App\Domain\Favorite\Favorite;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'favorite_item')]
class FavoriteItem implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $favorite_item_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $product_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $favorite_id;


    #[ManyToOne(targetEntity: Favorite::class, inversedBy: 'favorite_items')]
    #[JoinColumn(name: 'favorite_id', referencedColumnName: 'favorite_id')]
    private Favorite $favorite;

    #[ManyToOne(targetEntity: Product::class,inversedBy: 'favorite_items')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private Product $product;

    public function __construct(int $product_id, int $favorite_id){
        $this->setProductId($product_id);
        $this->setFavoriteId($favorite_id);
    }

    public function setProduct(Product $product){
        $this->product = $product;
    }

    public function setFavorite(Favorite $favorite){
        $this->favorite = $favorite;
    }

    public function setProductId(int $product_id): void
    {
        $this->product_id = $product_id;
    }

    public function setFavoriteId(int $favorite_id): void
    {
        $this->favorite_id = $favorite_id;
    }

    public function getFavoriteItemId(): int
    {
        return $this->favorite_item_id;
    }

    #[ArrayShape(['favoriteItemId' => "int", 'product' => "\App\Domain\Product\Product"])]
    public function jsonSerialize(): array{
        return [
            'favoriteItemId' => $this->favorite_item_id,
            'product' => $this->product
        ];
    }
}