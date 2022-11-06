<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\LineItem;

use App\Domain\Product\Product;
use App\Domain\User\User;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'lineItem')]
class Line_Item implements JsonSerializable{

    #[Id, Column(type: 'integer', unique: false, nullable: false) ]
    private int $order_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $product_id;

    #[Column(type: 'float', unique: false, nullable: false)]
    private int $lineItemPrice;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private string $quantity;

    #[ManyToOne(targetEntity: Product::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private Product $product;

    // #[ManyToOne(targetEntity: Order::class)]
    public function setProduct(Product $product): void{
        $this->product = $product;
    }
    /**
    * @return int
    */
    public function getOrderId(): int
    {
        return $this->order_id;
    }

    /**
    * @return int
    */
    public function getProductId(): int
    {
        return $this->product_id;
    }

    #[ArrayShape(['orderId' => "int", 'productId' => "int", 'lineItemPrice' => "float", 'quantity' => "int"])] public function jsonSerialize(): array{
        return [
            'orderId' => $this->order_id,
            'productId' => $this->product_id,
            'lineItemPrice' => $this->lineItemPrice,
            'quantity' => $this->quantity
        ];
    }
}