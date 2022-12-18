<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainException;
use Exception;

class UserNotFoundException extends Exception
{
    public $message = 'An account was not found.';
}
