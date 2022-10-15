<?php

namespace App\Domain\Cart;

use App\Domain\Product\Product;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

#[Entity, Table(name: 'cart_item')]
class CartItem implements \JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $cart_item_id;

    #[ManyToOne(targetEntity: Cart::class, inversedBy: 'cart_items')]
    private Cart $cart;

    #[OneToOne(targetEntity: Product::class)]
    private Product $product;

    //#[Pure] #[ArrayShape(['userId' => "int", 'firstName' => "string", 'lastName' => "string", 'username' => "string", 'balance' => "string", 'shoppingCart' => 'array'])]
    public function jsonSerialize(): array{
        return [
        ];
    }
}