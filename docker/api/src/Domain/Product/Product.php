<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Product;

use App\Domain\Category\Category;
use App\Domain\Cart\CartItem;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'product')]
class Product implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $product_id;

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

    #[ManyToOne(mappedBy: 'product', targetEntity: Category::class)]
    #[JoinColumn(name: 'category_id', referencedColumnName: 'category_id')]
    private Category $category;


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