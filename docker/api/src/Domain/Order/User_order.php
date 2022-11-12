<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Order;

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

#[Entity, Table(name: 'user_order')]
class User_order implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $order_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $user_id;

    #[Column(type: 'datetime', unique: false, nullable: false)]
    private int $order_date;

    #[Column(type: 'float', unique: false, nullable: false)]
    private string $order_price;

    #[ManyToOne(targetEntity: User::class)]
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


    #[ArrayShape(['orderId' => "int", 'userId' => "int", 'orderDate' => "string", 'orderPrice' => "float"])] public function jsonSerialize(): array{
        return [
            'orderId' => $this->order_id,
            'userId' => $this->user_id,
            'orderDate' => $this->order_date,
            'orderPrice' => $this->order_price
        ];
    }
}