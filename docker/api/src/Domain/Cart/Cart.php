<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Cart;

use App\Domain\User\User;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

#[Entity, Table(name: 'cart')]
class Cart implements \JsonSerializable{

    #[Id, Column(name: 'cart_id', type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $cart_id;

    #[Column(type: 'integer', unique: true, nullable: false)]
    private int $user_id;

    #[OneToOne(inversedBy: 'cart', targetEntity: User::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private User $user;

    #[OneToMany(mappedBy: 'cart', targetEntity: CartItem::class)]
    #[JoinColumn(name: 'cart_id', referencedColumnName: 'cart_id')]
    private PersistentCollection $cart_items;

    public function __construct(int $user_id){
        $this->setUserId($user_id);
    }

    public function setUser(User $user){
        $this->user = $user;
    }

    /**
    * @return int
    */
    public function getCartId(): int
    {
        return $this->cart_id;
    }

    /**
     * @param int $user_id
     */
    public function setCartId(int $cart_id): void
    {
        $this->cart_id = $cart_id;
    }

    /**
    * @return int
    */
    public function getUserId(): int
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }



    #[ArrayShape(['cartId' => "int", 'userId' => "int", 'cartItems' => "\Doctrine\Common\Collections\ArrayCollection"])]
    public function jsonSerialize(): array{
        return [
            'cartId' => $this->cart_id,
            'userId' => $this->user->getUserId(),
            'cartItems' => $this->cart_items->getValues()
        ];
    }
}