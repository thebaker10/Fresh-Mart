<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainRecordNotFoundException;

class UserAccessDeniedException extends DomainRecordNotFoundException
{
    public $message = 'You do not have permission to access this user.';
}
