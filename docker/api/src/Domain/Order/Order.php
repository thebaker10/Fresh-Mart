<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Order;

use App\Domain\User\User;
use DateTime;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'user_order')]
class Order implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $order_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $user_id;

    #[Column(type: 'datetime', unique: false, nullable: false)]
    private DateTime $order_date;

    #[Column(type: 'float', unique: false, nullable: false)]
    private float $order_price;

    #[ManyToOne(inversedBy:"orders", targetEntity: User::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private User $user;

    public function setUser(User $user): void{
        $this->user = $user;
    }
    /**
    * @return int
    */
    public function getOrderId(): int
    {
        return $this->order_id;
    }

    public function __construct(int $order_id, int $user_id, DateTime $order_date, float $order_price){
        $this->setOrderId($order_id);
        $this->setUserId($user_id);
        $this->setOrderDate($order_date);
        $this->setOrderPrice($order_price);

    }


    public function setOrderId(int $order_id): void
    {
        $this->order_id = $order_id;
    }
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }
    public function setOrderDate(DateTime $order_date): void
    {
        $this->order_date = $order_date;
    }
    public function setOrderPrice(float $order_price): void
    {
        $this->order_price = $order_price;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }
    public function getOrderDate(): DateTime
    {
        return $this->order_date;
    }
    public function getOrderPrice(): float
    {
        return $this->order_price;
    }


    #[ArrayShape(['orderId' => "int", 'userId' => "int", 'orderDate' => "DateTime", 'orderPrice' => "float"])] public function jsonSerialize(): array{
        return [
            'orderId' => $this->order_id,
            'userId' => $this->user_id,
            'orderDate' => $this->order_date,
            'orderPrice' => $this->order_price
        ];
    }
}