<?php

namespace App\Engine;

use App\Adapter\ViewiLeafAdapter;
use App\Http\RawResponse;
use Viewi\Routing\Route;

class ViewiEngine
{
    /**@var \Leaf\App */
    protected $instance;
    protected ViewiLeafAdapter $adapter;
    protected string $dir;

    public function __construct(string $dir,)
    {
        $this->dir = $dir;
    }
    /**
     * Initialize the viewi engine
     */
    public function init(\Leaf\App $instance = null)
    {
        if (!$instance) {
            $instance = app();
        }
        $this->adapter = new ViewiLeafAdapter($instance);
        Route::setAdapter($this->adapter);
        $instance->setResponseClass(RawResponse::class);
        $this->instance = $instance;
        // set up Viewi
        include $this->dir . 'viewi.php';
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
            Route::get('/app', $handler);
        };
    }

    public function get(string $url, string $component)
    {
        // register at Viewi
        Route::get($url, $component);
    }
}
