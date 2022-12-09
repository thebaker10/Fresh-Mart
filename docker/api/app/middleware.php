<?php

declare(strict_types=1);

use App\Application\Middleware\AuthMiddleware;
use App\Application\Middleware\SessionMiddleware;
use Selective\SameSiteCookie\SameSiteCookieMiddleware;
use Selective\SameSiteCookie\SameSiteSessionMiddleware;
use Slim\App;

return function (App $app) {
    $app->add(new SessionMiddleware());
    $app->add(new SameSiteCookieMiddleware());
    $app->add(new SameSiteSessionMiddleware());
};
