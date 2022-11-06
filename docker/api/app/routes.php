<?php

declare(strict_types=1);

use App\Application\Actions\Category\CategoryAction;
use App\Application\Actions\Category\CategoryListAction;
use App\Application\Actions\Category\CategoryPostAction;
use App\Application\Actions\Category\DepartmentAction;
use App\Application\Actions\Category\DepartmentListAction;
use App\Application\Actions\HomePageAction;
use App\Application\Actions\Product\ProductAction;
use App\Application\Actions\Product\ProductReviewAction;
use App\Application\Actions\Review\ReviewPostAction;
use App\Application\Actions\User\UserListAction;
use App\Application\Actions\User\UserOrderListAction;
use App\Application\Actions\User\UserOrderViewAction;
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
        $group->get('/products/{productSlug}', ProductAction::class);
        $group->get('/products/{productSlug}/reviews', ProductReviewAction::class);
    });

    $app->group('/reviews', function(Group $group){
        $group->post('/',ReviewPostAction::class);
    });

    $app->group('/categories', function(Group $group){
        $group->get('', CategoryListAction::class);
        $group->get('{category_id}', CategoryAction::class);
        $group->post('/', CategoryPostAction::class);
    });

    $app->group('departments', function(Group $group){
        $group->get('', DepartmentListAction::class);
        $group->get('{department_id}', DepartmentAction::class);
    });

    $app->group('/users', function (Group $group) {
        $group->get('/', UserListAction::class);

        /*
         * CF 2022-10-13
         *  Screenshot of sending a POST request in Postman
         * https://drive.google.com/file/d/1HQAGJyRCDSN4c79x0DcFzm4UjC3MYWOp/view?usp=sharing
         * https://www.postman.com/downloads/
         */
        $group->post('/', UserPostAction::class);

        $group->get('/{user_id}', UserViewAction::class);

        $group->get('/{user_id}/orders', UserOrderListAction::class);
        $group->get('/{user_id}/orders/{order_id}', UserOrderViewAction::class);
    });
};
