<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\LineItem;

use App\Domain\Product\Product;
use App\Domain\Order\Order;
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

#[Entity, Table(name: 'line_item')]
class LineItem implements JsonSerializable{

    #[Id, Column(type: 'integer', unique: false, nullable: false) ]
    private int $order_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $product_id;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $line_item_price;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $quantity;

    #[ManyToOne(targetEntity: Product::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private Product $product;

    #[ManyToOne(inversedBy:"line_items",targetEntity: Order::class)]
    #[JoinColumn(name: 'order_id', referencedColumnName: 'order_id')]
    private Order $order;

    public function __construct(int $order_id, int $product_id, float $line_item_price, int $quantity){
        $this->setOrderId($order_id);
        $this->setProductId($product_id);
        $this->setLineItemPrice($line_item_price);
        $this->setQuantity($quantity);
    }

    public function setProduct(Product $product): void{
        $this->product = $product;
    }

    public function setOrder(Order $order): void{
        $this->order = $order;
    }
    /**
    * @return int
    */
    public function getOrderId(): int
    {
        return $this->order_id;
    }

    public function setOrderId(int $order_id): void
    {
        $this->order_id = $order_id;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function setLineItemPrice(float $line_item_price): void
    {
        $this->line_item_price = $line_item_price;
    }

    /**
     * @param int $product_id
     */
    public function setProductId(int $product_id): void
    {
        $this->product_id = $product_id;
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