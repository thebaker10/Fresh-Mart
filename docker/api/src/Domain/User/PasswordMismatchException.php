<?php

declare(strict_types=1);

namespace App\Domain\User;

use Exception;

class PasswordMismatchException extends Exception
{
    public $message = 'The "Password" and "Confirm Password" fields do not match.';
}
