<?php

use Components\Views\Home\HomePage;
use Components\Views\Pages\CounterPage;

require __DIR__ . "/vendor/autoload.php";

viewi()->init();

viewi()->get('/', HomePage::class);
viewi()->get('/counter', CounterPage::class);
viewi()->get('/todo', TodoAppPage::class);
viewi()->get('*', NotFoundPage::class);

app()->get("/api/data", function () {
    response()->json(["message" => "Hello World!"]);
});

app()->run();




// Viewi application here
// include __DIR__ . '/src/ViewiApp/viewi.php';
// Viewi\App::handle();