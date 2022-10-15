<?php

namespace App\Domain\Cart;

use App\Domain\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'cart')]
class Cart implements \JsonSerializable{

    #[Id, Column(name: 'cart_id', type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $cart_id;

    #[OneToOne(mappedBy: 'shopping_cart', targetEntity: User::class)]
    private User $user;

    #[OneToOne(inversedBy: 'cart', targetEntity: CartItem::class)]
    private ArrayCollection $cart_items;

    //#[Pure] #[ArrayShape(['userId' => "int", 'firstName' => "string", 'lastName' => "string", 'username' => "string", 'balance' => "string", 'shoppingCart' => 'array'])]
    public function jsonSerialize(): array{
        return [
        ];
    }
}