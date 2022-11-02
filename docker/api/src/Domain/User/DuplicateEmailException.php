<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainException;

class DuplicateEmailException extends DomainException
{
    public $message = 'A user already exists with this email address.';
}
