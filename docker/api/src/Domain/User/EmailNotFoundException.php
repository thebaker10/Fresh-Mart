<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainException;

class EmailNotFoundException extends DomainException
{
    public $message = 'An account registered with the provided email address was not found.';
}
