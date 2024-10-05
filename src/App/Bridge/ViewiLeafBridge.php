<?php

namespace App\Bridge;

use App\Http\RawResponse;
use Viewi\Bridge\DefaultBridge;
use Viewi\Components\Http\Message\Request;
use Viewi\Engine;

class ViewiLeafBridge extends DefaultBridge
{
    public function __construct(protected \Leaf\App $leafInstance) {}

    public function request(Request $viewiRequest, Engine $engine): mixed
    {
        if ($viewiRequest->isExternal) {
            return parent::request($viewiRequest, $engine);
        }

        $originResponse = $this->leafInstance->response();
        // new response instance
        $internalResponse = new RawResponse();
        $internalResponse->makeInternal(); // make it not to send output
        // set as current response instance
        \Leaf\Config::singleton('response', function () use ($internalResponse) {
            return $internalResponse;
        });

        // handle url internally
        $this->leafInstance::handleUrl(strtoupper($viewiRequest->method), $viewiRequest->url);
        // set original response back
        \Leaf\Config::singleton('response', function () use ($originResponse) {
            return $originResponse;
        });

        // return data to Viewi
        return $internalResponse->getRawData();
    }
}
