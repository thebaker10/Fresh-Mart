<?php

declare(strict_types=1);

use App\Application\Action\Category\CategoryAction;
use App\Application\Action\Category\CategoryListAction;
use App\Application\Actions\Category\CategoryPostAction;
use App\Application\Actions\HomePageAction;
use App\Application\Actions\Product\ProductAction;
use App\Application\Actions\Product\ProductListAction;
use App\Application\Actions\Product\ProductReviewAction;
use App\Application\Actions\Product\ProductReviewUserAction;
use App\Application\Actions\Review\ReviewPostAction;
use App\Application\Actions\Review\ReviewListAction;
use App\Application\Actions\User\UserForgotPasswordAction;
use App\Application\Actions\User\UserListAction;
use App\Application\Actions\User\UserLoginAction;
use App\Application\Actions\User\UserLogoutAction;
use App\Application\Actions\User\UserOrderListAction;
use App\Application\Actions\User\UserOrderViewAction;
use App\Application\Actions\User\UserPasswordResetAction;
use App\Application\Actions\User\UserPostAction;
use App\Application\Actions\User\UserViewAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', HomePageAction::class);

    $app->group('/products', function(Group $group){
        $group->get('/', ProductListAction::class);
        $group->get('/{productSlug}', ProductAction::class);
        $group->get('/{productSlug}/reviews', ProductReviewAction::class);
        $group->get('/{productSlug}/users', ProductReviewUserAction::class);
    });

    $app->group('/reviews', function(Group $group){
        $group->post('/',ReviewPostAction::class);
        $group->get('',ReviewListAction::class);
    });

    $app->group('/categories', function(Group $group){
        $group->get('', CategoryListAction::class);
        $group->get('{category_id}', CategoryAction::class);
        $group->post('/', CategoryPostAction::class);
    });

    $app->group('/users', function (Group $group) {
        $group->get('/', UserListAction::class);
        $group->get('/logout', UserLogoutAction::class);

        /*
         * CF 2022-10-13
         *  Screenshot of sending a POST request in Postman
         * https://drive.google.com/file/d/1HQAGJyRCDSN4c79x0DcFzm4UjC3MYWOp/view?usp=sharing
         * https://www.postman.com/downloads/
         */
        $group->post('/', UserPostAction::class);
        $group->post('/login', UserLoginAction::class);
        $group->post('/forgot-password', UserForgotPasswordAction::class);
        $group->post('/password-reset', UserPasswordResetAction::class);


        $group->get('/{user_id}', UserViewAction::class);

        $group->get('/{user_id}/orders', UserOrderListAction::class);
        $group->get('/{user_id}/orders/{order_id}', UserOrderViewAction::class);
    });
};
