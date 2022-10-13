<?php

// src/Domain/User.php
namespace App\Domain\User;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'users')]
class User
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
}