# Viewi and Leaf

Code to change on Leaf side:

```php
// vendor\leafs\router\src\Router\Core.php
    public static function handleUrl(string $method, string $url)
    {
        if (isset(static::$routes[$method])) {
            static::handle(
                static::$routes[$method],
                true,
                $url
            );
        }
    }

    /**
     * Handle a set of routes: if a match is found, execute the relating handling function.
     *
     * @param array $routes Collection of route patterns and their handling functions
     * @param bool $quitAfterRun Does the handle function need to quit after one route was matched?
     *
     * @return int The number of routes handled
     */
    private static function handle(array $routes, bool $quitAfterRun = false, ?string $url = null): int
    {
        $numHandled = 0;
        $uri = $url ?? static::getCurrentUri();

        foreach ($routes as $route) {
            // Replace all curly braces matches {} into word patterns (like Laravel)
            $route['pattern'] = preg_replace('/\/{(.*?)}/', '/(.*?)', $route['pattern']);

            // we have a match!
            if (preg_match_all('#^' . $route['pattern'] . '$#', $uri, $matches, PREG_OFFSET_CAPTURE)) {
                // Rework matches to only contain the matches, not the orig string
                $matches = array_slice($matches, 1);

                // Extract the matched URL parameters (and only the parameters)
                $params = array_map(function ($match, $index) use ($matches) {
                    // We have a following parameter: take the substring from the current param position until the next one's position (thank you PREG_OFFSET_CAPTURE)
                    if (isset($matches[$index + 1]) && isset($matches[$index + 1][0]) && is_array($matches[$index + 1][0])) {
                        return trim(substr($match[0][0], 0, $matches[$index + 1][0][1] - $match[0][1]), '/');
                    }

                    // We have no following parameters: return the whole lot
                    return isset($match[0][0]) ? trim($match[0][0], '/') : null;
                }, $matches, array_keys($matches));

                // Call the handling function with the URL parameters if the desired input is callable
                static::invoke($route['handler'], $params);
                ++$numHandled;

                if ($quitAfterRun) {
                    break;
                }
            }
        }

        return $numHandled;
    }

```