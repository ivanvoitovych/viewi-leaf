<?php

declare(strict_types=1);

use Viewi\PageEngine;
use Viewi\Routing\Route;
use Viewi\Routing\Router;

if (!function_exists('viewi')) {
    function viewi(): ViewiEngine
    {
        $viewi = Leaf\Config::get("viewi")["instance"] ?? null;

        if (!$viewi) {
            $viewi = new ViewiEngine();
            Leaf\Config::set("viewi", ["instance" => $viewi]);
        }

        return $viewi;
    }
}

class ViewiEngine
{
    /**@var \Leaf\App */
    protected $instance;

    /**
     * Initialize the viewi engine
     */
    public function init(\Leaf\App $instance = null)
    {
        if (!$instance) {
            $instance = app();
        }

        $this->instance = $instance;
        // set up Viewi
        include __DIR__ . '/ViewiApp/viewi.php';
    }

    /**
     * Config for viewi engine
     */
    public function config()
    {
        // 
    }

    /**
     * Wrapper for viewi route
     * 
     * @param mixed $handler The handler for the route
     */
    public function route($handler)
    {
        return function () use ($handler) {
            Viewi\Routing\Route::get('/app', $handler);
        };
    }

    public function get(string $url, string $component)
    {
        // register at Viewi
        Route::get($url, $component);
        // register at Leaf
        if ($url === '*') {
            app()->set404(function () use ($url) {
                $response = Router::handle($url, 'get');
                response()->markup($response);
            });
        } else {
            app()->get($url, function () use ($url) {
                $response = Router::handle($url, 'get');
                response()->markup($response);
            });
        }
        // TODO: implement an adapter for HttpClient
    }
}
