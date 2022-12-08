<?php

declare(strict_types=1);

namespace App\Domain\User;

use Exception;

class InvalidImageUploaded extends Exception
{
    public $message = 'A valid image was not uploaded.';
}
