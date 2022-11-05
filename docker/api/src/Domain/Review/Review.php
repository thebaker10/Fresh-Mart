<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Review;

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

#[Entity, Table(name: 'review')]
class Review implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $review_id;

    //@TODO replace this with a relationship
    #[Column(type: 'integer', unique: true, nullable: false)]
    private int $product_id;

    //@TODO replace this with a relationship
    #[Column(type: 'integer', unique: true, nullable: false)]
    private int $user_id;

    #[Column(type: 'integer', unique: false, nullable: false)]
    private int $rating;

    #[Column(type: 'string', unique: false, nullable: false)]
    private string $review_title;

    #[Column(type: 'string', unique: false, nullable: false)]
    private string $review_content;

    #[ManyToOne(inversedBy: 'reviews', targetEntity: Product::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private Product $product;

    #[ManyToOne(inversedBy: 'reviews', targetEntity: User::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private User $user;

    public function __construct(int $product_id, int $user_id, int $rating, string $review_title, string $review_content){
        $this->setProductId($product_id);
        $this->setUserId($user_id);
        $this->setRating($rating);
        $this->setTitle($review_title);
        $this->setContent($review_content);
    }

    public function setProduct(Product $product): void{
        $this->product = $product;
    }

    /**
    * @return int
    */
    public function getReviewId(): int
    {
        return $this->review_id;
    }

    /**
    * @return int
    */
    public function getProductId(): int
    {
        return $this->product_id;
    }

    /**
     * @param int $product_id
     */
    public function setProductId(int $product_id): void
    {
        $this->product_id = $product_id;
    }

    /**
     * @param int $user_id
     */
    public function setuserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    /**
     * @param int $rating
     */
    public function setRating(int $rating): void
    {
        $this->rating = $rating;
    }

    /**
     * @param string $review_title
     */
    public function setTitle(string $review_title): void
    {
        $this->review_title = $review_title;
    }

    /**
     * @param string $review_title
     */
    public function setContent(string $review_content): void
    {
        $this->review_content = $review_content;
    }



    #[ArrayShape(['reviewId' => "int", 'productId' => "int", 'userId' => "int", 'rating' => "int", 'reviewTitle' => "string", 'reviewContent' => "string" ])] public function jsonSerialize(): array{
        return [
            'reviewId' => $this->review_id,
            'productId' => $this->product_id,
            'userId' => $this->user_id,
            'rating' => $this->rating,
            'reviewTitle' => $this->review_title,
            'reviewContent' => $this->review_content
        ];
    }
}