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
    private string $rating;

    #[Column(type: 'string', unique: false, nullable: false)]
    private float $review_title;

    #[Column(type: 'string', unique: false, nullable: false)]
    private float $review_content;

    #[ManyToOne(targetEntity: Product::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'product_id')]
    private Product $product;

    #[ManyToOne(targetEntity: User::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private User $user;



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