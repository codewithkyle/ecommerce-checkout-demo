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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __webpack_require__(1);
class Checkout {
    constructor() {
        this.el = document.body.querySelector('.js-checkout');
        this._sectionsContainer = this.el.querySelector('.js-checkout-section-container');
        this._loginModal = document.body.querySelector('.js-login-modal');
        this._user = {};
        this._step = 0;
        this._sections = [];
        this.init();
    }
    /**
     * Called when the class has be created.
     */
    init() {
        new Account_1.Account(this._loginModal, this);
    }
    manageNextStep() {
        // User moved to the address input step
        if (this._step === 1) {
            (() => __awaiter(this, void 0, void 0, function* () {
                const request = yield fetch(`${window.location.origin}${window.location.pathname}address.html`);
                const response = yield request.text();
                const newSection = document.createElement('section');
                newSection.classList.add('c-checkout_section', 'is-visible');
                newSection.dataset.section = 'Address';
                newSection.innerHTML = response;
                this._sectionsContainer.appendChild(newSection);
                this.el.classList.remove('is-hidden');
                this._loginModal.classList.add('is-hidden');
            }))();
        }
    }
    set(key, value) {
        this._user[key] = value;
    }
    get(key) {
        return this._user[key];
    }
    next() {
        this._step++;
        this.manageNextStep();
    }
}
exports.Checkout = Checkout;
/**
 * IIFE for launching the Checkout prototype.
 */
(() => {
    new Checkout();
})();
//# sourceMappingURL=Checkout.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(modal, checkout) {
        /**
         * Called when the user submits the account login form.
         */
        this.loginFormSubmit = (e) => {
            e.preventDefault();
            console.error('Server login verification is not implemented');
            const email = this._loginForm.querySelector('#loginEmailAddress');
            const password = this._loginForm.querySelector('#loginPassword');
            if (password.value === '1231q2') {
                console.warn('Proceeding with fake information');
                this.checkout.set('emailAddress', email.value);
                this.checkout.next();
            }
            else {
                // Builds a fake error response
                const errorResponse = {
                    0: {
                        inputId: 'loginPassword',
                        errorMessage: 'Incorrect password'
                    }
                };
                this.handleLoginErrors(errorResponse);
            }
        };
        /**
         * Called when an `HMLTInputElement` elements `blur` event is fired.
         */
        this.handleBlur = (e) => {
            const target = e.currentTarget;
            target.parentElement.classList.remove('has-focus');
            if (target.value !== '') {
                target.parentElement.classList.add('has-value');
            }
            else {
                target.parentElement.classList.remove('has-value');
            }
            if (!target.validity.valid) {
                target.parentElement.classList.add('is-invalid');
                const errorEl = target.parentElement.querySelector('.js-error-message');
                errorEl.innerHTML = target.validationMessage;
            }
            else {
                target.parentElement.classList.remove('is-invalid');
            }
        };
        /**
         * Called with an `HTMLInputElement` elements `focus` event is fired.
         */
        this.handleFocus = (e) => {
            const target = e.currentTarget;
            target.parentElement.classList.add('has-focus');
        };
        this.el = modal;
        this.checkout = checkout;
        this._inputs = Array.from(this.el.querySelectorAll('input'));
        this._loginForm = this.el.querySelector('.js-login-form');
        this.init();
    }
    init() {
        this._inputs.forEach((input) => {
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });
        this._loginForm.addEventListener('submit', this.loginFormSubmit);
    }
    ;
    handleLoginErrors(errors) {
        for (let error in errors) {
            const inputEl = this._loginForm.querySelector(`#${errors[error].inputId}`);
            inputEl.parentElement.classList.add('is-invalid');
            const errorEl = inputEl.parentElement.querySelector('.js-error-message');
            errorEl.innerHTML = errors[error].errorMessage;
        }
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map

/***/ })
/******/ ]);