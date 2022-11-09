<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainException;

class InvalidPasswordException extends DomainException
{
    public $message = 'The password supplied was not correct.';
}
