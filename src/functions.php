<?php

declare(strict_types=1);

use App\Engine\ViewiEngine;

if (!function_exists('viewi')) {
    function viewi(): ViewiEngine
    {
        $viewi = Leaf\Config::get("viewi")["instance"] ?? null;

        if (!$viewi) {
            $viewi = new ViewiEngine(__DIR__ . '/ViewiApp/');
            Leaf\Config::set("viewi", ["instance" => $viewi]);
        }

        return $viewi;
    }
}
