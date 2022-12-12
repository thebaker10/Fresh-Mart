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
    private int $cart_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $product_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $quantity;

    #[ManyToOne(targetEntity: Cart::class, inversedBy: 'cart_items')]
    #[JoinColumn(name: 'cart_id', referencedColumnName: 'cart_id')]
    private Cart $cart;

   #[ManyToOne(targetEntity: Product::class,inversedBy: 'cart_items')]
   #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
   private Product $product;

    public function __construct(int $quantity, int $product_id, int $cart_id){
        $this->setQuantity($quantity);
        $this->setProductId($product_id);
        $this->setCartId($cart_id);
    }

    public function setProduct(Product $product): void{
        $this->product = $product;
    }

    public function getProduct(): Product{
        return $this->product;
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
    * @return int
    */
    public function getProductId(): int
    {
        return $this->product_id;
    }

    /**
     * @param int $quantity
     */
    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * @param int $product_id
     */
    public function setProductId(int $product_id): void
    {
        $this->product_id = $product_id;
    }

    /**
     * @param int $cart_id
     */
    public function setCartId(int $cart_id): void
    {
        $this->cart_id = $cart_id;
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