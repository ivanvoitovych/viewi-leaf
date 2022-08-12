<?php

namespace App\Adapter;

use App\Http\RawResponse;
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
        $originResponse = $this->leafInstance->response();
        // new response instance
        $internalResponse = new RawResponse();
        $internalResponse->makeInternal(); // make it not to send output
        // set as current response instance
        \Leaf\Config::set("response", ["instance" => $internalResponse]);
        // handle url internally
        $this->leafInstance->handleUrl(strtoupper($method), $url);
        // set original response back
        \Leaf\Config::set("response", ["instance" => $originResponse]);
        // return data to Viewi
        return $internalResponse->getRawData();

        // if ($internalResponse instanceof RawResponse) {
        //     print_r(['internal response',$internalResponse, $internalResponse->getRawData()]);
        // }
        // if ($originResponse instanceof RawResponse) {
        //     print_r(['original response', $originResponse, $originResponse->getRawData(), $this->leafInstance]);
        // }
    }
}
