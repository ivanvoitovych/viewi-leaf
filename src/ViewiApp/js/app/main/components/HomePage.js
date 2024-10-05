import { PostModel } from "./PostModel";
import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { register } from "../../../viewi/core/di/register";
import { Layout } from "./Layout";

var HttpClient = register.HttpClient;

class HomePage extends BaseComponent {
    _name = 'HomePage';
    title = "Viewi - Reactive application for PHP";
    post = null;
    http = null;

    constructor(http) {
        super();
        var $this = this;
        $this.http = http;
    }

    init() {
        var $this = this;
        $this.http.get("\/api\/posts\/1").then(function (post) {
            $this.post = post;
        });
    }
}

export const HomePage_x = [
    function (_component) { return _component.title; },
    function (_component) { return _component.title; },
    function (_component) { return _component.post; },
    function (_component) { return "\n        " + (_component.post.Id ?? "") + " " + (_component.post.Version ?? "") + " " + (_component.post.Name ?? "") + "\n    "; }
];

export { HomePage }