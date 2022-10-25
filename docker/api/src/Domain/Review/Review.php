<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Review;

use App\Domain\Product\Product;
use App\Domain\User\User;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'review')]
class Review implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $review_id;

    //@TODO replace this with a relationship
    #[Column(type: 'integer', unique: true, nullable: false)]
    private int $category_id;

    #[Column(type: 'string', unique: false, nullable: false)]
    private string $product_name;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $product_msrp;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $product_price;

    #[OneToMany(mappedBy: 'product', targetEntity: CartItem::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private PersistentCollection $cart_items;



    #[ArrayShape(['productId' => "int", 'categoryId' => "int", 'productName' => "string", 'product_msrp' => "float", 'product_price' => "float"])] public function jsonSerialize(): array{
        return [
            'productId' => $this->product_id,
            'categoryId' => $this->category_id,
            'productName' => $this->product_name,
            'product_msrp' => $this->product_msrp,
            'product_price' => $this->product_price
        ];
    }
}