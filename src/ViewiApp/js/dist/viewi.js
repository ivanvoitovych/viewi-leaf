(() => {
  // app/main/components/PostModel.js
  var PostModel = class {
    Id = null;
    Name = null;
    Version = null;
  };

  // viewi/core/component/baseComponent.ts
  var BaseComponent = class {
    __id = "";
    _props = {};
    $_callbacks = {};
    _refs = {};
    _slots = {};
    _element = null;
    $$t = [];
    // template inline expressions
    $$r = {};
    // reactivity callbacks
    $$p = [];
    // shared reactivity track ids
    $;
    $$watchList = [];
    _provides;
    _parent = null;
    _name = "BaseComponent";
    emitEvent(name, event) {
      if (name in this.$_callbacks) {
        this.$_callbacks[name](event);
      }
    }
    provide(key, value) {
      if (this._provides === this._parent?._provides) {
        this._provides = Object.create(this._provides);
      }
      this._provides[key] = value;
    }
    inject(key) {
      return this._provides[key] || null;
    }
    watch(path, callback) {
      this.$$watchList.push([path, callback]);
    }
  };

  // app/main/components/MenuBar.js
  var MenuBar = class extends BaseComponent {
    _name = "MenuBar";
  };

  // app/main/resources/index.js
  var resources = {
    componentsPath: "/viewi-default/viewi.json",
    publicPath: "/viewi-default/",
    name: "default",
    minify: false,
    combine: false,
    appendVersion: false,
    build: "OD1zxK5x",
    version: "2.0.0"
  };

  // viewi/core/di/register.ts
  var register = window.ViewiApp ? window.ViewiApp[resources.name].register : {};

  // app/main/components/ConfigService.js
  var Platform = register.Platform;
  var ConfigService = class {
    config = null;
    platform = null;
    constructor(platform) {
      var $this = this;
      $this.platform = platform;
      $this.config = platform.getConfig();
    }
    getAll() {
      var $this = this;
      return $this.config;
    }
    get(name) {
      var $this = this;
      return $this.config[name] ?? null;
    }
    isServer() {
      var $this = this;
      return $this.platform.server;
    }
    isBrowser() {
      var $this = this;
      return $this.platform.browser;
    }
  };

  // app/main/functions/implode.js
  function implode(glue, pieces) {
    let i = "";
    let retVal = "";
    let tGlue = "";
    if (arguments.length === 1) {
      pieces = glue;
      glue = "";
    }
    if (typeof pieces === "object") {
      if (Object.prototype.toString.call(pieces) === "[object Array]") {
        return pieces.join(glue);
      }
      for (i in pieces) {
        retVal += tGlue + pieces[i];
        tGlue = glue;
      }
      return retVal;
    }
    return pieces;
  }

  // app/main/components/CssBundle.js
  var HttpClient = register.HttpClient;
  var CssBundle = class extends BaseComponent {
    _name = "CssBundle";
    config = null;
    http = null;
    constructor(config, http) {
      super();
      var $this = this;
      config = typeof config !== "undefined" ? config : null;
      http = typeof http !== "undefined" ? http : null;
      $this.config = config;
      $this.http = http;
    }
    links = [];
    minify = false;
    combine = false;
    inline = false;
    purge = false;
    cssHtml = "<!--- CssBundle not initiated --->";
    mounted() {
      var $this = this;
      var baseUrl = $this.config.get("assetsUrl");
      if ($this.combine) {
        var cssBundleList = $this.config.get("cssBundle");
        var version = $this.version();
        if (!(version in cssBundleList)) {
          throw new Exception("Css bundle not found");
        }
        var cssFile = baseUrl + cssBundleList[version];
        if ($this.inline) {
          $this.cssHtml = '<style data-keep="' + version + '"> /** loading ' + cssFile + " **/ </style>";
          $this.http.get(cssFile).then(function(css) {
            $this.cssHtml = '<style data-keep="' + version + '">' + css + "</style>";
          }, function() {
            $this.cssHtml = '<style data-keep="' + version + '"> /** Error loading ' + cssFile + " **/ </style>";
          });
          return;
        }
        $this.cssHtml = '<link rel="stylesheet" href="' + cssFile + '">';
      } else {
        var cssHtml = "";
        for (var _i0 in $this.links) {
          var link = $this.links[_i0];
          cssFile = baseUrl + link;
          cssHtml += '<link rel="stylesheet" href="' + cssFile + '">';
          $this.cssHtml = cssHtml;
        }
      }
    }
    version() {
      var $this = this;
      var key = implode("|", $this.links);
      key += $this.minify ? "1" : "0";
      key += $this.inline ? "1" : "0";
      key += $this.purge ? "1" : "0";
      key += $this.combine ? "1" : "0";
      return key;
    }
  };
  var CssBundle_x = [
    function(_component) {
      return _component.cssHtml;
    }
  ];

  // app/main/components/ViewiAssets.js
  var ViewiAssets = class extends BaseComponent {
    _name = "ViewiAssets";
    appPath = "";
    data = '<script data-keep="ViewiAssets">"ViewiAssets";<\/script>';
  };
  var ViewiAssets_x = [
    function(_component) {
      return _component.data;
    },
    function(_component) {
      return _component.appPath;
    }
  ];

  // app/main/components/Layout.js
  var Layout = class extends BaseComponent {
    _name = "Layout";
    title = "Viewi";
    assetsUrl = "/";
    constructor(config) {
      super();
      var $this = this;
      $this.assetsUrl = config.get("assetsUrl");
    }
  };
  var Layout_x = [
    function(_component) {
      return "\n        " + (_component.title ?? "") + " | Viewi\n    ";
    },
    function(_component) {
      return ["/mui.css", "/app.css"];
    }
  ];

  // app/main/components/HomePage.js
  var HttpClient2 = register.HttpClient;
  var HomePage = class extends BaseComponent {
    _name = "HomePage";
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
      $this.http.get("/api/posts/1").then(function(post) {
        $this.post = post;
      });
    }
  };
  var HomePage_x = [
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.post;
    },
    function(_component) {
      return "\n        " + (_component.post.Id ?? "") + " " + (_component.post.Version ?? "") + " " + (_component.post.Name ?? "") + "\n    ";
    }
  ];

  // app/main/components/NotFoundPage.js
  var NotFoundPage = class extends BaseComponent {
    _name = "NotFoundPage";
  };

  // app/main/components/index.js
  var components = {
    PostModel,
    MenuBar,
    HomePage_x,
    HomePage,
    Layout_x,
    Layout,
    NotFoundPage,
    CssBundle_x,
    CssBundle,
    ViewiAssets_x,
    ViewiAssets,
    ConfigService
  };
  var templates = "{}";

  // app/main/functions/index.js
  var functions = {
    implode
  };

  // viewi/core/router/routeItem.ts
  var RouteItem = class {
    method;
    url;
    action;
    wheres;
    defaults = null;
    constructor(method, url, action, defaults = null, wheres) {
      this.method = method;
      this.url = url;
      this.action = action;
      this.wheres = {};
      this.defaults = defaults;
      if (wheres) {
        this.wheres = wheres;
      }
    }
    where(wheresOrName, expr) {
      if (wheresOrName !== null && typeof wheresOrName === "object") {
        this.wheres = Object.assign(this.where, wheresOrName);
      } else if (expr) {
        this.wheres[wheresOrName] = expr;
      }
      return this;
    }
  };

  // viewi/core/router/router.ts
  var Router = class {
    routes;
    trimExpr = /^\/|\/$/g;
    setRoutes(routeList) {
      this.routes = routeList;
    }
    getRoutes() {
      return this.routes;
    }
    register(method, url, action, defaults = null, wheres) {
      const item = new RouteItem(
        method.toLowerCase(),
        url,
        action,
        defaults,
        wheres
      );
      this.routes.push(item);
      return item;
    }
    get(url, action) {
      return this.register("get", url, action);
    }
    resolve(url) {
      url = url.replace(this.trimExpr, "");
      const parts = url.split("/");
      for (let k in this.routes) {
        const params = {};
        let valid = true;
        const item = this.routes[k];
        const targetUrl = item.url.replace(this.trimExpr, "");
        const targetParts = targetUrl.split("/");
        let pi = 0;
        let skipAll = false;
        for (pi; pi < targetParts.length; pi++) {
          const urlExpr = targetParts[pi];
          const hasWildCard = urlExpr.indexOf("*") !== -1;
          if (hasWildCard) {
            const beginning = urlExpr.slice(0, -1);
            if (!beginning || parts[pi].indexOf(beginning) === 0) {
              skipAll = true;
              break;
            }
          }
          const hasParams = urlExpr.indexOf("{") !== -1;
          if (urlExpr !== parts[pi] && !hasParams) {
            valid = false;
            break;
          }
          if (hasParams) {
            const bracketParts = urlExpr.split(/[{}]+/);
            let paramName = bracketParts[1];
            if (paramName[paramName.length - 1] === "?") {
              paramName = paramName.slice(0, -1);
            } else if (pi >= parts.length) {
              valid = false;
              break;
            }
            if (paramName.indexOf("<") !== -1) {
              const matches = /<([^>]+)>/.exec(paramName);
              if (matches) {
                paramName = paramName.replace(/<([^>]+)>/g, "");
                item.wheres[paramName] = matches[1];
              }
            }
            if (item.wheres[paramName]) {
              const regex = new RegExp(item.wheres[paramName], "g");
              if (!regex.test(parts[pi])) {
                valid = false;
                break;
              }
              regex.lastIndex = 0;
              if (regex.test("/")) {
                skipAll = true;
              }
            }
            let paramValue = pi < parts.length ? parts[pi] : null;
            if (paramValue && bracketParts[0]) {
              if (paramValue.indexOf(bracketParts[0]) !== 0) {
                valid = false;
                break;
              } else {
                paramValue = paramValue.slice(bracketParts[0].length);
              }
            }
            params[paramName] = paramValue;
            if (skipAll) {
              params[paramName] = parts.slice(pi).join("/");
              break;
            }
          }
        }
        if (pi < parts.length && !skipAll) {
          valid = false;
        }
        if (valid) {
          return { item, params };
        }
      }
      return null;
    }
  };

  // viewi/core/component/componentsMeta.ts
  var componentsMeta = {
    list: {},
    config: {},
    globals: {},
    booleanAttributes: {},
    router: new Router()
  };

  // viewi/core/lifecycle/scopeState.ts
  function getScopeState() {
    const scopedResponseData = window.viewiScopeState;
    return scopedResponseData ?? { http: {}, state: {} };
  }

  // viewi/core/di/factory.ts
  var factoryContainer = {};
  function factory(name, implementation, factory2) {
    register[name] = implementation;
    components[name] = implementation;
    factoryContainer[name] = factory2;
  }

  // viewi/core/di/globalScope.ts
  var globalScope = {
    hydrate: true,
    // first time hydrate, TODO: configurable, MFE won't need hydration
    rootScope: false,
    scopedContainer: {},
    located: {},
    iteration: {},
    iterationId: 0,
    lastIteration: {},
    layout: "",
    cancel: false,
    cancelIterationId: 0
  };

  // viewi/core/di/resolve.ts
  var singletonContainer = {};
  var nextInstanceId = 0;
  var rootProvides = {};
  function resolve(name, params = {}, canBeNull = false, parent = null) {
    if (!(name in componentsMeta.list)) {
      if (canBeNull) {
        return null;
      }
      throw new Error("Can't resolve " + name);
    }
    const info = componentsMeta.list[name];
    let instance = null;
    let container = false;
    if (info.di === "SINGLETON") {
      container = singletonContainer;
    } else if (info.di === "SCOPED") {
      container = globalScope.scopedContainer;
    }
    if (container && name in container) {
      return container[name];
    }
    const toProvide = {};
    if (info.custom) {
      instance = factoryContainer[name]();
    } else if (!info.dependencies) {
      instance = new components[name]();
    } else {
      const constructArguments = [];
      for (let i in info.dependencies) {
        const dependency = info.dependencies[i];
        const diType = dependency["di"] || false;
        const argCanBeNull = !!dependency.null;
        var argument = null;
        if (diType === "PARENT") {
          argument = parent ? parent.inject(dependency.name) : rootProvides[dependency.name] || null;
        } else if (params && dependency.argName in params) {
          argument = params[dependency.argName];
        } else if (dependency.default) {
          argument = dependency.default;
        } else if (dependency.builtIn) {
          argument = dependency.name === "string" ? "" : 0;
        } else {
          argument = resolve(dependency.name, {}, argCanBeNull, parent);
        }
        if (diType === "COMPONENT") {
          toProvide[dependency.name] = argument;
        }
        constructArguments.push(argument);
      }
      instance = new components[name](...constructArguments);
    }
    if (info.base) {
      const baseComponent = instance;
      baseComponent.__id = ++nextInstanceId + "";
      if (parent !== null) {
        baseComponent._provides = parent._provides;
        baseComponent._parent = parent;
      } else {
        baseComponent._provides = rootProvides;
      }
      for (let p in toProvide) {
        baseComponent.provide(p, toProvide[p]);
      }
    }
    if (info.diProps) {
      for (let prop in info.diProps) {
        const dependency = info.diProps[prop];
        const diType = dependency.di;
        let propInstance = null;
        if (diType === "PARENT") {
          propInstance = parent ? parent.inject(dependency.name) : rootProvides[dependency.name] || null;
        } else if (diType === "SINGLETON") {
          if (!(dependency.name in singletonContainer)) {
            propInstance = resolve(dependency.name, {}, false, parent);
            singletonContainer[dependency.name] = propInstance;
          }
          propInstance = singletonContainer[dependency.name];
        } else if (diType === "SCOPED") {
          if (!(dependency.name in globalScope.scopedContainer)) {
            propInstance = resolve(dependency.name, {}, false, parent);
            globalScope.scopedContainer[dependency.name] = propInstance;
          }
          propInstance = globalScope.scopedContainer[dependency.name];
        } else {
          propInstance = resolve(dependency.name, {}, false, parent);
        }
        instance[prop] = propInstance;
        if (diType === "COMPONENT") {
          instance.provide(dependency.name, propInstance);
        }
      }
    }
    const scopeState = getScopeState();
    if (scopeState.state[name]) {
      for (let prop in scopeState.state[name]) {
        instance[prop] = scopeState.state[name][prop];
      }
    }
    if (container) {
      container[name] = instance;
    }
    return instance;
  }

  // viewi/core/component/makeGlobalMethod.ts
  function makeGlobalMethod(method, typeName) {
    const instance = resolve(typeName);
    return function() {
      return instance[method].apply(instance, arguments);
    };
  }

  // viewi/core/component/makeGlobal.ts
  function makeGlobal() {
    for (let key in componentsMeta.globals) {
      BaseComponent.prototype[key] = function() {
        BaseComponent.prototype[key] = makeGlobalMethod(key, componentsMeta.globals[key]);
        return BaseComponent.prototype[key].apply(null, arguments);
      };
    }
  }

  // viewi/core/di/delay.ts
  var delayedQueue = {};
  var delay = {
    postpone: function(name, callback) {
      delayedQueue[name] = callback;
    },
    ready: function(name) {
      if (!(name in delayedQueue)) {
        throw new Error("There is no postponed action for " + name);
      }
      delayedQueue[name]();
      delete delayedQueue[name];
    }
  };

  // viewi/core/anchor/anchors.ts
  var anchors = {};

  // viewi/core/http/injectScript.ts
  function injectScript(url) {
    const head = document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
  }

  // viewi/core/lifecycle/dispose.ts
  function dispose(scope) {
    if (scope.keep)
      return;
    for (let reactivityIndex in scope.track) {
      const reactivityItem = scope.track[reactivityIndex];
      delete scope.instance.$$r[reactivityItem.path][reactivityItem.id];
    }
    scope.track = [];
    if (scope.children) {
      for (let i in scope.children) {
        dispose(scope.children[i]);
      }
      scope.children = {};
    }
    if (scope.main) {
      for (let i = 0; i < scope.instance.$$p.length; i++) {
        const trackGroup = scope.instance.$$p[i];
        delete trackGroup[1].$$r[trackGroup[0]];
      }
      const instance = scope.instance;
      if (instance.destroy) {
        instance.destroy();
      }
    }
    if (scope.parent) {
      delete scope.parent.children[scope.id];
      delete scope.parent;
    }
  }

  // viewi/core/reactivity/handlers/getComponentModelHandler.ts
  function getComponentModelHandler(instance, setter) {
    return function(event) {
      setter(instance, event);
    };
  }

  // viewi/core/component/reserverProps.ts
  var ReserverProps = {
    _props: true,
    $_callbacks: true,
    _refs: true,
    _slots: true,
    _element: true,
    $$t: true,
    $$r: true,
    $: true,
    $$p: true,
    _name: true,
    emitEvent: true,
    _provides: true,
    _parent: true
  };

  // viewi/core/reactivity/makeProxy.ts
  var reactiveId = 0;
  var queue = {};
  var timeoutId = 0;
  function executeQueue() {
    timeoutId = 0;
    const currentQueue = queue;
    queue = {};
    for (let uid in currentQueue) {
      const callbackFunc = currentQueue[uid];
      try {
        callbackFunc[0].apply(null, callbackFunc[1]);
      } catch (err) {
        console.error(err);
      }
    }
  }
  function schedule(path, i, callbackFunc) {
    queue[path + "-" + i] = callbackFunc;
    if (timeoutId === 0) {
      timeoutId = setTimeout(executeQueue, 0);
    }
  }
  function activateTarget(component, mainPath, prop, target) {
    let val = target[prop];
    if (!Object.getOwnPropertyDescriptor(target, prop)?.set) {
      Object.defineProperty(target, prop, {
        enumerable: true,
        configurable: true,
        get: function() {
          return val;
        },
        set: function(value) {
          const react = val !== value;
          val = value;
          deepProxy(mainPath, component, val);
          if (react) {
            for (let id in target.$$r) {
              const path = target.$$r[id][0];
              const component2 = target.$$r[id][1];
              if (path in component2.$$r) {
                for (let i in component2.$$r[path]) {
                  const callbackFunc = component2.$$r[path][i];
                  schedule(path, i, callbackFunc);
                }
              }
            }
          }
        }
      });
      deepProxy(mainPath, component, val);
    }
  }
  function deepProxy(prop, component, targetObject) {
    if (!(prop in ReserverProps)) {
      if (Array.isArray(targetObject)) {
        for (let i = 0; i < targetObject.length; i++) {
          deepProxy(prop, component, targetObject[i]);
        }
      } else if (targetObject !== null && typeof targetObject === "object" && typeof targetObject !== "function" && !(targetObject instanceof EventTarget)) {
        if (!("$$r" in targetObject)) {
          Object.defineProperty(targetObject, "$$r", {
            enumerable: false,
            writable: true,
            value: {}
          });
        }
        let keys = Object.keys(targetObject);
        for (let i = 0; i < keys.length; i++) {
          const valueProp = keys[i];
          if (!(valueProp in ReserverProps)) {
            activateTarget(component, prop, valueProp, targetObject);
          }
        }
        const trackerId = ++reactiveId + "";
        targetObject.$$r[trackerId] = [prop, component];
        component.$$p.push([trackerId, targetObject]);
      }
    }
  }
  function defineReactive(component, prop) {
    let val = component[prop];
    deepProxy(prop, component, val);
    Object.defineProperty(component, prop, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(value) {
        const react = val !== value;
        val = value;
        deepProxy(prop, component, val);
        if (react && prop in component.$$r) {
          for (let i in component.$$r[prop]) {
            const callbackFunc = component.$$r[prop][i];
            schedule(prop, i, callbackFunc);
          }
        }
      }
    });
  }
  function makeProxy(component) {
    let keys = Object.keys(component);
    for (let i = 0; i < keys.length; i++) {
      const prop = keys[i];
      if (!(prop in ReserverProps)) {
        defineReactive(component, prop);
      }
    }
    return component;
  }

  // viewi/core/anchor/getAnchor.ts
  var anchorId = 0;
  function getAnchor(target) {
    if (!target.__aid) {
      target.__aid = ++anchorId;
      anchors[target.__aid] = { current: -1, target, invalid: [], added: 0 };
    }
    return anchors[target.__aid];
  }

  // viewi/core/hydrate/hydrateComment.ts
  function hydrateComment(target, content) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    for (let i = anchor.current + 1; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 8) {
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        return potentialNode;
      }
      invalid.push(i);
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    console.log("Hydrate comment not found", content);
    const element = document.createComment(content);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(element, target.childNodes[anchor.current]) : target.appendChild(element);
  }

  // viewi/core/hydrate/hydrateTag.ts
  var specialTags = { body: true, head: true, html: true };
  function hydrateTag(target, tag) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    for (let i = anchor.current + 1; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 1 && potentialNode.nodeName.toLowerCase() === tag.toLowerCase()) {
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        return potentialNode;
      }
      invalid.push(i);
    }
    if (tag in specialTags) {
      const nodes = document.getElementsByTagName(tag);
      if (nodes.length > 0) {
        anchor.invalid = [];
        return nodes[0];
      }
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    console.warn("Hydrate not found", tag);
    const element = document.createElement(tag);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(element, target.childNodes[anchor.current]) : target.appendChild(element);
  }

  // viewi/core/render/renderText.ts
  function renderText(instance, node, textNode, scope) {
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
    textNode.nodeValue !== content && (textNode.nodeValue = content);
  }

  // viewi/core/hydrate/hydrateText.ts
  function hydrateText(target, instance, node, scope) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    const start = anchor.current > -1 ? anchor.current : anchor.current + 1;
    for (let i = start; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 3) {
        if (i === anchor.current) {
          break;
        }
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        renderText(instance, node, potentialNode, scope);
        return potentialNode;
      }
      i !== anchor.current && invalid.push(i);
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    const textNode = document.createTextNode("");
    renderText(instance, node, textNode, scope);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(textNode, target.childNodes[anchor.current]) : target.appendChild(textNode);
  }

  // viewi/core/helpers/isSvg.ts
  var svgMap = {};
  var svgTagsString = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var svgTagsList = svgTagsString.split(",");
  for (let i = 0; i < svgTagsList.length; i++) {
    svgMap[svgTagsList[i]] = true;
  }
  function isSvg(tag) {
    return tag.toLowerCase() in svgMap;
  }
  var xLinkNs = "http://www.w3.org/1999/xlink";

  // viewi/core/render/renderAttributeValue.ts
  function renderAttributeValue(instance, attribute, element, attrName, scope) {
    let valueContent = null;
    if (attribute.children) {
      valueContent = "";
      for (let av = 0; av < attribute.children.length; av++) {
        const attributeValue = attribute.children[av];
        let callArguments = [instance];
        if (scope.arguments) {
          callArguments = callArguments.concat(scope.arguments);
        }
        const childContent = attributeValue.expression ? instance.$$t[attributeValue.code].apply(null, callArguments) : attributeValue.content ?? "";
        valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
      }
    }
    if (attrName.toLowerCase() in componentsMeta.booleanAttributes) {
      if (valueContent === true || valueContent === null) {
        attrName !== element.getAttribute(attrName) && element.setAttribute(attrName, attrName);
      } else {
        element.removeAttribute(attrName);
      }
    } else {
      if (element.isSvg && attrName.startsWith("xlink:")) {
        if (valueContent !== null) {
          valueContent !== element.getAttribute(attrName) && element.setAttributeNS(xLinkNs, attrName, valueContent);
        } else {
          element.removeAttributeNS(xLinkNs, attrName.slice(6, attrName.length));
        }
      } else {
        if (valueContent !== null) {
          valueContent !== element.getAttribute(attrName) && element.setAttribute(attrName, valueContent);
        } else {
          element.removeAttribute(attrName);
        }
      }
    }
  }

  // viewi/core/anchor/createAnchorNode.ts
  var anchorNodeId = 0;
  function nextAnchorNodeId() {
    return ++anchorNodeId;
  }
  function createAnchorNode(target, insert = false, anchor, name) {
    const anchorNode = document.createTextNode("");
    anchorNode._anchor = name ?? "#" + ++anchorNodeId;
    if (anchor) {
      anchor.current++;
    }
    insert || anchor && target.childNodes.length > anchor.current ? (anchor ? target : target.parentElement).insertBefore(anchorNode, anchor ? target.childNodes[anchor.current] : target) : target.appendChild(anchorNode);
    return anchorNode;
  }

  // viewi/core/render/renderForeach.ts
  function renderForeach(instance, node, directive, anchors2, currentArrayScope, localDirectiveMap, scope) {
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const forMeta = directive.children[0];
    const noKey = !!forMeta.forKeyAuto;
    const data = instance.$$t[forMeta.forData].apply(null, callArguments);
    const isNumeric = Array.isArray(data);
    const usedMap = {};
    let positionIndex = -1;
    let moveBefore = anchors2.anchorBegin.nextSibling;
    const nextArrayScope = { data: {} };
    for (let forKey in data) {
      let found = false;
      positionIndex++;
      const dataKey = isNumeric ? +forKey : forKey;
      const dataItem = data[dataKey];
      let foundIndex = -1;
      for (let di in currentArrayScope.data) {
        foundIndex++;
        if (di in usedMap) {
          continue;
        }
        const currentScopeItem = currentArrayScope.data[di];
        if (currentScopeItem.value === dataItem && (noKey || currentScopeItem.key === dataKey)) {
          found = true;
          usedMap[di] = true;
          nextArrayScope.data[dataKey] = currentScopeItem;
          if (foundIndex !== positionIndex && moveBefore !== currentScopeItem.begin) {
            const beginAnchor = currentScopeItem.begin;
            let nextToMove = beginAnchor.nextSibling;
            moveBefore.before(beginAnchor);
            while (nextToMove._anchor !== beginAnchor._anchor) {
              nextToMove = nextToMove.nextSibling;
              moveBefore.before(nextToMove.previousSibling);
            }
            moveBefore.before(nextToMove);
          }
          moveBefore = currentScopeItem.end.nextSibling;
          break;
        }
      }
      if (!found) {
        const scopeId = ++scope.counter;
        const nextScope = {
          id: scopeId,
          iteration: scope.iteration,
          why: "forItem",
          instance,
          lastComponent: scope.lastComponent,
          arguments: [...scope.arguments],
          map: { ...scope.map },
          track: [],
          parent: scope,
          children: {},
          counter: 0
        };
        if (scope.refs) {
          nextScope.refs = scope.refs;
        }
        scope.children[scopeId] = nextScope;
        nextScope.map[directive.children[0].forKey] = nextScope.arguments.length;
        nextScope.arguments.push(dataKey);
        nextScope.map[directive.children[0].forItem] = nextScope.arguments.length;
        nextScope.arguments.push(dataItem);
        const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
        const itemBeginAnchor = createAnchorNode(moveBefore, true, void 0, "b" /* BeginAnchor */ + nextAnchorNodeId());
        render(moveBefore, instance, [node], nextScope, nextDirectives, false, true);
        const itemEndAnchor = createAnchorNode(moveBefore, true, void 0, itemBeginAnchor._anchor);
        moveBefore = itemEndAnchor.nextSibling;
        nextArrayScope.data[dataKey] = {
          key: dataKey,
          value: dataItem,
          begin: itemBeginAnchor,
          end: itemEndAnchor,
          scope: nextScope
        };
      }
    }
    for (let di in currentArrayScope.data) {
      if (!(di in usedMap)) {
        const endAnchor = currentArrayScope.data[di].end;
        while (endAnchor.previousSibling._anchor !== endAnchor._anchor) {
          endAnchor.previousSibling.remove();
        }
        currentArrayScope.data[di].begin.remove();
        endAnchor.remove();
        dispose(currentArrayScope.data[di].scope);
        delete currentArrayScope.data[di];
      }
    }
    currentArrayScope.data = nextArrayScope.data;
  }

  // viewi/core/render/renderIf.ts
  function renderIf(instance, node, scopeContainer, directive, ifConditions, localDirectiveMap, index) {
    let nextValue = true;
    for (let i = 0; i < index; i++) {
      nextValue = nextValue && !ifConditions.values[i];
    }
    const scope = scopeContainer.scope.parent;
    if (directive.children) {
      let callArguments = [instance];
      if (scope.arguments) {
        callArguments = callArguments.concat(scope.arguments);
      }
      nextValue = nextValue && !!instance.$$t[directive.children[0].code].apply(null, callArguments);
    }
    const anchorNode = scopeContainer.anchorNode;
    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
    if (ifConditions.values[index] !== nextValue) {
      ifConditions.values[index] = nextValue;
      if (nextValue) {
        const scopeId = ++scope.counter;
        const nextScope = {
          id: scopeId,
          iteration: scope.iteration,
          why: index === 0 ? "if" : directive.children ? "elseif" : "else",
          instance,
          lastComponent: scope.lastComponent,
          arguments: [...scope.arguments],
          map: { ...scope.map },
          track: [],
          parent: scope,
          children: {},
          counter: 0,
          slots: scope.slots
        };
        if (scope.refs) {
          nextScope.refs = scope.refs;
        }
        scopeContainer.scope = nextScope;
        scope.children[scopeId] = nextScope;
        render(anchorNode, instance, [node], nextScope, nextDirectives, false, true);
      } else {
        dispose(scopeContainer.scope);
        scopeContainer.scope = {
          id: -1,
          iteration: scope.iteration,
          why: "if",
          instance,
          lastComponent: scope.lastComponent,
          arguments: [],
          map: {},
          track: [],
          parent: scope,
          children: {},
          counter: 0
        };
        while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
          anchorNode.previousSibling.remove();
        }
      }
    }
  }

  // viewi/core/reactivity/handlers/updateComment.ts
  function updateComment(instance, node, commentNode) {
    const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
    commentNode.nodeValue !== content && (commentNode.nodeValue = content);
  }

  // viewi/core/reactivity/track.ts
  var trackingId = 0;
  function track(instance, trackingPath, scope, action) {
    if (!instance.$$r[trackingPath]) {
      instance.$$r[trackingPath] = {};
    }
    const trackId = ++trackingId;
    scope.track.push({ id: trackId, path: trackingPath });
    instance.$$r[trackingPath][trackId] = action;
  }

  // viewi/core/node/unpack.ts
  function unpack(item) {
    let nodeType = "value";
    switch (item.t) {
      case "t": {
        nodeType = "tag";
        break;
      }
      case "a": {
        nodeType = "attr";
        break;
      }
      case void 0:
      case "v": {
        nodeType = "value";
        break;
      }
      case "c": {
        nodeType = "component";
        break;
      }
      case "x": {
        nodeType = "text";
        break;
      }
      case "m": {
        nodeType = "comment";
        break;
      }
      case "d": {
        nodeType = "doctype";
        break;
      }
      case "r": {
        nodeType = "root";
        if (item.h && item.h[0].t === "x" && item.h[0].c?.substring(0, 9) === "<!DOCTYPE") {
          item.h[0].t = "d";
        }
        break;
      }
      default:
        throw new Error("Type " + item.t + " is not defined in build");
    }
    item.type = nodeType;
    delete item.t;
    if (item.c) {
      item.content = item.c;
      delete item.c;
    }
    if (item.e) {
      item.expression = item.e;
      delete item.e;
    }
    if (item.a) {
      item.attributes = item.a;
      delete item.a;
      for (let i in item.attributes) {
        unpack(item.attributes[i]);
      }
    }
    if (item.i) {
      item.directives = item.i;
      delete item.i;
      for (let i in item.directives) {
        unpack(item.directives[i]);
      }
    }
    if (item.h) {
      item.children = item.h;
      delete item.h;
      for (let i in item.children) {
        unpack(item.children[i]);
      }
    }
    ;
  }

  // viewi/core/component/isComponent.ts
  function isComponent(name) {
    return name in componentsMeta.list;
  }

  // viewi/core/render/renderDynamic.ts
  function renderDynamic(instance, node, scopeContainer) {
    const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
    const componentTag = node.type === "component" || node.expression && isComponent(content);
    const anchorNode = scopeContainer.anchorNode;
    const scope = scopeContainer.scope.parent;
    dispose(scopeContainer.scope);
    while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
      anchorNode.previousSibling.remove();
    }
    const scopeId = ++scope.counter;
    const nextScope = {
      id: scopeId,
      iteration: scope.iteration,
      why: "dynamic",
      arguments: [...scope.arguments],
      map: { ...scope.map },
      track: [],
      instance,
      lastComponent: scope.lastComponent,
      parent: scope,
      children: {},
      counter: 0,
      slots: scope.slots
    };
    if (scope.refs) {
      nextScope.refs = scope.refs;
    }
    scopeContainer.scope = nextScope;
    scope.children[scopeId] = nextScope;
    if (componentTag) {
      const slots = {};
      if (node.slots) {
        const scopeId2 = ++nextScope.counter;
        const slotScope = {
          id: scopeId2,
          iteration: scope.iteration,
          why: "slot",
          arguments: [...scope.arguments],
          map: { ...scope.map },
          track: [],
          instance,
          lastComponent: scope.lastComponent,
          parent: nextScope,
          children: {},
          counter: 0,
          slots: scope.slots
        };
        for (let slotName in node.slots) {
          slots[slotName] = {
            node: node.slots[slotName],
            scope: slotScope
          };
        }
      }
      renderComponent(anchorNode, content, { attributes: node.attributes, scope }, slots, false, true);
      return;
    } else {
      const element = anchorNode.parentElement.insertBefore(document.createElement(content), anchorNode);
      if (node.attributes) {
        for (let a in node.attributes) {
          const attribute = node.attributes[a];
          const attrName = attribute.expression ? instance.$$t[attribute.code](instance) : attribute.content ?? "";
          if (attrName[0] === "(") {
            const eventName = attrName.substring(1, attrName.length - 1);
            if (attribute.children) {
              const eventHandler = instance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code](instance);
              element.addEventListener(eventName, eventHandler);
            }
          } else {
            renderAttributeValue(instance, attribute, element, attrName, nextScope);
            let valueSubs = [];
            if (attribute.children) {
              for (let av in attribute.children) {
                const attributeValue = attribute.children[av];
                if (attributeValue.subs) {
                  valueSubs = valueSubs.concat(attributeValue.subs);
                }
              }
            }
            if (valueSubs) {
              for (let subI in valueSubs) {
                const trackingPath = valueSubs[subI];
                track(instance, trackingPath, nextScope, [renderAttributeValue, [instance, attribute, element, attrName, nextScope]]);
              }
            }
          }
        }
      }
      if (node.children) {
        render(element, instance, node.children, nextScope, void 0, false, false);
      }
    }
  }

  // viewi/core/render/renderRaw.ts
  function renderRaw(instance, node, scope, anchorNode) {
    while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
      anchorNode.previousSibling.remove();
    }
    const parentTagNode = anchorNode.parentElement;
    const vdom = document.createElement(parentTagNode.nodeName);
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
    vdom.innerHTML = content;
    const rawNodes = Array.prototype.slice.call(vdom.childNodes);
    for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
      const rawNode = rawNodes[rawNodeI];
      parentTagNode.insertBefore(rawNode, anchorNode);
    }
  }

  // viewi/core/reactivity/handlers/getModelHandler.ts
  function getModelHandler(instance, options) {
    return function(event) {
      if (options.inputType === "checkbox") {
        const currentValue = options.getter(instance);
        const inputValue = event.target.value;
        if (Array.isArray(currentValue)) {
          const newValue = currentValue.slice();
          const valuePosition = newValue.indexOf(inputValue);
          if (valuePosition === -1) {
            if (event.target.checked) {
              newValue.push(inputValue);
            }
          } else {
            if (!event.target.checked) {
              newValue.splice(valuePosition, 1);
            }
          }
          options.setter(instance, newValue);
        } else {
          options.setter(instance, event.target.checked);
        }
      } else if (options.inputType === "radio") {
        const inputValue = event.target.value;
        options.setter(instance, inputValue);
      } else if (options.isMultiple || event.target.multiple) {
        const inputOptions = event.target.options;
        const newValue = [];
        for (let i = 0; i < inputOptions.length; i++) {
          const currentOption = inputOptions[i];
          if (currentOption.selected) {
            newValue.push(currentOption.value);
          }
        }
        options.setter(instance, newValue);
      } else {
        options.setter(instance, event.target.value);
      }
    };
  }

  // viewi/core/reactivity/handlers/updateModelValue.ts
  function updateModelValue(target, instance, options) {
    if (options.inputType === "checkbox") {
      const currentValue = options.getter(instance);
      if (Array.isArray(currentValue)) {
        const inputValue = target.value;
        const valuePosition = currentValue.indexOf(inputValue);
        if (valuePosition === -1) {
          target.removeAttribute("checked");
          target.checked = false;
        } else {
          target.setAttribute("checked", "checked");
          target.checked = true;
        }
      } else {
        if (currentValue) {
          target.setAttribute("checked", "checked");
          target.checked = true;
        } else {
          target.removeAttribute("checked");
          target.checked = false;
        }
      }
    } else if (options.inputType === "radio") {
      const currentValue = options.getter(instance);
      const inputValue = target.value;
      if (currentValue === inputValue) {
        target.setAttribute("checked", "checked");
        target.checked = true;
      } else {
        target.removeAttribute("checked");
        target.checked = false;
      }
    } else if (options.isMultiple || target.multiple) {
      const inputOptions = target.options;
      const currentValue = options.getter(instance);
      for (let i = 0; i < inputOptions.length; i++) {
        const currentOption = inputOptions[i];
        const index = currentValue.indexOf(currentOption.value);
        if (index === -1) {
          currentOption.selected = false;
        } else {
          currentOption.selected = true;
        }
      }
    } else {
      target.value = options.getter(instance);
    }
  }

  // viewi/core/helpers/svgNameSpace.ts
  var svgNameSpace = "http://www.w3.org/2000/svg";

  // viewi/core/hydrate/hydrateRaw.ts
  function hydrateRaw(vdom, anchor, target) {
    if (vdom.childNodes.length > 0) {
      const invalid = [];
      const rawNodes = Array.prototype.slice.call(vdom.childNodes);
      for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
        const rawNode = rawNodes[rawNodeI];
        const rawNodeType = rawNode.nodeType;
        if (rawNodeType === 3) {
          const currentTargetNode = target.childNodes[anchor.current];
          if (currentTargetNode && currentTargetNode.nodeType === rawNodeType) {
            currentTargetNode.nodeValue = rawNode.nodeValue;
          } else {
            anchor.added++;
            target.childNodes.length > anchor.current && invalid.push(anchor.current);
            target.childNodes.length > anchor.current + 1 ? target.insertBefore(rawNode, target.childNodes[anchor.current + 1]) : target.appendChild(rawNode);
            anchor.current++;
          }
        } else {
          const currentTargetNode = target.childNodes[anchor.current];
          if (!currentTargetNode || currentTargetNode.nodeType !== rawNodeType || rawNodeType === 1 && currentTargetNode.nodeName !== rawNode.nodeName) {
            anchor.added++;
            target.childNodes.length > anchor.current && invalid.push(anchor.current);
            target.childNodes.length > anchor.current + 1 ? target.insertBefore(rawNode, target.childNodes[anchor.current + 1]) : target.appendChild(rawNode);
            anchor.current++;
          } else if (rawNodeType === 1) {
            if (currentTargetNode.nodeName !== rawNode.nodeName || currentTargetNode.outerHTML !== rawNode.outerHTML) {
              const keepKey = currentTargetNode.getAttribute("data-keep");
              if (!keepKey || keepKey !== rawNode.getAttribute("data-keep")) {
                currentTargetNode.outerHTML = rawNode.outerHTML;
              }
            }
          }
        }
        anchor.current++;
      }
      if (invalid.length > 0) {
        anchor.invalid = anchor.invalid.concat(invalid);
      }
    }
  }

  // viewi/core/render/render.ts
  function render(target, instance, nodes, scope, directives, hydrate = true, insert = false) {
    let ifConditions = null;
    let nextInsert = false;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let element = target;
      let breakAndContinue = false;
      let withAttributes = false;
      let childScope = scope;
      switch (node.type) {
        case "tag":
        case "component": {
          if (node.directives) {
            const localDirectiveMap = directives || { map: {}, storage: {} };
            let callArguments = [instance];
            if (scope.arguments) {
              callArguments = callArguments.concat(scope.arguments);
            }
            for (let d = 0; d < node.directives.length; d++) {
              const directive = node.directives[d];
              if (d in localDirectiveMap.map) {
                continue;
              }
              localDirectiveMap.map[d] = true;
              switch (directive.content) {
                case "if": {
                  ifConditions = { values: [], index: 0, subs: [] };
                  const nextValue = !!instance.$$t[directive.children[0].code].apply(null, callArguments);
                  ifConditions.values.push(nextValue);
                  const anchor2 = hydrate ? getAnchor(target) : void 0;
                  const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                  const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                  const scopeId = ++scope.counter;
                  const nextScope2 = {
                    id: scopeId,
                    iteration: scope.iteration,
                    why: "if",
                    arguments: scope.arguments,
                    map: scope.map,
                    instance,
                    lastComponent: scope.lastComponent,
                    track: [],
                    parent: scope,
                    children: {},
                    counter: 0,
                    slots: scope.slots
                  };
                  if (scope.refs) {
                    nextScope2.refs = scope.refs;
                  }
                  scope.children[scopeId] = nextScope2;
                  if (nextValue) {
                    render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                  }
                  const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                  if (directive.children[0].subs) {
                    for (let subI in directive.children[0].subs) {
                      const trackingPath = directive.children[0].subs[subI];
                      ifConditions.subs.push(trackingPath);
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                  }
                  ifConditions.index++;
                  breakAndContinue = true;
                  break;
                }
                case "else-if": {
                  if (ifConditions) {
                    let nextValue = true;
                    for (let ifv = 0; ifv < ifConditions.index; ifv++) {
                      nextValue = nextValue && !ifConditions.values[ifv];
                    }
                    nextValue = nextValue && !ifConditions.values[ifConditions.index - 1] && !!instance.$$t[directive.children[0].code].apply(null, callArguments);
                    ifConditions.values.push(nextValue);
                    const anchor2 = hydrate ? getAnchor(target) : void 0;
                    const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      iteration: scope.iteration,
                      why: "elseif",
                      instance,
                      lastComponent: scope.lastComponent,
                      arguments: scope.arguments,
                      map: scope.map,
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0,
                      slots: scope.slots
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    if (nextValue) {
                      render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                    }
                    const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                    if (directive.children[0].subs) {
                      ifConditions.subs = ifConditions.subs.concat(directive.children[0].subs);
                    }
                    for (let subI in ifConditions.subs) {
                      const trackingPath = ifConditions.subs[subI];
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                    ifConditions.index++;
                    breakAndContinue = true;
                  } else {
                    console.warn("Directive else-if has missing previous if/else-if", directive.content, directive);
                  }
                  break;
                }
                case "else": {
                  if (ifConditions) {
                    let nextValue = true;
                    for (let ifv = 0; ifv < ifConditions.index; ifv++) {
                      nextValue = nextValue && !ifConditions.values[ifv];
                    }
                    ifConditions.values.push(nextValue);
                    const anchor2 = hydrate ? getAnchor(target) : void 0;
                    const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      iteration: scope.iteration,
                      why: "else",
                      instance,
                      lastComponent: scope.lastComponent,
                      arguments: scope.arguments,
                      map: scope.map,
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0,
                      slots: scope.slots
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    if (nextValue) {
                      render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                    }
                    const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                    for (let subI in ifConditions.subs) {
                      const trackingPath = ifConditions.subs[subI];
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                    ifConditions.index++;
                    breakAndContinue = true;
                  } else {
                    console.warn("Directive else has missing previous if/else-if", directive.content, directive);
                  }
                  break;
                }
                case "foreach": {
                  const data = instance.$$t[directive.children[0].forData].apply(null, callArguments);
                  const anchor2 = hydrate ? getAnchor(target) : void 0;
                  const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                  const isNumeric = Array.isArray(data);
                  const dataArrayScope = { data: {} };
                  for (let forKey in data) {
                    const dataKey = isNumeric ? +forKey : forKey;
                    const dataItem = data[dataKey];
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      iteration: scope.iteration,
                      why: "foreach",
                      instance,
                      lastComponent: scope.lastComponent,
                      arguments: [...scope.arguments],
                      map: { ...scope.map },
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0,
                      slots: scope.slots
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    nextScope2.map[directive.children[0].forKey] = nextScope2.arguments.length;
                    nextScope2.arguments.push(dataKey);
                    nextScope2.map[directive.children[0].forItem] = nextScope2.arguments.length;
                    nextScope2.arguments.push(dataItem);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const itemBeginAnchor = createAnchorNode(target, insert, anchor2, "b" /* BeginAnchor */ + nextAnchorNodeId());
                    render(target, instance, [node], nextScope2, nextDirectives, hydrate, insert);
                    const itemEndAnchor = createAnchorNode(target, insert, anchor2, itemBeginAnchor._anchor);
                    dataArrayScope.data[dataKey] = {
                      key: dataKey,
                      value: dataItem,
                      begin: itemBeginAnchor,
                      end: itemEndAnchor,
                      scope: nextScope2
                    };
                  }
                  const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                  if (directive.children[0].subs) {
                    for (let subI in directive.children[0].subs) {
                      const trackingPath = directive.children[0].subs[subI];
                      const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                      track(instance, trackingPath, scope, [
                        renderForeach,
                        [instance, node, directive, { anchorBegin: anchorBegin2, anchorNode }, dataArrayScope, nextDirectives, scope]
                      ]);
                    }
                  }
                  breakAndContinue = true;
                  break;
                }
                default: {
                  console.warn("Directive not implemented", directive.content, directive);
                  breakAndContinue = true;
                  break;
                }
              }
              if (breakAndContinue) {
                break;
              }
            }
            if (breakAndContinue) {
              continue;
            }
          }
          const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
          const isDynamic = node.expression;
          const componentTag = node.type === "component" || node.expression && isComponent(content);
          let anchor;
          let anchorBegin;
          let nextScope = scope;
          if (isDynamic) {
            anchor = hydrate ? getAnchor(target) : void 0;
            anchorBegin = createAnchorNode(target, insert, anchor);
          }
          if (isDynamic) {
            const scopeId = ++scope.counter;
            nextScope = {
              id: scopeId,
              iteration: scope.iteration,
              why: "dynamic",
              arguments: [...scope.arguments],
              map: { ...scope.map },
              track: [],
              instance,
              lastComponent: scope.lastComponent,
              parent: scope,
              children: {},
              counter: 0,
              slots: scope.slots
            };
            if (scope.refs) {
              nextScope.refs = scope.refs;
            }
            scope.children[scopeId] = nextScope;
            childScope = nextScope;
          }
          if (componentTag) {
            const slots = {};
            if (node.slots) {
              const scopeId = ++nextScope.counter;
              const slotScope = {
                id: scopeId,
                iteration: scope.iteration,
                why: "slot",
                arguments: [...scope.arguments],
                map: { ...scope.map },
                track: [],
                parent: nextScope,
                instance,
                lastComponent: { instance: scope.lastComponent.instance },
                children: {},
                counter: 0,
                slots: scope.slots
              };
              if (scope.refs) {
                slotScope.refs = scope.refs;
              }
              nextScope.children[scopeId] = slotScope;
              for (let slotName in node.slots) {
                slots[slotName] = {
                  node: node.slots[slotName],
                  scope: slotScope
                };
              }
            }
            renderComponent(target, content, { attributes: node.attributes, scope, reuse: node.reuse }, slots, hydrate, insert);
          } else {
            if (node.content === "template") {
              nextInsert = insert;
              break;
            }
            if (node.content === "slot") {
              if (!anchor) {
                anchor = hydrate ? getAnchor(target) : void 0;
              }
              nextInsert = insert;
              let slotName = "default";
              if (node.attributes) {
                for (let attrIndex in node.attributes) {
                  if (node.attributes[attrIndex].content === "name") {
                    slotName = node.attributes[attrIndex].children[0].content;
                  }
                }
              }
              const anchorSlotBegin = createAnchorNode(target, insert, anchor);
              if (slotName in scope.slots) {
                const slot = scope.slots[slotName];
                if (!slot.node.unpacked) {
                  unpack(slot.node);
                  slot.node.unpacked = true;
                }
                slot.scope.lastComponent.instance = scope.lastComponent.instance;
                render(element, slot.scope.instance, slot.node.children, slot.scope, void 0, hydrate, nextInsert);
              } else {
                if (node.children) {
                  render(element, instance, node.children, scope, void 0, hydrate, nextInsert);
                }
              }
              const anchorSlotNode = createAnchorNode(target, insert, anchor, anchorSlotBegin._anchor);
              if (scope.instance._name in globalScope.iteration) {
                globalScope.iteration[scope.instance._name].slots[slotName] = anchorSlotNode;
              }
              continue;
            }
            withAttributes = true;
            const isSvgNode = isSvg(content) || target.isSvg;
            element = hydrate ? hydrateTag(target, content) : insert ? target.parentElement.insertBefore(isSvgNode ? document.createElementNS(svgNameSpace, content) : document.createElement(content), target) : target.appendChild(isSvgNode ? document.createElementNS(svgNameSpace, content) : document.createElement(content));
            if (node.first) {
              instance._element = element;
            }
            if (isSvgNode) {
              element.isSvg = true;
            }
          }
          if (isDynamic) {
            const anchorNode = createAnchorNode(target, insert, anchor, anchorBegin._anchor);
            if (node.subs) {
              for (let subI in node.subs) {
                const trackingPath = node.subs[subI];
                track(instance, trackingPath, scope, [renderDynamic, [instance, node, { scope: nextScope, anchorNode }]]);
              }
            }
          }
          if (componentTag) {
            continue;
          }
          break;
        }
        case "text": {
          if (node.raw) {
            const parentTagNode = insert ? target.parentElement : target;
            const vdom = document.createElement(parentTagNode.nodeName);
            let callArguments = [instance];
            if (scope.arguments) {
              callArguments = callArguments.concat(scope.arguments);
            }
            const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
            vdom.innerHTML = content;
            const anchor = hydrate ? getAnchor(target) : void 0;
            const anchorBegin = createAnchorNode(target, insert, anchor);
            if (hydrate) {
              anchor.current++;
              hydrateRaw(vdom, anchor, target);
            } else {
              if (vdom.childNodes.length > 0) {
                const rawNodes = Array.prototype.slice.call(vdom.childNodes);
                for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
                  const rawNode = rawNodes[rawNodeI];
                  insert ? target.parentElement.insertBefore(rawNode, target) : target.appendChild(rawNode);
                }
              }
            }
            const anchorNode = createAnchorNode(target, insert, anchor, anchorBegin._anchor);
            if (node.subs) {
              for (let subI in node.subs) {
                const trackingPath = node.subs[subI];
                track(instance, trackingPath, scope, [renderRaw, [instance, node, scope, anchorNode]]);
              }
            }
            break;
          }
          let textNode;
          if (hydrate) {
            textNode = hydrateText(target, instance, node, scope);
          } else {
            textNode = document.createTextNode("");
            renderText(instance, node, textNode, scope);
            insert ? target.parentElement.insertBefore(textNode, target) : target.appendChild(textNode);
          }
          if (node.subs) {
            for (let subI in node.subs) {
              const trackingPath = node.subs[subI];
              track(instance, trackingPath, scope, [renderText, [instance, node, textNode, scope]]);
            }
          }
          break;
        }
        case "comment": {
          const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
          const commentNode = hydrate ? hydrateComment(target, content) : insert ? target.parentElement.insertBefore(document.createComment(content), target) : target.appendChild(document.createComment(content));
          if (node.subs) {
            for (let subI in node.subs) {
              const trackingPath = node.subs[subI];
              track(instance, trackingPath, scope, [updateComment, [instance, node, commentNode]]);
            }
          }
          break;
        }
        case "doctype": {
          if (hydrate) {
            const anchor = getAnchor(target);
            anchor.current++;
          }
          break;
        }
        default: {
          console.warn("Node type not implemented", node);
          break;
        }
      }
      if (withAttributes) {
        if (node.attributes) {
          const toRemove = hydrate ? element.getAttributeNames() : null;
          const hasMap = hydrate ? {} : null;
          for (let a = 0; a < node.attributes.length; a++) {
            let callArguments = [instance];
            if (scope.arguments) {
              callArguments = callArguments.concat(scope.arguments);
            }
            const attribute = node.attributes[a];
            const attrName = attribute.expression ? instance.$$t[attribute.code].apply(null, callArguments) : attribute.content ?? "";
            if (attrName[0] === "#") {
              const refName = attrName.substring(1, attrName.length);
              instance._refs[refName] = element;
              if (scope.refs && refName in scope.refs) {
                instance[refName] = element;
              }
              continue;
            }
            const isModel = attrName === "model";
            if (attrName[0] === "(") {
              const eventName = attrName.substring(1, attrName.length - 1);
              if (attribute.children) {
                const eventHandler = instance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code].apply(null, callArguments);
                element.addEventListener(eventName, eventHandler);
              }
            } else if (isModel) {
              let inputType = "text";
              element.getAttribute("type") === "checkbox" && (inputType = "checkbox");
              element.getAttribute("type") === "radio" && (inputType = "radio");
              let isMultiple = false;
              if (element.tagName === "SELECT") {
                inputType = "select";
                isMultiple = element.multiple;
              }
              const isOnChange = inputType === "checkbox" || inputType === "radio" || inputType === "select";
              const valueNode = attribute.children[0];
              const getterSetter = instance.$$t[valueNode.code].apply(null, callArguments);
              const eventName = isOnChange ? "change" : "input";
              const inputOptions = {
                getter: getterSetter[0],
                setter: getterSetter[1],
                inputType,
                isMultiple
              };
              setTimeout(() => updateModelValue(element, instance, inputOptions), 0);
              for (let subI in valueNode.subs) {
                const trackingPath = valueNode.subs[subI];
                track(instance, trackingPath, scope, [updateModelValue, [element, instance, inputOptions]]);
              }
              element.addEventListener(eventName, getModelHandler(
                instance,
                inputOptions
              ));
            } else {
              hydrate && (hasMap[attrName] = true);
              renderAttributeValue(instance, attribute, element, attrName, scope);
              let valueSubs = [];
              if (attribute.children) {
                for (let av in attribute.children) {
                  const attributeValue = attribute.children[av];
                  if (attributeValue.subs) {
                    valueSubs = valueSubs.concat(attributeValue.subs);
                  }
                }
              }
              if (valueSubs.length) {
                for (let subI in valueSubs) {
                  const trackingPath = valueSubs[subI];
                  track(instance, trackingPath, scope, [renderAttributeValue, [instance, attribute, element, attrName, scope]]);
                }
              }
            }
          }
          if (hydrate) {
            for (let ai = 0; ai < toRemove.length; ai++) {
              if (!(toRemove[ai] in hasMap)) {
                element.removeAttribute(toRemove[ai]);
              }
            }
          }
        } else if (hydrate) {
          const toRemove = element.getAttributeNames();
          for (let ai = 0; ai < toRemove.length; ai++) {
            element.removeAttribute(toRemove[ai]);
          }
        }
      }
      if (node.children) {
        render(element, instance, node.children, childScope, void 0, hydrate, nextInsert);
      }
    }
  }

  // viewi/core/reactivity/handlers/updateComponentModel.ts
  function updateComponentModel(instance, attrName, getter, parentInstance) {
    instance[attrName] = getter(parentInstance);
  }

  // viewi/core/reactivity/handlers/updateProp.ts
  function updateProp(instance, attribute, props) {
    const parentInstance = props.scope.instance;
    const attrName = attribute.expression ? parentInstance.$$t[attribute.code](parentInstance) : attribute.content ?? "";
    if (attrName[0] === "(") {
    } else {
      let valueContent = null;
      let valueSubs = [];
      if (attribute.children) {
        for (let av = 0; av < attribute.children.length; av++) {
          const attributeValue = attribute.children[av];
          let callArguments = [parentInstance];
          if (props.scope.arguments) {
            callArguments = callArguments.concat(props.scope.arguments);
          }
          const childContent = attributeValue.expression ? parentInstance.$$t[attributeValue.code].apply(null, callArguments) : attributeValue.content ?? "";
          valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
          if (attributeValue.subs) {
            valueSubs = valueSubs.concat(attributeValue.subs);
          }
        }
      }
      if (attrName === "_props" && valueContent) {
        for (let propName in valueContent) {
          instance[propName] = valueContent[propName];
          instance._props[propName] = valueContent[propName];
        }
      } else {
        instance[attrName] = valueContent;
        instance._props[attrName] = valueContent;
      }
    }
  }

  // viewi/core/render/renderComponent.ts
  function renderComponent(target, name, props, slots, hydrate = false, insert = false, params = {}) {
    if (!(name in componentsMeta.list)) {
      throw new Error(`Component ${name} not found.`);
    }
    if (!(name in components)) {
      throw new Error(`Component ${name} not found.`);
    }
    const info = componentsMeta.list[name];
    const root = info.nodes;
    const renderable = target && root;
    const reuseIt = props?.reuse;
    if (renderable) {
      if (!root.unpacked) {
        unpack(root);
        root.unpacked = true;
      }
      const rootChildren = root.children;
      if (rootChildren) {
        rootChildren[0].reuse = (rootChildren[0].type === "component" || rootChildren[0].type === "doctype") && (!props || reuseIt);
        if (reuseIt) {
          globalScope.located[name] = true;
        }
        rootChildren[0].first = true;
      }
    }
    const lastIteration = globalScope.lastIteration;
    const reuse = reuseIt && name in lastIteration;
    if (reuse) {
      const slotHolders = lastIteration[name].slots;
      for (let slotName in slotHolders) {
        const anchorNode = slotHolders[slotName];
        while (anchorNode.previousSibling && anchorNode.previousSibling._anchor !== anchorNode._anchor) {
          anchorNode.previousSibling.remove();
        }
      }
      lastIteration[name].scope.keep = true;
    }
    const instance = reuse ? lastIteration[name].instance : makeProxy(resolve(name, params, false, props?.scope.lastComponent.instance || props?.scope.instance || null));
    if (!reuse) {
      if (info.hooks && info.hooks.init) {
        instance.init();
      }
    }
    const inlineExpressions = name + "_x";
    if (!reuse && inlineExpressions in components) {
      instance.$$t = components[inlineExpressions];
    }
    const scopeId = props ? ++props.scope.counter : 0;
    const scope = reuse ? lastIteration[name].scope : {
      id: scopeId,
      iteration: props ? props.scope.iteration : ++globalScope.iterationId,
      why: name,
      arguments: [],
      // props ? [...props.scope.arguments] : [],
      instance,
      main: true,
      map: props ? { ...props.scope.map } : {},
      track: [],
      children: {},
      lastComponent: { instance },
      //props ? props.scope.lastComponent : null,
      counter: 0,
      parent: props ? props.scope : void 0,
      slots
    };
    props && (props.scope.children[scopeId] = scope);
    if (info.refs) {
      scope.refs = info.refs;
    }
    if (!(globalScope.cancel && globalScope.cancelIterationId === scope.iteration) && info.hooks && info.hooks.mounting) {
      instance.mounting();
    }
    if (props && props.attributes) {
      const parentInstance = props.scope.instance;
      for (let a in props.attributes) {
        let callArguments = [parentInstance];
        if (props.scope.arguments) {
          callArguments = callArguments.concat(props.scope.arguments);
        }
        const attribute = props.attributes[a];
        const attrName = attribute.expression ? parentInstance.$$t[attribute.code].apply(null, callArguments) : attribute.content ?? "";
        if (attrName[0] === "(") {
          const eventName = attrName.substring(1, attrName.length - 1);
          if (attribute.children) {
            const eventHandler = parentInstance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code].apply(null, callArguments);
            instance.$_callbacks[eventName] = eventHandler;
          }
        } else if (attrName[0] === "#") {
          const refName = attrName.substring(1, attrName.length);
          parentInstance._refs[refName] = instance;
          if (refName in parentInstance) {
            parentInstance[refName] = instance;
          }
        } else {
          const isModel = attrName === "model";
          let valueContent = null;
          let valueSubs = [];
          if (isModel) {
            const attributeValue = attribute.children[0];
            const getterSetter = parentInstance.$$t[attributeValue.code].apply(null, callArguments);
            valueContent = getterSetter[0](parentInstance);
            instance.$_callbacks[attrName] = getComponentModelHandler(parentInstance, getterSetter[1]);
            for (let subI in attributeValue.subs) {
              const trackingPath = attributeValue.subs[subI];
              track(parentInstance, trackingPath, props.scope, [updateComponentModel, [instance, attrName, getterSetter[0], parentInstance]]);
            }
          } else {
            if (attribute.children) {
              for (let av = 0; av < attribute.children.length; av++) {
                const attributeValue = attribute.children[av];
                let callArguments2 = [parentInstance];
                if (props.scope.arguments) {
                  callArguments2 = callArguments2.concat(props.scope.arguments);
                }
                const childContent = attributeValue.expression ? parentInstance.$$t[attributeValue.code].apply(null, callArguments2) : attributeValue.content ?? "";
                valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
                if (attributeValue.subs) {
                  valueSubs = valueSubs.concat(attributeValue.subs);
                }
              }
            } else {
              valueContent = true;
            }
          }
          if (attrName === "_props" && valueContent) {
            for (let propName in valueContent) {
              instance[propName] = valueContent[propName];
              instance._props[propName] = valueContent[propName];
            }
          } else {
            if (attribute.children?.length === 1 && attribute.children[0].content === "false") {
              valueContent = false;
            }
            instance[attrName] = valueContent;
            instance._props[attrName] = valueContent;
          }
          if (valueSubs) {
            for (let subI in valueSubs) {
              const trackingPath = valueSubs[subI];
              track(parentInstance, trackingPath, props.scope, [updateProp, [instance, attribute, props]]);
            }
          }
        }
      }
    }
    if (!(globalScope.cancel && globalScope.cancelIterationId === scope.iteration) && info.hooks && info.hooks.mounted) {
      instance.mounted();
    }
    if (name in globalScope.located) {
      globalScope.iteration[name] = { instance, scope, slots: {} };
    }
    if (reuse) {
      const slotHolders = lastIteration[name].slots;
      for (let slotName in slotHolders) {
        const anchorNode = slotHolders[slotName];
        if (anchorNode.parentNode && document.body.contains(anchorNode)) {
          if (slots && slotName in slots) {
            const slot = slots[slotName];
            if (!slot.node.unpacked) {
              unpack(slot.node);
              slot.node.unpacked = true;
            }
            render(anchorNode, slot.scope.instance, slot.node.children, slot.scope, void 0, false, true);
          } else {
          }
          globalScope.iteration[name].slots[slotName] = anchorNode;
        }
      }
      let componentName = name;
      while (componentName) {
        const componentInfo = componentsMeta.list[componentName];
        componentName = false;
        const componentRoot = componentInfo.nodes;
        if (componentRoot) {
          const rootChildren = componentRoot.children;
          if (rootChildren) {
            if (rootChildren[0].type === "component" && rootChildren[0].content in lastIteration) {
              globalScope.iteration[rootChildren[0].content] = lastIteration[rootChildren[0].content];
              componentName = rootChildren[0].content;
            }
          }
        }
      }
      return scope;
    }
    for (let i = 0; i < instance.$$watchList.length; i++) {
      const watchItem = instance.$$watchList[i];
      track(instance, watchItem[0], scope, [watchItem[1], []]);
    }
    if (info.renderer) {
      instance.render(target, name, scope, props, hydrate, insert, params);
    }
    if (renderable) {
      const rootChildren = root.children;
      if (rootChildren) {
        render(target, instance, rootChildren, scope, void 0, hydrate, insert);
      }
    }
    if (info.hooks && info.hooks.rendered) {
      setTimeout(function() {
        instance.rendered();
      }, 0);
    }
    return scope;
  }

  // viewi/core/render/renderApp.ts
  var lazyRecords = {};
  function renderApp(name, params, target, onAccept, skipMiddleware) {
    globalScope.cancel = false;
    if (!(name in componentsMeta.list)) {
      throw new Error(`Component ${name} not found.`);
    }
    const info = componentsMeta.list[name];
    if (info.lazy && !(info.lazy in lazyRecords)) {
      const baseName = "viewi" + (resources.name === "default" ? "" : "." + resources.name);
      const scriptUrl = resources.publicPath + baseName + "." + info.lazy + (resources.minify ? ".min" : "") + ".js" + (resources.appendVersion ? "?" + resources.build : "");
      injectScript(scriptUrl);
      delay.postpone(info.lazy, function() {
        lazyRecords[info.lazy] = true;
        renderApp(name, params, target, onAccept, skipMiddleware);
      });
      return;
    }
    const hydrate = globalScope.hydrate;
    const lastScope = globalScope.rootScope;
    if (onAccept) {
      if (lastScope && info.parent !== globalScope.layout) {
        location.href = onAccept.href;
        return;
      }
    }
    if (info.middleware && !skipMiddleware) {
      const total = info.middleware.length;
      let globalAllow = true;
      let current = -1;
      const context = {
        next: function(allow = true) {
          globalAllow = allow;
          current++;
          if (globalAllow && current < total) {
            const middleware = resolve(info.middleware[current]);
            middleware.run(context);
          } else {
            if (globalAllow) {
              renderApp(name, params, target, onAccept, true);
            } else {
            }
          }
        }
      };
      context.next(true);
      return;
    }
    if (onAccept) {
      onAccept.func(onAccept.href, onAccept.forward);
    }
    globalScope.layout = info.parent;
    globalScope.lastIteration = globalScope.iteration;
    globalScope.iteration = {};
    globalScope.scopedContainer = {};
    globalScope.located = {};
    globalScope.rootScope = renderComponent(target ?? document, name, void 0, {}, hydrate, false, params);
    globalScope.hydrate = false;
    for (let name2 in globalScope.lastIteration) {
      if (!(name2 in globalScope.iteration)) {
        globalScope.lastIteration[name2].scope.keep = false;
      }
    }
    lastScope && dispose(lastScope);
    if (hydrate) {
      for (let a in anchors) {
        const anchor = anchors[a];
        if (anchor.target.nodeName !== "HEAD" && anchor.target.nodeName !== "BODY") {
          for (let i = anchor.target.childNodes.length - 1; i >= anchor.current + 1; i--) {
            anchor.target.childNodes[i].remove();
          }
        }
        for (let i = anchor.invalid.length - 1; i >= 0; i--) {
          anchor.target.childNodes[anchor.invalid[i]].remove();
        }
      }
    }
  }

  // viewi/core/router/locationScope.ts
  var htmlElementA = document.createElement("a");
  var locationScope = { link: htmlElementA, scrollTo: null };

  // viewi/core/router/handleUrl.ts
  var getPathName = function(href) {
    locationScope.link.href = href;
    return locationScope.link.pathname;
  };
  var onUrlUpdate = {};
  var updateHistory = function(href, forward = true) {
    if (forward) {
      window.history.pushState({ href }, "", href);
    }
    window.scrollTo(0, 0);
    onUrlUpdate.callback?.();
  };
  function handleUrl(href, forward = true) {
    if (href.indexOf("://") !== -1 && href.indexOf(location.origin) !== 0) {
      location.href = href;
      return;
    }
    globalScope.cancel = true;
    globalScope.cancelIterationId = globalScope.iterationId + 1;
    const urlPath = getPathName(href);
    const routeItem = componentsMeta.router.resolve(urlPath);
    if (routeItem == null) {
      throw "Can't resolve route for uri: " + urlPath;
    }
    setTimeout(function() {
      renderApp(routeItem.item.action, routeItem.params, void 0, { func: updateHistory, href, forward });
    }, 0);
  }

  // viewi/core/environment/platform.ts
  var Platform2 = class {
    browser = true;
    server = false;
    constructor() {
    }
    getConfig() {
      return componentsMeta.config;
    }
    redirect(url) {
      handleUrl(url);
    }
    navigateBack() {
      history.back();
    }
    getCurrentUrl() {
      return location.pathname + location.search;
    }
    setResponseStatus(status) {
    }
    getCurrentUrlPath() {
      return location.pathname;
    }
    getQueryParams() {
      return Object.fromEntries(new URLSearchParams(location.search));
    }
    onUrlUpdate(callback) {
      onUrlUpdate.callback = callback;
    }
  };

  // viewi/core/events/resolver.ts
  var Resolver = class {
    onSuccess;
    onError = null;
    onAlways = null;
    result = null;
    lastError = null;
    action;
    constructor(action) {
      this.action = action;
    }
    error(onError) {
      this.onError = onError;
    }
    success(onSuccess) {
      this.onSuccess = onSuccess;
    }
    always(always) {
      this.onAlways = always;
    }
    run() {
      const $this = this;
      this.action(function(result, error) {
        $this.result = result;
        let throwError = false;
        if (error) {
          $this.lastError = error;
          if ($this.onError !== null) {
            $this.onError(error);
          } else {
            throwError = true;
          }
        } else {
          $this.onSuccess($this.result);
        }
        if ($this.onAlways != null) {
          $this.onAlways();
        }
        if (throwError) {
          throw $this.lastError;
        }
      });
    }
    then(onSuccess, onError, always) {
      this.onSuccess = onSuccess;
      if (onError) {
        this.onError = onError;
      }
      if (always) {
        this.onAlways = always;
      }
      this.run();
    }
  };

  // viewi/core/helpers/isBlob.ts
  function isBlob(data) {
    if ("Blob" in window && data instanceof Blob) {
      return true;
    }
    return false;
  }

  // viewi/core/http/response.ts
  var Response = class _Response {
    url;
    status;
    statusText;
    headers = {};
    body = null;
    constructor(url, status, statusText, headers = {}, body = null) {
      this.url = url;
      this.status = status;
      this.statusText = statusText;
      this.headers = headers;
      this.body = body;
    }
    withUrl(url) {
      var clone = this.clone();
      clone.url = url;
      return clone;
    }
    withStatus(status, statusText = null) {
      var clone = this.clone();
      clone.status = status;
      if (statusText !== null) {
        clone.statusText = statusText;
      }
      return clone;
    }
    withHeaders(headers) {
      var clone = this.clone();
      clone.headers = { ...clone.headers, ...headers };
      return clone;
    }
    withHeader(name, value) {
      var clone = this.clone();
      clone.headers[name] = value;
      return clone;
    }
    withBody(body = null) {
      var clone = this.clone();
      clone.body = body;
      return clone;
    }
    ok() {
      return this.status >= 200 && this.status < 300;
    }
    clone() {
      var clone = new _Response(this.url, this.status, this.statusText, this.headers, this.body);
      return clone;
    }
  };

  // viewi/core/http/runRequest.ts
  function runRequest(callback, type, url, data, headers) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        const status = request.status;
        const contentType = request.getResponseHeader("Content-Type");
        const itsJson = contentType && contentType.indexOf("application/json") === 0;
        const raw = request.responseText;
        let content = raw;
        if (itsJson) {
          content = JSON.parse(request.responseText);
        }
        const headers2 = {};
        const headersString = request.getAllResponseHeaders();
        if (headersString) {
          const headersArray = headersString.trim().split(/[\r\n]+/);
          for (let i = 0; i < headersArray.length; i++) {
            const line = headersArray[i];
            const parts = line.split(": ");
            const header = parts.shift();
            if (header) {
              const value = parts.join(": ");
              headers2[header] = value;
            }
          }
          ;
        }
        const response = new Response(url, status, "", headers2, content);
        callback(response);
      }
    };
    const isJson = data !== null && typeof data === "object" && !isBlob(data);
    request.open(type.toUpperCase(), url, true);
    if (isJson) {
      request.setRequestHeader("Content-Type", "application/json");
    }
    if (headers) {
      for (const h in headers) {
        if (Array.isArray(headers[h])) {
          for (let i = 0; i < headers[h].length; i++) {
            request.setRequestHeader(h, headers[h][i]);
          }
        } else {
          request.setRequestHeader(h, headers[h]);
        }
      }
    }
    data !== null ? request.send(isJson ? JSON.stringify(data) : data) : request.send();
  }

  // viewi/core/http/request.ts
  var Request = class _Request {
    url;
    method;
    headers = {};
    body = null;
    isExternal;
    constructor(url, method, headers = {}, body = null) {
      this.url = url;
      this.method = method;
      this.headers = headers;
      this.body = body;
    }
    withMethod(method) {
      var clone = this.clone();
      clone.method = method;
      return clone;
    }
    withUrl(url) {
      var clone = this.clone();
      clone.url = url;
      return clone;
    }
    withHeaders(headers) {
      var clone = this.clone();
      clone.headers = { ...clone.headers, ...headers };
      return clone;
    }
    withHeader(name, value) {
      var clone = this.clone();
      clone.headers[name] = value;
      return clone;
    }
    withBody(body = null) {
      var clone = this.clone();
      clone.body = body;
      return clone;
    }
    clone() {
      var clone = new _Request(this.url, this.method, this.headers, this.body);
      return clone;
    }
    // server-side only, makes no difference on front end
    markAsExternal() {
      return this;
    }
  };

  // viewi/core/http/httpClient.ts
  var interceptResponses = function(response, callback, interceptorInstances) {
    const total = interceptorInstances.length;
    let current = total;
    const lastCall = function(response2, keepGoing) {
      if (keepGoing && response2.status >= 200 && response2.status < 300) {
        callback(response2.body);
      } else {
        callback(void 0, response2);
      }
    };
    const run = function(response2, keepGoing) {
      if (keepGoing) {
        if (current > -1) {
          const interceptor = interceptorInstances[current];
          interceptor.response(response2, responseHandler);
        } else {
          lastCall(response2, keepGoing);
        }
      } else {
        lastCall(response2, keepGoing);
      }
    };
    const responseHandler = {
      next: function(response2) {
        current--;
        run(response2, true);
      },
      reject: function(response2) {
        current--;
        run(response2, false);
      }
    };
    responseHandler.next(response);
  };
  var HttpClient3 = class _HttpClient {
    interceptors = [];
    request(method, url, body, headers) {
      const $this = this;
      const resolver = new Resolver(function(callback) {
        try {
          const state = getScopeState();
          const request = new Request(url, method, headers, body);
          let current = -1;
          const total = $this.interceptors.length;
          const interceptorInstances = [];
          const lastCall = function(request2, keepGoing) {
            if (keepGoing) {
              const requestKey = request2.method + "_" + request2.url + "_" + JSON.stringify(request2.body);
              if (requestKey in state.http) {
                const responseData = JSON.parse(state.http[requestKey]);
                delete state.http[requestKey];
                const response = new Response(request2.url, responseData.status, "OK", {}, responseData.data);
                interceptResponses(response, callback, interceptorInstances);
                return;
              } else {
                runRequest(function(response) {
                  interceptResponses(response, callback, interceptorInstances);
                }, request2.method, request2.url, request2.body, request2.headers);
              }
            } else {
              const response = new Response(request2.url, 0, "Rejected", {}, null);
              interceptResponses(response, callback, interceptorInstances);
            }
          };
          const run = function(request2, keepGoing) {
            if (!keepGoing) {
              lastCall(request2, keepGoing);
              return;
            }
            if (current < total) {
              const interceptor = resolve($this.interceptors[current]);
              interceptorInstances.push(interceptor);
              interceptor.request(request2, requestHandler);
            } else {
              lastCall(request2, keepGoing);
            }
          };
          const requestHandler = {
            next: function(request2) {
              current++;
              run(request2, true);
            },
            reject: function(request2) {
              current++;
              run(request2, false);
            }
          };
          requestHandler.next(request);
        } catch (ex) {
          console.error(ex);
          callback(void 0, ex);
        }
      });
      return resolver;
    }
    get(url, headers) {
      return this.request("get", url, null, headers);
    }
    post(url, body, headers) {
      return this.request("post", url, body, headers);
    }
    put(url, body, headers) {
      return this.request("put", url, body, headers);
    }
    delete(url, body, headers) {
      return this.request("delete", url, body, headers);
    }
    patch(url, body, headers) {
      return this.request("patch", url, body, headers);
    }
    withInterceptor(interceptor) {
      const http = new _HttpClient();
      http.interceptors = [...this.interceptors, interceptor];
      return http;
    }
  };

  // viewi/core/portal/portals.ts
  var portals = {};

  // viewi/core/portal/renderPortal.ts
  function renderPortal(portal, scope, hydrate = false, insert = false) {
    const portalEndMark = document.getElementById("portal_" + portal.to + "_end");
    if (portalEndMark) {
      const portalAnchorCurrent = portals[portal.to].current;
      const renderTarget = insert ? portalEndMark : portalEndMark.parentElement;
      const anchor = hydrate ? getAnchor(renderTarget) : void 0;
      const anchorCurrent = hydrate ? anchor.current : 0;
      const portalPositionIndexBefore = Array.prototype.indexOf.call(renderTarget.childNodes, portalEndMark);
      hydrate && (anchor.current = portalAnchorCurrent);
      let slotName = "default";
      const anchorSlotBegin = createAnchorNode(renderTarget, insert, anchor);
      if (slotName in scope.slots) {
        const slot = scope.slots[slotName];
        if (!slot.node.unpacked) {
          unpack(slot.node);
          slot.node.unpacked = true;
        }
        render(renderTarget, slot.scope.instance, slot.node.children, slot.scope, void 0, hydrate, insert);
      }
      const anchorSlotNode = createAnchorNode(renderTarget, insert, anchor, anchorSlotBegin._anchor);
      if (scope.instance._name in globalScope.iteration) {
        globalScope.iteration[scope.instance._name].slots[slotName] = anchorSlotNode;
      }
      portal.anchorNode = anchorSlotNode;
      if (hydrate) {
        portals[portal.to].current = anchor.current;
        const portalPositionIndexAfter = Array.prototype.indexOf.call(renderTarget.childNodes, portalEndMark);
        anchor.current = anchorCurrent + portalPositionIndexAfter - portalPositionIndexBefore;
      }
    }
  }

  // viewi/core/portal/portal.ts
  var Portal = class extends BaseComponent {
    to;
    name;
    _name = "Portal";
    anchorNode;
    destroy() {
      if (this.to && this.anchorNode && this.anchorNode.previousSibling) {
        while (this.anchorNode.previousSibling._anchor !== this.anchorNode._anchor) {
          this.anchorNode.previousSibling.remove();
        }
        this.anchorNode.previousSibling.remove();
        this.anchorNode.remove();
      }
    }
    render(target, name, scope, props, hydrate = false, insert = false, params = {}) {
      if (this.name) {
        const idEnd = "portal_" + this.name + "_end";
        if (hydrate) {
          const portalEndMark = document.getElementById(idEnd);
          if (portalEndMark) {
            const portalPositionIndex = Array.prototype.indexOf.call(target.childNodes, portalEndMark);
            if (portalPositionIndex > 0) {
              const anchor = getAnchor(target);
              if (!(this.name in portals)) {
                portals[this.name] = {};
              }
              portals[this.name].current = anchor.current + 1;
              anchor.current = portalPositionIndex;
              if (portals[this.name].queue) {
                const queue2 = portals[this.name].queue;
                for (let i = 0; i < queue2.length; i++) {
                  queue2[i][0].apply(null, queue2[i][1]);
                }
                delete portals[this.name].queue;
              }
            }
          }
        } else {
          const idBegin = "portal_" + this.name;
          const portalBeginElement = document.createElement("i");
          const portalEndElement = document.createElement("i");
          portalBeginElement.setAttribute("id", idBegin);
          portalEndElement.setAttribute("id", idEnd);
          const style = "display: none !important;";
          portalBeginElement.setAttribute("style", style);
          portalEndElement.setAttribute("style", style);
          insert ? target.parentElement.insertBefore(portalBeginElement, target) : target.appendChild(portalBeginElement);
          insert ? target.parentElement.insertBefore(portalEndElement, target) : target.appendChild(portalEndElement);
          if (!(this.name in portals)) {
            portals[this.name] = {};
          }
          portals[this.name].current = 0;
        }
      } else if (this.to) {
        if (hydrate) {
          if (this.to in portals && portals[this.to].current) {
            renderPortal(this, scope, hydrate, insert);
          } else {
            const delayedRender = [renderPortal, [this, scope, hydrate, insert]];
            if (this.to in portals) {
              portals[this.to].queue.push(delayedRender);
            } else {
              portals[this.to] = {
                queue: [delayedRender]
              };
            }
          }
        } else {
          renderPortal(this, scope, false, true);
        }
      } else {
        throw new Error("Portal component should have either 'name' or 'to' attribute.");
      }
    }
  };

  // viewi/core/di/setUp.ts
  function setUp(startUpItems) {
    register["BaseComponent"] = BaseComponent;
    factory("HttpClient", HttpClient3, () => new HttpClient3());
    factory("Platform", Platform2, () => new Platform2());
    factory("Portal", Portal, () => new Portal());
    for (let i = 0; i < startUpItems.length; i++) {
      const stratUpInstance = resolve(startUpItems[i]);
      stratUpInstance.setUp();
    }
  }

  // viewi/core/router/watchLinks.ts
  function watchLinks() {
    document.addEventListener("click", function(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (!event.target) {
        console.warn('Can not aquire event target at "watchLinks".');
      }
      const target = event.target;
      let nextTarget = target;
      while (nextTarget.parentElement && nextTarget.tagName !== "A") {
        nextTarget = nextTarget.parentElement;
      }
      if (nextTarget.tagName === "A" && nextTarget.href && nextTarget.href.indexOf(location.origin) === 0 && (nextTarget.target === "_self" || !nextTarget.target)) {
        locationScope.scrollTo = null;
        if (!locationScope.link.hash || locationScope.link.pathname !== location.pathname) {
          event.preventDefault();
          if (locationScope.link.hash) {
            locationScope.scrollTo = locationScope.link.hash;
          }
          handleUrl(nextTarget.href, true);
        }
      }
    }, false);
    window.addEventListener("popstate", function(event) {
      if (event.state)
        handleUrl(event.state.href, false);
      else
        handleUrl(location.href, false);
    });
  }

  // viewi/index.ts
  var ViewiApp = {
    register: {},
    version: resources.version,
    build: resources.build,
    name: resources.name,
    publish(group, importComponents) {
      for (let name in importComponents) {
        if (!(name in components)) {
          const imortItem = importComponents[name];
          if (imortItem._t === "template") {
            componentsMeta.list[imortItem.name] = JSON.parse(imortItem.data);
          } else {
            components[name] = imortItem;
          }
        }
      }
      delay.ready(group);
    }
  };
  window.ViewiApp = window.ViewiApp || {};
  window.ViewiApp[resources.name] = ViewiApp;
  (async () => {
    let data = JSON.parse(templates);
    if (!resources.combine) {
      data = await (await fetch(resources.componentsPath)).json();
    }
    componentsMeta.list = data;
    componentsMeta.router.setRoutes(data._routes);
    componentsMeta.config = data._config;
    componentsMeta.globals = data._globals;
    const booleanArray = data._meta["boolean"].split(",");
    for (let i = 0; i < booleanArray.length; i++) {
      componentsMeta.booleanAttributes[booleanArray[i]] = true;
    }
    setUp(data._startup);
    makeGlobal();
    ViewiApp.register = { ...components, ...register, ...functions };
    watchLinks();
    handleUrl(location.href);
  })();
})();
