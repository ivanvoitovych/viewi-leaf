<?php

namespace App\Bridge;

use Exception;
use Viewi\App;
use Viewi\Components\Http\Message\Request;
use Viewi\Router\ComponentRoute;
use Viewi\Router\Router;

class ViewiHandler
{
    protected static App $viewiApp;
    protected static Router $viewiRouter;

    public function handle()
    {
        $urlPath = explode('?', \Leaf\Http\Request::getPathInfo())[0];
        $requestMethod = \Leaf\Http\Request::getMethod();

        $match = self::$viewiRouter->resolve($urlPath, $requestMethod);
        if ($match === null) {
            throw new Exception('No route was matched!');
        }
        /** @var RouteItem */
        $routeItem = $match['item'];
        $action = $routeItem->action;
        $leafResponse = response();
        if ($action instanceof ComponentRoute) {
            $viewiRequest = new Request($urlPath, strtolower($requestMethod));
            $response = self::$viewiApp->engine()->render($action->component, $match['params'], $viewiRequest);
            if ($routeItem->transformCallback !== null && $response instanceof \Viewi\Components\Http\Message\Response) {
                $response = ($routeItem->transformCallback)($response);
            }
            foreach ($response->headers as $key => $value) {
                $leafResponse->withHeader($key, $value);
            }

            $statusCode = isset($response->headers['Location']) ? 302 : $response->status;
            $leafResponse->status($statusCode);

            $leafResponse->markup($response->body, $statusCode);
        } else {
            throw new Exception('Unknown action type.');
        }
    }

    public static function setViewiApp(App $viewiApp)
    {
        self::$viewiApp = $viewiApp;
        self::$viewiRouter = $viewiApp->router();
    }
}