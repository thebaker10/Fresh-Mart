<?php

declare(strict_types=1);

namespace App\Domain\User;


class InvalidEmailException extends \Exception
{
    public $message = 'The email supplied is not valid';
}
