(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ProtonLoader.module"] = factory();
	else
		root["ProtonLoader.module"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setupEmitter(pr, body) {
    var emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(pr.rate[0], pr.rate[1]), new Proton.Span(0.1, 0.25));
    emitter.addInitialize(new Proton.Body(body));

    if (pr.mass) {
        emitter.addInitialize(new Proton.Mass(pr.mass));
    }
    if (pr.radius) {
        if (_typeof(pr.radius) === 'object') {
            emitter.addInitialize(new Proton.Radius(pr.radius[0], pr.radius[1]));
        } else {
            emitter.addInitialize(new Proton.Radius(pr.radius));
        }
    }
    if (pr.life) {
        if (_typeof(pr.life) === 'object') {
            emitter.addInitialize(new Proton.Life(pr.life[0], pr.life[1]));
        } else {
            emitter.addInitialize(new Proton.Life(pr.life));
        }
    }
    if (typeof pr.spawn === 'number') {
        emitter.addInitialize(new Proton.Position(new Proton.BoxZone(pr.spawn)));
    } else if (_typeof(pr.spawn) === 'object') {
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(pr.spawn[0], pr.spawn[1])));
    }
    if (pr.velocity) {
        var dir = pr.velocity.direction;
        emitter.addInitialize(new Proton.Velocity(pr.velocity.speed, new Proton.Vector3D(dir[0], dir[1], dir[2]), pr.velocity.variance));
    }

    if (pr.alpha) {
        emitter.addBehaviour(new Proton.Alpha(pr.alpha[0], pr.alpha[1]));
    }
    if (pr.scale) {
        if (_typeof(pr.scale) === 'object') {
            emitter.addBehaviour(new Proton.Scale(pr.scale[0], pr.scale[1]));
        } else {
            emitter.addBehaviour(new Proton.Scale(pr.scale));
        }
    }
    if (pr.colors) {
        if (pr.randomColors) {
            emitter.addBehaviour(new Proton.Color(pr.colors, 'random'));
        } else {
            emitter.addBehaviour(new Proton.Color(new THREE.Color(pr.colors[0]), new THREE.Color(pr.colors[1])));
        }
    }
    emitter.emit();
    return emitter;
}

function setupBody(shape) {
    var body = void 0;
    if (shape.type === 'mesh') {
        return shape.mesh;
    } else if (shape.type === 'sprite') {
        var spriteMap = void 0;
        if (typeof shape.texture === 'string') {
            spriteMap = new THREE.TextureLoader().load(shape.texture);
        } else {
            spriteMap = shape.texture;
        }
        var material = new THREE.SpriteMaterial({
            map: spriteMap,
            color: shape.color || 0xFFFFFF,
            blending: THREE.AdditiveBlending
        });
        body = new THREE.Sprite(material);
    } else {
        var geometry = void 0;
        var _material = new THREE.MeshBasicMaterial({
            color: shape.color || 0xFFFFFF
        });
        if (shape.type === 'sphere') {
            geometry = new THREE.SphereGeometry(shape.radius, shape.segments || 8, shape.segments || 8);
        } else if (shape.type === 'box') {
            geometry = new THREE.BoxGeometry(shape.size, shape.size, shape.size);
        }
        body = new THREE.Mesh(geometry, _material);
    }
    return body;
}

var ProtonCreator = function () {
    function ProtonCreator(Proton, options) {
        _classCallCheck(this, ProtonCreator);

        this.destroyed = false;
        this.container = options.container;
        this.body = setupBody(options.body);
        this.proton = new Proton();

        var props = options.particleProps;
        this.emitter = setupEmitter(props, this.body);
        this.proton.addEmitter(this.emitter);
        this.proton.addRender(new Proton[options.renderType](this.container));
    }

    _createClass(ProtonCreator, [{
        key: 'update',
        value: function update() {
            this.proton.update();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.proton.destroy();
            this.destroyed = true;
        }
    }]);

    return ProtonCreator;
}();

exports.default = ProtonCreator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProtonLoader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProtonCreator = __webpack_require__(0);

var _ProtonCreator2 = _interopRequireDefault(_ProtonCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProtonLoader = exports.ProtonLoader = function () {
    function ProtonLoader(Proton) {
        _classCallCheck(this, ProtonLoader);

        this.Proton = Proton;
        this.particles = [];
    }

    _createClass(ProtonLoader, [{
        key: 'createParticles',
        value: function createParticles(options) {
            var particleSystem = new _ProtonCreator2.default(Proton, options);
            this.particles.push(particleSystem);
            return particleSystem;
        }
    }, {
        key: 'update',
        value: function update() {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                if (this.particles[i].destroyed) {
                    this.particles.splice(i, 1);
                } else {
                    this.particles[i].update();
                }
            }
        }
    }]);

    return ProtonLoader;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=ProtonLoader.module.js.map