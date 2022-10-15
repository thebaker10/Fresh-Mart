<?php /** @noinspection PhpPropertyOnlyWrittenInspection */

// src/Domain/User.php
namespace App\Domain\User;

use App\Domain\Cart\Cart;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;
use JsonSerializable;

#[Entity, Table(name: 'user')]
class User implements JsonSerializable
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $user_id;

    #[Column(type: 'string', unique: false, nullable: false)]
    private string $password_hash;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $first_name;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $last_name;

    #[Column(name: 'username', type: 'string', unique: true, nullable: false)]
    private string $username;

    #[Column(type: 'decimal', unique: true, nullable: false)]
    private string $user_balance;

    #[OneToMany(mappedBy: 'user_id', targetEntity: Cart::class)]
    private PersistentCollection $shopping_cart;

    public function __construct(string $first_name, string $last_name, string $username, string $password, float $user_balance){
        $this->setFirstName($first_name);
        $this->setLastName($last_name);
        $this->setUserBalance($user_balance);
        $this->setUsername($username);
        $this->setPasswordHash($password);
    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->user_id;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->first_name;
    }

    /**
     * @param string $first_name
     */
    public function setFirstName(string $first_name): void
    {
        $this->first_name = $first_name;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->last_name;
    }

    /**
     * @param string $last_name
     */
    public function setLastName(string $last_name): void
    {
        $this->last_name = $last_name;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getUserBalance(): string
    {
        return $this->user_balance;
    }

    /**
     * @param string $user_balance
     */
    public function setUserBalance(string $user_balance): void
    {
        $this->user_balance = $user_balance;
    }


    public function setPasswordHash(string $password): void{
        $hash = password_hash($password, PASSWORD_BCRYPT );
        $this->password_hash = $hash;
    }

    public function verifyPassword(string $password): bool{
        return $this->password_hash === password_hash($password, PASSWORD_BCRYPT);
    }

    #[Pure] #[ArrayShape(['userId' => "int", 'firstName' => "string", 'lastName' => "string", 'username' => "string", 'balance' => "string", 'shoppingCart' => 'array'])]
    public function jsonSerialize(): array
    {
        return [
            'userId' => $this->getUserId(),
            'firstName' => $this->getFirstName(),
            'lastName' => $this->getLastName(),
            'username' => $this->getUsername(),
            'balance' => $this->getUserBalance(),
            'shoppingCart'=> $this->shopping_cart
        ];
    }
}