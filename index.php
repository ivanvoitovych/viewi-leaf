<?php

use Components\Models\PostModel;
use Components\Views\Home\HomePage;
use Components\Views\NotFound\NotFoundPage;
use Components\Views\Pages\CounterPage;
use Components\Views\Pages\TodoAppPage;

require __DIR__ . "/vendor/autoload.php";

viewi()->init();

viewi()->get('/', HomePage::class);
viewi()->get('/counter', CounterPage::class);
viewi()->get('/todo', TodoAppPage::class);
viewi()->get('*', NotFoundPage::class);

app()->get("/api/data", function () {
    response()->json(["message" => "Hello World!"]);
});

app()->get("/api/posts/{id}", function ($id) {
    $post = new PostModel();
    $post->Id = $id ?? 0;
    $post->Name = 'Viewi ft. Leaf';
    $post->Version = 1;
    response()->json($post);
});

app()->run();




// Viewi application here
// include __DIR__ . '/src/ViewiApp/viewi.php';
// Viewi\App::handle();