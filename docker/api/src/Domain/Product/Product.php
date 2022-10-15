<?php

namespace App\Domain\Product;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'product')]
class Product implements \JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $product_id;

    //@todo replace this with a relationship
    #[Column(type: 'integer', unique: true, nullable: false)]
    private int $category_id;

    #[Column(type: 'string', unique: false, nullable: false)]
    private int $product_name;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $product_msrp;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $product_price;


    //#[Pure] #[ArrayShape(['userId' => "int", 'firstName' => "string", 'lastName' => "string", 'username' => "string", 'balance' => "string", 'shoppingCart' => 'array'])]
    public function jsonSerialize(): array{
        return [
        ];
    }
}