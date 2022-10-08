<?php

// src/Domain/User.php

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'users')]
final class User
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $user_id;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $first_name;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $last_name;

    #[Column(type: 'string', unique: true, nullable: false)]
    private string $username;

    #[Column(type: 'double', unique: true, nullable: false)]
    private string $user_balance;

    public function __construct()
    { }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getLastName(): string
    {
        return $this->last_name;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getUserBalance(): float
    {
        return $this->user_balance;
    }
}