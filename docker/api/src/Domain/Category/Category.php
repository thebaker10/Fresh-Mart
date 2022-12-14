<?php
/** @noinspection PhpPropertyOnlyWrittenInspection */

namespace App\Domain\Category;

use App\Domain\Product\Product;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\PersistentCollection;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;

#[Entity, Table(name: 'category')]
class Category implements JsonSerializable{

    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $category_id;


    #[Column(type: 'string', unique: false, nullable: false)]
    private string $category_name;


    #[OneToMany(mappedBy: 'category', targetEntity: Product::class)]
    #[JoinColumn(name: 'category_id', referencedColumnName: 'category_id')]
    private PersistentCollection $products;

    public function __construct(string $category_name){
        $this->setCategoryName($category_name);
    }

    /**
    * @return int
    */
    public function getCategoryId(): int
    {
        return $this->category_id;
    }

    /**
     * @param string $category_name
     */
    public function setCategoryName(string $category_name): void
    {
        $this->category_name = $category_name;
    }


    #[ArrayShape(['categoryId' => "int", 'categoryName' => "string" ])] public function jsonSerialize(): array{
        return [
            'categoryId' => $this->category_id,
            'categoryName' => $this->category_name,
        ];
    }
}