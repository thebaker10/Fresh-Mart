<?php

declare(strict_types=1);

namespace App\Domain\User;

use Exception;
class UserResetTokenException extends Exception
{
    public $message = 'A user with that reset token could not be found.';
}
