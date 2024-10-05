<?php

use App\Bridge\ViewiHandler;
use App\Bridge\ViewiLeafBridge;
use Components\Models\PostModel;
use Viewi\App;
use Viewi\Bridge\IViewiBridge;

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

$app->get("/api/data", function () {
    response()->json(["message" => "Hello World!"]);
});

$app->get("/api/posts/{id}", function ($id) {
    $post = new PostModel();
    $post->Id = $id ?? 0;
    $post->Name = 'Viewi ft. Leaf';
    $post->Version = 1;
    response()->json($post);
});


// pass action to the Viewi app

/**
 * Viewi set up
 * The idea is to let Viewi handle its own routes by registering a 404 action
 * @param RouteCollection $routes 
 * @return void 
 */
function viewiSetUp(\Leaf\App $leafApp)
{
    /**
     * @var App
     */
    $app = require __DIR__ . '/src/ViewiApp/viewi.php';
    require __DIR__ . '/src/ViewiApp/routes.php';
    $bridge = new ViewiLeafBridge($leafApp);
    $app->factory()->add(IViewiBridge::class, function () use ($bridge) {
        return $bridge;
    });
    ViewiHandler::setViewiApp($app);

    $leafApp->all('.*', function () {
        (new ViewiHandler())->handle();
    });
}

viewiSetUp($app);

$app->run();

// php -S localhost:83