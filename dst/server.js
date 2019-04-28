/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var koa_pug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-pug */ \"koa-pug\");\n/* harmony import */ var koa_pug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_pug__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst WORKDIR = '/workdir';\nconst app = new koa__WEBPACK_IMPORTED_MODULE_1__();\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_2__();\nfunction Character(name, actionPriority, hp, physicalDefence, magicalDefence) {\n    return { name, actionPriority, hp, physicalDefence, magicalDefence, isKnockBack: false };\n}\nconst defaultCharacters = [\n    Character('ジョン', 19, 90, 15, 10),\n    Character('kiwi', 9, 147, 20, 30),\n    Character('カリーナ', 36, 125, 1, 5),\n    Character('抹茶', 22, 91, 1, 5),\n    Character('太郎', 30, 107, 1, 5),\n    Character('パルム', 6, 161, 1, 5),\n];\napp.use(koa_static__WEBPACK_IMPORTED_MODULE_4__(path__WEBPACK_IMPORTED_MODULE_0__[\"join\"](WORKDIR, 'dst')));\nconst pug = new koa_pug__WEBPACK_IMPORTED_MODULE_3__({\n    app: app,\n    viewPath: path__WEBPACK_IMPORTED_MODULE_0__[\"join\"](WORKDIR, 'template'),\n});\npug.use(app);\napp.use((ctx, next) => {\n    console.log(ctx.url);\n    ctx.status = 200;\n    ctx.render('index');\n    return next();\n});\nrouter.get('/test', (ctx, next) => {\n    ctx.body = defaultCharacters;\n    return next();\n});\napp.use(router.routes());\napp.listen(8000);\nconsole.log('Server running at http://localhost:8000/');\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxLQUFLLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxLQUFLLEdBQUcsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFFcEMsTUFBTSxPQUFPLEdBQVcsVUFBVSxDQUFDO0FBRW5DLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUU1QixTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsY0FBc0IsRUFBRSxFQUFVLEVBQUUsZUFBdUIsRUFBRSxjQUFzQjtJQUNoSCxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDN0YsQ0FBQztBQUVELE1BQU0saUJBQWlCLEdBQUc7SUFDdEIsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDaEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDakMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDakMsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNoQixHQUFHLEVBQUUsR0FBRztJQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7Q0FDM0MsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUViLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVwQixPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDOUIsR0FBRyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztJQUM3QixPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUV6QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQyJ9\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-pug":
/*!**************************!*\
  !*** external "koa-pug" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-pug\");\n\n//# sourceURL=webpack:///external_%22koa-pug%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });