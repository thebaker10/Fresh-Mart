<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainRecordNotFoundException;

class UserResetTokenException extends DomainRecordNotFoundException
{
    public $message = 'A user with that reset token could not be found.';
}
