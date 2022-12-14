<?php /** @noinspection PhpPropertyOnlyWrittenInspection */

// src/Domain/User.php
namespace App\Domain\User;

use App\Domain\Cart\Cart;
use App\Domain\Favorite\Favorite;
use App\Domain\Review\Review;
use App\Domain\Order\Order;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\Table;
use JetBrains\PhpStorm\ArrayShape;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\Pure;
use JsonSerializable;


/**
 *  2022-10-22 CF
 * The comments starting with a "#" that appear above the lines of code are PHP 8 attributes
 * These provide machine-readable markup for things like Doctrine to provide additional information
 * The ORM uses this information to load the information from the database into the entity model
 */

#[Entity, Table(name: 'user')]
class User implements JsonSerializable
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    private int $user_id;

    #[Column(type: 'integer', unique:false, nullable:false)]
    private int $role_id;

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

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $password_reset_token;

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $address;

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $city;

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $state;

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $zip;

    #[Column(type: 'string', unique: true, nullable: true)]
    private string $country;

    #[OneToOne(mappedBy: 'user', targetEntity: Cart::class)]
    private Cart $cart;

    #[OneToOne(mappedBy: 'user', targetEntity: Favorite::class,orphanRemoval: true)]
    private Favorite $favorites;

    #[OneToMany(mappedBy: 'user', targetEntity: Review::class)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private PersistentCollection $reviews;

    #[OneToMany(mappedBy: 'user', targetEntity: Order::class, orphanRemoval: true)]
    #[JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private PersistentCollection $orders;

    /**
     * @throws InvalidEmailException
     */
    public function __construct(string $first_name, string $last_name, string $username, string $password, float $user_balance, int $role_id){
        $this->setFirstName($first_name);
        $this->setLastName($last_name);
        $this->setUserBalance($user_balance);
        $this->setUsername($username);
        $this->setPasswordHash($password);
        $this->setRoleId($role_id);
    }

    public function getCart(){
        return $this->cart;
    }

    public function setCart(Cart $cart){
        $this->cart = $cart;
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

    /**
     * @param int $role_id
     */
    public function setRoleId(int $role_id): void
    {
        $this->role_id = $role_id;
    }

    public function setPasswordHash(string $password): void{
        $hash = password_hash($password, PASSWORD_BCRYPT );
        $this->password_hash = $hash;
    }

    public function verifyPassword(string $password): bool{
        return password_verify($password, $this->password_hash);
    }

    #[Pure] #[ArrayShape(['userId' => "int", 'firstName' => "string", 'lastName' => "string", 'email' => "string", 'balance' => "string", 'shoppingCart' => 'array', 'address' => "string",'city' => "string",'state' => "string",'zip' => "string",'country' => "string", 'profileImage' => 'string'])]
    public function jsonSerialize(): array{


        if(!empty($_COOKIE['freshMartUserId'])) {
            //Profile Image
            $userId = $_COOKIE['freshMartUserId'];
            $basename = md5($userId . '-freshMart-user-profile-image');
            $filename = sprintf('%s.%0.8s', $basename, 'jpg');
        }else{
            $filename = null;
        }

        //The null coalesce operator below prevents accessing a shopping cart that does not exist
        return [
            'userId' => $this->getUserId(),
            'firstName' => $this->getFirstName(),
            'lastName' => $this->getLastName(),
            'email' => $this->getUsername(),
            'balance' => $this->getUserBalance(),
            'shoppingCart' => $this->cart ?? [],
            'favorites' => $this->favorites ?? [],
            'address' => $this->address ?? null,
            'city' => $this->city ?? null,
            'state' => $this->state ?? null,
            'zip' => $this-> zip ?? null,
            'country' => $this-> country ?? null,
            'profileImage' => $_ENV['REACT_APP_API_BASE'] . '/profileimages/' . $filename
        ];
    }

    public function isAdmin(): bool{

        //@TODO check the user's role
        return false;
    }

    /**
     * @return string
     */
    public function getPasswordResetToken(): string
    {
        return $this->password_reset_token;
    }

    /**
     * @param string $password_reset_token
     */
    public function setPasswordResetToken(string $password_reset_token): void
    {
        $this->password_reset_token = $password_reset_token;
    }

    public function setSessionCookie(){
        $id = $this->getUserId();
        $expiry =  time()+60*60*24*30;
        setcookie('freshMartUserId', $id, $expiry, '/', str_replace('https://', '', $_ENV['REACT_APP_FRONTEND_BASE']));

        $freshMartHash = hash('sha256', $id.$_ENV['COOKIE_SALT']);
        setcookie('freshMartHash', $freshMartHash, $expiry, '/', str_replace('https://', '', $_ENV['REACT_APP_FRONTEND_BASE']));
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $address
     */
    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    /**
     * @return string
     */
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * @param string $city
     */
    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getState(): string
    {
        return $this->state;
    }

    /**
     * @param string $state
     */
    public function setState(string $state): void
    {
        $this->state = $state;
    }

    /**
     * @return string
     */
    public function getZip(): string
    {
        return $this->zip;
    }

    /**
     * @param string $zip
     */
    public function setZip(string $zip): void
    {
        $this->zip = $zip;
    }

    /**
     * @return string
     */
    public function getCountry(): string
    {
        return $this->country;
    }

    /**
     * @param string $country
     */
    public function setCountry(string $country): void
    {
        $this->country = $country;
    }
}