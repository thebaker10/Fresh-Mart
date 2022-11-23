<?php /** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Cart;

use App\Domain\Product\Product;
use App\Domain\Cart\Cart;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'cart_item')]
class CartItem implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $cart_item_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $quantity;

    #[ManyToOne(targetEntity: Cart::class, inversedBy: 'cart_items')]
    #[JoinColumn(name: 'cart_id', referencedColumnName: 'cart_id')]
    private Cart $cart;

   #[ManyToOne(targetEntity: Product::class,inversedBy: 'cart_items')]
   #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
   private Product $product;

    public function __construct(int $quantity){
        $this->setQuantity($quantity);
    }

    public function setProduct(Product $product): void{
        $this->product = $product;
    }

    public function setCart(Cart $cart): void{
        $this->cart = $cart;
    }

    /**
    * @return int
    */
    public function getCartItemId(): int
    {
        return $this->cart_item_id;
    }

    /**
     * @param int $quantity
     */
    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    #[ArrayShape(['cartItemId' => "int", 'product' => "\App\Domain\Product\Product",'quantity' => "int"])]
    public function jsonSerialize(): array{
        return [
            'cartItemId' => $this->cart_item_id,
            'product' => $this->product,
            'quantity' => $this->quantity
        ];
    }
}