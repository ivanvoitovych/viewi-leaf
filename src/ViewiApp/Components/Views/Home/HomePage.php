<?php

namespace Components\Views\Home;

use Components\Models\PostModel;
use Viewi\BaseComponent;
use Viewi\Common\HttpClient;

class HomePage extends BaseComponent
{
    public string $title = 'Viewi ft. Leaf - Reactive application for PHP';
    public ?PostModel $post = null;

    public function __init(HttpClient $http)
    {
        $http->get('/api/posts/45')->then(
            function (PostModel $post) {
                $this->post = $post;
            },
            function ($error) {
                echo $error;
            }
        );
    }
}
