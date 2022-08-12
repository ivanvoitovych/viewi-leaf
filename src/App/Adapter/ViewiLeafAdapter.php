<?php

namespace App\Adapter;

use Viewi\Routing\RouteAdapterBase;
use Viewi\Routing\Router;

class ViewiLeafAdapter extends RouteAdapterBase
{
    private \Leaf\App $leafInstance;

    public function __construct(\Leaf\App $leafInstance)
    {
        $this->leafInstance = $leafInstance;
    }

    public function register($method, $url, $component, $defaults)
    {
        // register at Leaf
        if ($url === '*') {
            $this->leafInstance->set404(function () use ($url) {
                $response = Router::handle($url, 'get');
                response()->markup($response);
            });
        } else {
            $this->leafInstance->get($url, function () use ($url) {
                $response = Router::handle($url, 'get');
                response()->markup($response);
            });
        }        
    }

    public function handle($method, $url, $params = null)
    {
        // TODO: implement an adapter for HttpClient
    }
}
