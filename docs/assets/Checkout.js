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

Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __webpack_require__(1);
const Address_1 = __webpack_require__(2);
class Checkout {
    constructor() {
        this.el = document.body.querySelector('.js-checkout');
        this.user = {};
        this._sectionsContainer = this.el.querySelector('.js-checkout-section-container');
        this._loginModal = document.body.querySelector('.js-login-modal');
        this._step = 0;
        this._sections = [];
        this._summaryEl = document.body.querySelector('.js-summary');
        this.init();
    }
    /**
     * Called when the class has be created.
     */
    init() {
        new Account_1.Account(this._loginModal, this);
    }
    manageNextStep() {
        console.group();
        console.log(`Moving to step ${this._step}`);
        console.log('Current User Object: ', this.user);
        console.groupEnd();
        // User moved to the address input step
        if (this._step === 1) {
            // Display the sections
            this.el.classList.remove('is-hidden');
            // Display the cart summary
            this._summaryEl.classList.remove('is-hidden');
            // Hide the login modal
            this._loginModal.classList.add('is-hidden');
            // Get the shipping address section
            const shippingAddressSection = this.el.querySelector('[data-section="Shipping Address"]');
            this._sections.push(shippingAddressSection);
            shippingAddressSection.classList.add('is-current-step');
            // Make is visible
            shippingAddressSection.classList.add('is-visible');
            // Start the shipping address logic
            new Address_1.Address(shippingAddressSection, this);
        }
        // User moved to the shipping option selection step
        else if (this._step === 2) {
            // Clear the `is-current-step` class from all sections
            this._sections.forEach((section) => {
                section.classList.remove('is-current-step');
            });
            // Get the shipping address section
            const shippingOptionSection = this.el.querySelector('[data-section="Shipping Options"]');
            this._sections.push(shippingOptionSection);
            shippingOptionSection.classList.add('is-current-step', 'is-visible');
        }
    }
    /**
     * Called when the user is ready progress to the next step.
     */
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(modal, checkout) {
        /**
         * Called when the user is trying to checkout as a guest.
         */
        this.handleGuestCheckout = (e) => {
            // The user is trying to checkout as a guest
            this.checkout.user.createAccount = false;
            this.checkout.user.isGuest = true;
            const nameInput = this._signupForm.querySelector('input#guestName');
            const emailInput = this._signupForm.querySelector('input#guestEmailAddress');
            if (nameInput.validity.valid && emailInput.validity.valid) {
                this.checkout.user.fullName = nameInput.value;
                this.checkout.user.email = emailInput.value;
                this.checkout.next();
            }
        };
        /**
         * Called when the user is trying to checkout with a new account.
         */
        this.handleSignupCheckout = (e) => {
            // The user is trying to checkout with a new account
            this.checkout.user.createAccount = true;
            this.checkout.user.isGuest = true;
            console.warn('Not verifying the email availability with the server');
            const nameInput = this._signupForm.querySelector('input#guestName');
            const emailInput = this._signupForm.querySelector('input#guestEmailAddress');
            if (nameInput.validity.valid && emailInput.validity.valid) {
                this.checkout.user.fullName = nameInput.value;
                this.checkout.user.email = emailInput.value;
                const passwordInput = this._signupForm.querySelector('input#guestPassword');
                if (passwordInput.validity.valid) {
                    const verifyPasswordInput = this._signupForm.querySelector('input#verifyPassword');
                    // Check if the password values match
                    if (passwordInput.value === verifyPasswordInput.value) {
                        this.checkout.user.password = passwordInput.value;
                        this.checkout.next();
                    }
                    else {
                        // If invalid add the `is-invalid` status class
                        verifyPasswordInput.parentElement.classList.add('is-invalid');
                        // Get the error message element
                        const errorEl = verifyPasswordInput.parentElement.querySelector('.js-error-message');
                        // Add the validation message to the error
                        errorEl.innerHTML = 'Passwords don\'t match';
                    }
                }
            }
        };
        /**
         * Called when the `submit` event is fired on the signup form.
         */
        this.signupFormSubmit = (e) => {
            // Prevent the default form submission
            e.preventDefault();
        };
        /**
         * Called when the `submit` event is fired on the login form.
         */
        this.loginFormSubmit = (e) => {
            // Prevent the default form submission
            e.preventDefault();
            // Temp warning, to be removed when the checkout is hooked up to craft
            console.warn('Server login verification is not implemented');
            // Gets the Email and Password inputs
            const email = this._loginForm.querySelector('#loginEmailAddress');
            (() => __awaiter(this, void 0, void 0, function* () {
                const request = yield fetch(`${window.location.origin}${window.location.pathname}responses/success.json`);
                const resonse = yield request.text();
                const user = yield JSON.parse(resonse);
                user.email = email.value;
                user.isGuest = false;
                this.checkout.user = user;
                console.warn('Proceeding with fake user information');
                this.checkout.next();
            }))();
        };
        /**
         * Called when the `blur` event is fired on a input.
         */
        this.handleBlur = (e) => {
            // Get the input that fired the event
            const target = e.currentTarget;
            // Remove the `has-focus` status class
            target.parentElement.classList.remove('has-focus');
            // Check if the value is blank
            if (target.value !== '') {
                // If input has a value add the `has-value` status class
                target.parentElement.classList.add('has-value');
            }
            else {
                // If the input doesn't have a value remove the `has-value` status class
                target.parentElement.classList.remove('has-value');
            }
            // Check if the input is valid
            if (!target.validity.valid) {
                // If invalid add the `is-invalid` status class
                target.parentElement.classList.add('is-invalid');
                // Get the error message element
                const errorEl = target.parentElement.querySelector('.js-error-message');
                // Add the validation message to the error
                errorEl.innerHTML = target.validationMessage;
            }
            else {
                // If valid remove the `is-invalid` status class
                target.parentElement.classList.remove('is-invalid');
            }
        };
        /**
         * Called when the `focus` event is fired on an input.
         */
        this.handleFocus = (e) => {
            // Get the input that the event was fired on
            const target = e.currentTarget;
            // Set the `has-focus` status class
            target.parentElement.classList.add('has-focus');
        };
        this.el = modal;
        this.checkout = checkout;
        this._inputs = Array.from(this.el.querySelectorAll('input'));
        this._loginForm = this.el.querySelector('.js-login-form');
        this._signupForm = this.el.querySelector('.js-signup-form');
        this._guestCheckout = this.el.querySelector('.js-guest-checkout-button');
        this._signupCheckout = this.el.querySelector('.js-signup-checkout-button');
        this.init();
    }
    /**
     * Called when the class is created.
     */
    init() {
        // Loop through all of the inputs
        this._inputs.forEach((input) => {
            // Set the focus and blur event listeners
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });
        // Set the form submit event listener
        this._loginForm.addEventListener('submit', this.loginFormSubmit);
        this._signupForm.addEventListener('submit', this.signupFormSubmit);
        // Set the click events for the signup form buttons
        this._guestCheckout.addEventListener('click', this.handleGuestCheckout);
        this._signupCheckout.addEventListener('click', this.handleSignupCheckout);
    }
    ;
    /**
     * Called when the server couldn't validate the user.
     * Displays custom error messages from the server.
     * @param response - ILoginResponse object
     */
    handleLoginErrors(response) {
        // Loop through all of the custom errors
        for (let i = 0; i < response.errors.length; i++) {
            // Get the `ILoginError` object from the response
            const error = response.errors[i];
            // Get the input element that caused the error
            const inputEl = this._loginForm.querySelector(`#${error.id}`);
            // Add the `is-invalid` status class
            inputEl.parentElement.classList.add('is-invalid');
            // Get the error message element
            const errorEl = inputEl.parentElement.querySelector('.js-error-message');
            // Set the custom error message
            errorEl.innerHTML = error.message;
        }
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const libphonenumber_js_1 = __webpack_require__(3);
class Address {
    constructor(modal, checkout) {
        /**
         * Called when the user clicks the delete button on an address card.
         */
        this.deleteAddress = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const target = e.currentTarget;
            this._cardInLimbo = target.parentElement;
            this._popupModal = document.createElement('div');
            this._popupModal.classList.add('o-checkout-popup');
            document.body.appendChild(this._popupModal);
            const popupMessage = document.createElement('div');
            popupMessage.classList.add('o-checkout-popup_message');
            popupMessage.innerHTML += '<h3>Delete address?</h3>';
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('-delete');
            deleteButton.innerHTML = 'Delete';
            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            popupMessage.appendChild(deleteButton);
            popupMessage.appendChild(cancelButton);
            cancelButton.addEventListener('click', this.cancelDelete);
            deleteButton.addEventListener('click', this.confirmDelete);
            this._popupModal.appendChild(popupMessage);
        };
        this.confirmDelete = (e) => {
            console.warn('Not currently sending card delete action to the server');
            document.body.removeChild(this._popupModal);
            const index = this._addressCards.indexOf(this._cardInLimbo);
            this._addressCards.splice(index, 1);
            this._addressCardsContainer.removeChild(this._cardInLimbo);
            if (this._addressCards.length === 0) {
                const addressModal = this.el.querySelector('.js-modal');
                addressModal.classList.remove('has-addresses');
                this.showForm();
            }
            if (this._revalidate) {
                if (this._addressCards.length) {
                    this._addressCards[0].classList.add('is-selected');
                }
                this.validate();
            }
        };
        this.cancelDelete = (e) => {
            this._cardInLimbo = null;
            document.body.removeChild(this._popupModal);
        };
        /**
         * Called when the user switches their country.
         */
        this.updateCountryCode = (e) => {
            // If the user seletes a country that isn't the current country code
            if (this._countrySelect.value !== '' && this._countryCode !== this._countrySelect.value) {
                // Get the new value
                this._countryCode = this._countrySelect.value;
                // Pass the value to `AsYouType` for the phone number formatter
                // @ts-ignore
                this._phoneFormater = new libphonenumber_js_1.AsYouType(this._countryCode);
            }
        };
        /**
         * Called when the `keyup` event is fired on the `#phoneNumber` input.
         */
        this.liveFormatPhoneNumber = (e) => {
            // Reset the formatter
            this._phoneFormater.reset();
            // Get the current input
            const currentInput = this._phoneNumberInput.value;
            // Format the input using `AsYouType`
            const formattedInput = this._phoneFormater.input(currentInput);
            // Set the value to the new formatted value
            this._phoneNumberInput.value = formattedInput;
        };
        /**
         * Called when the `click` event is fired on this sections continue button.
         */
        this.continueButtonClicked = (e) => {
            this.validate();
        };
        /**
         * Toggles the selected address card.
         */
        this.toggleAddressCard = (e) => {
            // Get the card that the event fired on
            const target = e.currentTarget;
            // Check if the card is selected and needs to be unselected.
            const isOn = target.classList.contains('is-selected');
            // Clear all the `is-selected` status classes
            this._addressCards.forEach((card) => {
                card.classList.remove('is-selected');
            });
            // If the card was unselected, select it
            if (!isOn) {
                target.classList.add('is-selected');
            }
            else if (this._revalidate) {
                this.showForm();
            }
            if (this._revalidate) {
                this.validate();
            }
        };
        /**
         * Don't let the user submit the new address form.
         */
        this.submitNewAddressForm = (e) => {
            e.preventDefault();
        };
        /**
         * Called when the `click` event fires on the "+ Address Line" button.
         */
        this.addNewAddressLine = (e) => {
            e.preventDefault();
            // Update the line number ID
            this._additionalLine++;
            // Create a new div to wrap the line item
            const newAddressLine = document.createElement('div');
            // Apply the checkout input class
            newAddressLine.classList.add('o-checkout-input');
            // Add the new input
            newAddressLine.innerHTML = `<input type="text" name="addressLine${this._additionalLine}" id="addressLine${this._additionalLine}">`;
            // Add the label for the input
            newAddressLine.innerHTML += `<label for="addressLine${this._additionalLine}">Address Line ${this._additionalLine}</label>`;
            // Get the new input
            const newAddressInput = newAddressLine.querySelector('input');
            // Add the input event listeners
            newAddressInput.addEventListener('blur', this.handleBlur);
            newAddressInput.addEventListener('focus', this.handleFocus);
            // Push the input into the inputs array
            this._additionalAddressLineInputs.push(newAddressInput);
            // Append the new input to the form
            this._additionalAddressLinesWrapper.appendChild(newAddressLine);
        };
        /**
         * Called when an `HMLTInputElement` elements `blur` event is fired.
         */
        this.handleBlur = (e) => {
            const target = e.currentTarget;
            // Remove the `has-focus` status class
            target.parentElement.classList.remove('has-focus');
            // Check if the inputs value is empty
            if (target.value !== '') {
                // Value isn't empty, add the `has-value` status class
                target.parentElement.classList.add('has-value');
            }
            else {
                // Value is empty, remove the `has-value` status class
                target.parentElement.classList.remove('has-value');
            }
            // Check if the input is valid
            if (!target.validity.valid) {
                // The input is invalid, add the `is-invalid` status class
                target.parentElement.classList.add('is-invalid');
                // Get the error message element
                const errorEl = target.parentElement.querySelector('.js-error-message');
                // Update the message with the validation error message
                errorEl.innerHTML = target.validationMessage;
            }
            else {
                // The input is valid, remove the `is-invalid` status class
                target.parentElement.classList.remove('is-invalid');
            }
            if (this._revalidate) {
                this.validate();
            }
        };
        /**
         * Called when an inputs `focus` event is fired.
         */
        this.handleFocus = (e) => {
            // Gets the input that the event fired on
            const target = e.currentTarget;
            // Sets the `has-focus` status class
            target.parentElement.classList.add('has-focus');
            // Clear all the `is-selected` status classes from the address cards
            this._addressCards.forEach((card) => {
                card.classList.remove('is-selected');
            });
        };
        this.el = modal;
        this.checkout = checkout;
        this._addressCardsContainer = this.el.querySelector('.js-address-cards');
        this._formWrapper = this.el.querySelector('.js-new-address-form');
        this._addressCards = [];
        this._additionalLine = 0;
        this._additionalAddressLinesWrapper = this.el.querySelector('.js-additional-address-lines');
        this._addAddressLineButton = this.el.querySelector('.js-add-new-address-line');
        this._addressForm = this.el.querySelector('form');
        this._addressFormInputs = Array.from(this.el.querySelectorAll('input'));
        this._addressFormSelects = Array.from(this.el.querySelectorAll('select'));
        this._additionalAddressLineInputs = [];
        this._phoneNumberInput = this.el.querySelector('input#phoneNumber');
        this._countrySelect = this.el.querySelector('select#country');
        this._countryCode = (this._countrySelect.value !== '') ? this._countrySelect.value : 'US';
        // @ts-ignore
        this._phoneFormater = new libphonenumber_js_1.AsYouType(this._countryCode);
        this._continueButton = this.el.querySelector('.js-continue-button');
        this._cardInLimbo = null;
        this._popupModal = null;
        this._revalidate = false;
        this.init();
    }
    /**
     * Called when the class is created.
     */
    init() {
        // Set the custom form submit event listener
        this._addressForm.addEventListener('submit', this.submitNewAddressForm);
        // Check if the user is logged in
        if (!this.checkout.user.isGuest) {
            // Try to create the address cards
            this.createAddressCards();
        }
        else {
            this.showForm();
        }
        // Set the event listener for the "+ Address Line" button
        this._addAddressLineButton.addEventListener('click', this.addNewAddressLine);
        // Loop through all the initial new address form inputs
        this._addressFormInputs.forEach((input) => {
            // Set the blur and focus event listeners
            input.addEventListener('blur', this.handleBlur);
            input.addEventListener('focus', this.handleFocus);
        });
        // Set event listeners for the select elements
        this._addressFormSelects.forEach((select) => {
            select.addEventListener('blur', this.handleBlur);
            select.addEventListener('focus', this.handleFocus);
        });
        // Listen for the continue button click
        this._continueButton.addEventListener('click', this.continueButtonClicked);
        // Handle the change of the selected country
        this._countrySelect.addEventListener('change', this.updateCountryCode);
        // Listen for keyup for live phone number formatting
        this._phoneNumberInput.addEventListener('keyup', this.liveFormatPhoneNumber);
    }
    /**
     * Generate address cards from the `addresses` array returned by the successful login.
     */
    createAddressCards() {
        // Check if the user object has any addresses in the addresses array
        if (this.checkout.user.addresses.length) {
            const addressModal = this.el.querySelector('.js-modal');
            addressModal.classList.add('has-addresses');
            // If the user has saved addresses loop through them
            for (let i = 0; i < this.checkout.user.addresses.length; i++) {
                const address = this.checkout.user.addresses[i];
                // Create a new address card element
                const newAddressCard = document.createElement('div');
                newAddressCard.classList.add('o-address-cards_card', 'js-address-card');
                newAddressCard.dataset.id = `${i}`;
                // Add the static address SVG
                newAddressCard.innerHTML += Address.SVG;
                // Create the unordered list element
                const addressDetails = document.createElement('ul');
                addressDetails.classList.add('o-address-cards_card_details');
                // If the address has a label, use it
                if (address.label) {
                    addressDetails.innerHTML += `<li class="has-highlight">${address.label}</li>`;
                    addressDetails.innerHTML += `<li>${address.fullName}</li>`;
                }
                else {
                    addressDetails.innerHTML += `<li class="has-highlight">${address.fullName}</li>`;
                }
                // Add Address Line 1
                addressDetails.innerHTML += `<li>${address.addressLine1}</li>`;
                // If the address has additional address lines, add them
                if (address.additionalAddressLines.length) {
                    for (let i = 0; i < address.additionalAddressLines.length; i++) {
                        addressDetails.innerHTML += `<li>${address.additionalAddressLines[i]}</li>`;
                    }
                }
                // Add city, state, and zip
                addressDetails.innerHTML += `<li>${address.city}, ${address.state} ${address.zip}</li>`;
                // Add country
                addressDetails.innerHTML += `<li>${address.country}</li>`;
                // Try to parse the phone number
                try {
                    const phoneNumber = libphonenumber_js_1.parsePhoneNumber(address.phoneNumber);
                    addressDetails.innerHTML += `<li>${phoneNumber.formatNational()}</li>`;
                }
                catch (_a) {
                    addressDetails.innerHTML += `<li>${address.phoneNumber}</li>`;
                }
                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = Address.TRASH_SVG;
                deleteButton.addEventListener('click', this.deleteAddress);
                newAddressCard.appendChild(deleteButton);
                // Append the address details to the card
                newAddressCard.appendChild(addressDetails);
                // Append the card to the grid
                this._addressCardsContainer.appendChild(newAddressCard);
                // Push the card into the cards array
                this._addressCards.push(newAddressCard);
                // Give the card the toggle click event listener
                newAddressCard.addEventListener('click', this.toggleAddressCard);
            }
            ;
            const addAddressCard = document.createElement('div');
            addAddressCard.classList.add('o-address-cards_new', 'js-new-address-card');
            addAddressCard.innerHTML = '<span>New Address</span>';
            this._addressCardsContainer.appendChild(addAddressCard);
            addAddressCard.addEventListener('click', () => {
                addAddressCard.classList.add('is-hidden');
                // Show the new address form
                this.showForm();
                // Clear all the `is-selected` status classes from the address cards
                this._addressCards.forEach((card) => {
                    card.classList.remove('is-selected');
                });
            });
        }
        else {
            this.showForm();
        }
    }
    /**
     * Add the `is-visible` class to the form wrapper.
     */
    showForm() {
        const newAddressCard = this.el.querySelector('.js-new-address-card');
        if (newAddressCard) {
            newAddressCard.classList.add('is-hidden');
        }
        this._formWrapper.classList.add('is-visible');
    }
    /**
     * Called when we need to validate the shipping options.
     */
    validate() {
        // Create an empty address object
        let selectedAddress = null;
        // Assume the user isn't using a saved address
        let usingPreviousAddress = false;
        // Check if the user is logged in
        if (!this.checkout.user.isGuest) {
            // Get the selected address card
            const selectedAddressCard = this.el.querySelector('.js-address-card.is-selected');
            // Check if a address card is selected
            if (selectedAddressCard) {
                // Set the selected address details
                selectedAddress = this.checkout.user.addresses[parseInt(selectedAddressCard.dataset.id)];
                usingPreviousAddress = true;
                this._addressFormInputs.forEach((input) => {
                    // Remove invalid status class
                    input.parentElement.classList.remove('is-invalid');
                    // Check if the inputs value is empty
                    if (input.value !== '') {
                        // Value isn't empty, add the `has-value` status class
                        input.parentElement.classList.add('has-value');
                    }
                    else {
                        // Value is empty, remove the `has-value` status class
                        input.parentElement.classList.remove('has-value');
                    }
                });
                this._addressFormSelects.forEach((select) => {
                    // Remove invalid status class
                    select.parentElement.classList.remove('is-invalid');
                    // Check if the inputs value is empty
                    if (select.value !== '') {
                        // Value isn't empty, add the `has-value` status class
                        select.parentElement.classList.add('has-value');
                    }
                    else {
                        // Value is empty, remove the `has-value` status class
                        select.parentElement.classList.remove('has-value');
                    }
                });
            }
        }
        // If we don't have an address try the form
        if (!usingPreviousAddress) {
            // Assume the inputs are valid
            let allInputsAreValid = true;
            // Loop through all of the new address form inputs
            this._addressFormInputs.forEach((input) => {
                // Check if the input is valid
                if (!input.validity.valid) {
                    // We found an invalid input
                    allInputsAreValid = false;
                    // The input is invalid, add the `is-invalid` status class
                    input.parentElement.classList.add('is-invalid');
                    // Get the error message element
                    const errorEl = input.parentElement.querySelector('.js-error-message');
                    // Update the message with the validation error message
                    errorEl.innerHTML = input.validationMessage;
                }
            });
            // Loop through all of the new address form select inputs
            this._addressFormSelects.forEach((select) => {
                // Check if the input is valid
                if (!select.validity.valid) {
                    // We found an invalid input
                    allInputsAreValid = false;
                    // The input is invalid, add the `is-invalid` status class
                    select.parentElement.classList.add('is-invalid');
                    // Get the error message element
                    const errorEl = select.parentElement.querySelector('.js-error-message');
                    // Update the message with the validation error message
                    errorEl.innerHTML = select.validationMessage;
                }
            });
            // If the inputs are valid get the address information
            if (allInputsAreValid) {
                // Get all the form inputs
                const labelInput = this._addressForm.querySelector('input#label');
                const fullName = this._addressForm.querySelector('input#fullName');
                const addressLine1 = this._addressForm.querySelector('input#addressLine1');
                const city = this._addressForm.querySelector('input#city');
                const state = this._addressForm.querySelector('select#state');
                const zip = this._addressForm.querySelector('input#zip');
                const country = this._addressForm.querySelector('select#country');
                const phoneNumber = this._addressForm.querySelector('input#phoneNumber');
                // Get an array of strings based on the additional input values
                const additionalAddressLines = [];
                this._additionalAddressLineInputs.forEach((input) => {
                    if (input.value !== '') {
                        additionalAddressLines.push(input.value);
                    }
                });
                // Build the selected address object
                selectedAddress = {
                    label: labelInput.value,
                    fullName: fullName.value,
                    addressLine1: addressLine1.value,
                    additionalAddressLines: additionalAddressLines,
                    city: city.value,
                    state: state.value,
                    zip: zip.value,
                    country: country.value,
                    phoneNumber: phoneNumber.value
                };
            }
        }
        // Make sure the selected address object isn't null
        if (selectedAddress !== null) {
            this.checkout.user.selectedAddress = selectedAddress;
            if (!this._revalidate) {
                this.checkout.next();
            }
            else {
                console.log('Updated users selected address: ', this.checkout.user.selectedAddress);
            }
        }
        if (!this._revalidate) {
            this._revalidate = true;
        }
    }
}
Address.SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="33.5" viewBox="0 0 23.761 33.5"><g class="cls-1" transform="translate(-38.5 -27)"><path id="Path_10" data-name="Path 10" class="cls-2" d="M46.055,76.082C42.482,77.092,40,79.314,40,81.893c0,3.53,4.648,6.39,10.381,6.39s10.381-2.861,10.381-6.39c0-2.647-2.614-4.918-6.34-5.888" transform="translate(0 -29.284)"/><path id="Path_9" data-name="Path 9" class="cls-3" d="M50.381,27A10.272,10.272,0,0,0,40,37.16c0,3.763,1.3,4.939,8.179,15.738a2.627,2.627,0,0,0,4.4,0c6.885-10.8,8.179-11.976,8.179-15.738A10.272,10.272,0,0,0,50.381,27Zm0,24.553C43.491,40.741,42.6,40.059,42.6,37.16a7.787,7.787,0,0,1,15.571,0C58.166,40.046,57.346,40.622,50.381,51.553ZM46.055,37.16a4.326,4.326,0,1,1,4.325,4.233A4.28,4.28,0,0,1,46.055,37.16Z"/></g></svg>';
Address.NEW_SVG = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-marker-plus" class="svg-inline--fa fa-map-marker-plus fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M192 0C86.4 0 0 86.4 0 192c0 76.8 25.6 99.2 172.8 310.4 4.8 6.4 12 9.6 19.2 9.6 7.2 0 14.4-3.2 19.2-9.6C358.4 291.2 384 268.8 384 192 384 86.4 297.6 0 192 0zm0 446.09c-14.41-20.56-27.51-39.13-39.41-56C58.35 256.48 48 240.2 48 192c0-79.4 64.6-144 144-144s144 64.6 144 144c0 48.2-10.35 64.48-104.59 198.09-11.9 16.87-25 35.44-39.41 56zM272 168h-56v-56c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v56h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v56c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-56h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"></path></svg>';
Address.TRASH_SVG = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>';
exports.Address = Address;
//# sourceMappingURL=Address.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumber", function() { return parsePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberFromString", function() { return parsePhoneNumberFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumber", function() { return parseNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberType", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExampleNumber", function() { return getExampleNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPossibleNumber", function() { return isPossibleNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidNumber", function() { return isValidNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidNumberForRegion", function() { return isValidNumberForRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPhoneNumbers", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearch", function() { return PhoneNumberSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNumbers", function() { return findNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchNumbers", function() { return searchNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberMatcher", function() { return PhoneNumberMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsYouType", function() { return AsYouType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportedCountry", function() { return isSupportedCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtPrefix", function() { return getExtPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRFC3966", function() { return parseRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRFC3966", function() { return formatRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatIncompletePhoneNumber", function() { return formatIncompletePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCode", function() { return getCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPhoneCode", function() { return getPhoneCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPhoneCodeCustom", function() { return getPhoneCodeCustom; });
/* harmony import */ var _metadata_min_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
var _metadata_min_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(4, 1);
/* harmony import */ var _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _es6_parse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _es6_format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);
/* harmony import */ var _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31);
/* harmony import */ var _es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(32);
/* harmony import */ var _es6_validate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33);
/* harmony import */ var _es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34);
/* harmony import */ var _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35);
/* harmony import */ var _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(36);
/* harmony import */ var _es6_findNumbers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42);
/* harmony import */ var _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(46);
/* harmony import */ var _es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(44);
/* harmony import */ var _es6_AsYouType__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(47);
/* harmony import */ var _es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(17);
/* harmony import */ var _es6_metadata__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Metadata", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _es6_RFC3966__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(21);
/* harmony import */ var _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(48);
/* harmony import */ var _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(15);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseIncompletePhoneNumber", function() { return _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberCharacter", function() { return _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_20__["parsePhoneNumberCharacter"]; });

/* harmony import */ var _es6_parseDigits__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DIGITS", function() { return _es6_parseDigits__WEBPACK_IMPORTED_MODULE_21__["DIGITS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseDigits", function() { return _es6_parseDigits__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _es6_ParseError__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _es6_ParseError__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseCustom", function() { return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatCustom", function() { return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidNumberCustom", function() { return _es6_validate__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findPhoneNumbersCustom", function() { return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbersCustom", function() { return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["searchPhoneNumbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearchCustom", function() { return _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNumberTypeCustom", function() { return _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCodeCustom", function() { return _es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsYouTypeCustom", function() { return _es6_AsYouType__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DIGIT_PLACEHOLDER", function() { return _es6_AsYouType__WEBPACK_IMPORTED_MODULE_15__["DIGIT_PLACEHOLDER"]; });

// Deprecated.
// Use `libphonenumber-js/min` or `libphonenumber-js/max` or `libphonenumber-js/core` instead.














// Deprecated















// Deprecated: remove DIGITS export in 2.0.0.
// (it was used in `react-phone-number-input`)



function parsePhoneNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, parameters)
}

function parsePhoneNumberFromString()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__["default"].apply(this, parameters)
}

function parseNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, parameters)
}

// Deprecated: remove `parse()` export in 2.0.0.
// (renamed to `parseNumber()`)
function parse()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, parameters)
}

function formatNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"].apply(this, parameters)
}

// Deprecated: remove `format()` export in 2.0.0.
// (renamed to `formatNumber()`)
function format()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"].apply(this, parameters)
}

function getNumberType()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__["default"].apply(this, parameters)
}

function getExampleNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_6__["default"].apply(this, parameters)
}

function isPossibleNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_7__["default"].apply(this, parameters)
}

function isValidNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_validate__WEBPACK_IMPORTED_MODULE_8__["default"].apply(this, parameters)
}

function isValidNumberForRegion()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_9__["default"].apply(this, parameters)
}

// Deprecated.
function findPhoneNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["default"].apply(this, parameters)
}

// Deprecated.
function searchPhoneNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["searchPhoneNumbers"].apply(this, parameters)
}

// Deprecated.
function PhoneNumberSearch(text, options)
{
	_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"].call(this, text, options, _metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
}

// Deprecated.
PhoneNumberSearch.prototype = Object.create(_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"].prototype, {})
PhoneNumberSearch.prototype.constructor = PhoneNumberSearch

function findNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_findNumbers__WEBPACK_IMPORTED_MODULE_12__["default"].apply(this, parameters)
}

function searchNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_13__["default"].apply(this, parameters)
}

function PhoneNumberMatcher(text, options)
{
	_es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_14__["default"].call(this, text, options, _metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
}

PhoneNumberMatcher.prototype = Object.create(_es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_14__["default"].prototype, {})
PhoneNumberMatcher.prototype.constructor = PhoneNumberMatcher

function AsYouType(country)
{
	_es6_AsYouType__WEBPACK_IMPORTED_MODULE_15__["default"].call(this, country, _metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
}

AsYouType.prototype = Object.create(_es6_AsYouType__WEBPACK_IMPORTED_MODULE_15__["default"].prototype, {})
AsYouType.prototype.constructor = AsYouType

function isSupportedCountry()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_metadata__WEBPACK_IMPORTED_MODULE_17__["isSupportedCountry"].apply(this, parameters)
}

function getExtPrefix()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_metadata__WEBPACK_IMPORTED_MODULE_17__["getExtPrefix"].apply(this, parameters)
}

function parseRFC3966()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_RFC3966__WEBPACK_IMPORTED_MODULE_18__["parseRFC3966"].apply(this, parameters)
}

function formatRFC3966()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_RFC3966__WEBPACK_IMPORTED_MODULE_18__["formatRFC3966"].apply(this, parameters)
}

function formatIncompletePhoneNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
	return _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_19__["default"].apply(this, parameters)
}

// Deprecated: remove this in 2.0.0 and make `custom.js` in ES6
// (the old `custom.js` becomes `custom.commonjs.js`).











function getCountryCallingCode(country)
{
	return Object(_es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_16__["default"])(country, _metadata_min_json__WEBPACK_IMPORTED_MODULE_0__)
}

// `getPhoneCode` name is deprecated, use `getCountryCallingCode` instead.
function getPhoneCode(country)
{
	return getCountryCallingCode(country)
}

// `getPhoneCodeCustom` name is deprecated, use `getCountryCallingCodeCustom` instead.
function getPhoneCodeCustom(country, metadata)
{
	return Object(_es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_16__["default"])(country, metadata)
}

/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = {"version":"1.7.15","country_calling_codes":{"1":["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],"7":["RU","KZ"],"20":["EG"],"27":["ZA"],"30":["GR"],"31":["NL"],"32":["BE"],"33":["FR"],"34":["ES"],"36":["HU"],"39":["IT","VA"],"40":["RO"],"41":["CH"],"43":["AT"],"44":["GB","GG","IM","JE"],"45":["DK"],"46":["SE"],"47":["NO","SJ"],"48":["PL"],"49":["DE"],"51":["PE"],"52":["MX"],"53":["CU"],"54":["AR"],"55":["BR"],"56":["CL"],"57":["CO"],"58":["VE"],"60":["MY"],"61":["AU","CC","CX"],"62":["ID"],"63":["PH"],"64":["NZ"],"65":["SG"],"66":["TH"],"81":["JP"],"82":["KR"],"84":["VN"],"86":["CN"],"90":["TR"],"91":["IN"],"92":["PK"],"93":["AF"],"94":["LK"],"95":["MM"],"98":["IR"],"211":["SS"],"212":["MA","EH"],"213":["DZ"],"216":["TN"],"218":["LY"],"220":["GM"],"221":["SN"],"222":["MR"],"223":["ML"],"224":["GN"],"225":["CI"],"226":["BF"],"227":["NE"],"228":["TG"],"229":["BJ"],"230":["MU"],"231":["LR"],"232":["SL"],"233":["GH"],"234":["NG"],"235":["TD"],"236":["CF"],"237":["CM"],"238":["CV"],"239":["ST"],"240":["GQ"],"241":["GA"],"242":["CG"],"243":["CD"],"244":["AO"],"245":["GW"],"246":["IO"],"247":["AC"],"248":["SC"],"249":["SD"],"250":["RW"],"251":["ET"],"252":["SO"],"253":["DJ"],"254":["KE"],"255":["TZ"],"256":["UG"],"257":["BI"],"258":["MZ"],"260":["ZM"],"261":["MG"],"262":["RE","YT"],"263":["ZW"],"264":["NA"],"265":["MW"],"266":["LS"],"267":["BW"],"268":["SZ"],"269":["KM"],"290":["SH","TA"],"291":["ER"],"297":["AW"],"298":["FO"],"299":["GL"],"350":["GI"],"351":["PT"],"352":["LU"],"353":["IE"],"354":["IS"],"355":["AL"],"356":["MT"],"357":["CY"],"358":["FI","AX"],"359":["BG"],"370":["LT"],"371":["LV"],"372":["EE"],"373":["MD"],"374":["AM"],"375":["BY"],"376":["AD"],"377":["MC"],"378":["SM"],"380":["UA"],"381":["RS"],"382":["ME"],"383":["XK"],"385":["HR"],"386":["SI"],"387":["BA"],"389":["MK"],"420":["CZ"],"421":["SK"],"423":["LI"],"500":["FK"],"501":["BZ"],"502":["GT"],"503":["SV"],"504":["HN"],"505":["NI"],"506":["CR"],"507":["PA"],"508":["PM"],"509":["HT"],"590":["GP","BL","MF"],"591":["BO"],"592":["GY"],"593":["EC"],"594":["GF"],"595":["PY"],"596":["MQ"],"597":["SR"],"598":["UY"],"599":["CW","BQ"],"670":["TL"],"672":["NF"],"673":["BN"],"674":["NR"],"675":["PG"],"676":["TO"],"677":["SB"],"678":["VU"],"679":["FJ"],"680":["PW"],"681":["WF"],"682":["CK"],"683":["NU"],"685":["WS"],"686":["KI"],"687":["NC"],"688":["TV"],"689":["PF"],"690":["TK"],"691":["FM"],"692":["MH"],"800":["001"],"808":["001"],"850":["KP"],"852":["HK"],"853":["MO"],"855":["KH"],"856":["LA"],"870":["001"],"878":["001"],"880":["BD"],"881":["001"],"882":["001"],"883":["001"],"886":["TW"],"888":["001"],"960":["MV"],"961":["LB"],"962":["JO"],"963":["SY"],"964":["IQ"],"965":["KW"],"966":["SA"],"967":["YE"],"968":["OM"],"970":["PS"],"971":["AE"],"972":["IL"],"973":["BH"],"974":["QA"],"975":["BT"],"976":["MN"],"977":["NP"],"979":["001"],"992":["TJ"],"993":["TM"],"994":["AZ"],"995":["GE"],"996":["KG"],"998":["UZ"]},"countries":{"AC":["247","00","(?:[01589]\\d|[46])\\d{4}",[5,6]],"AD":["376","00","(?:1|6\\d)\\d{7}|[136-9]\\d{5}",[6,8,9],[["(\\d{3})(\\d{3})","$1 $2",["[136-9]"]],["(\\d{4})(\\d{4})","$1 $2",["1"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]]],"AE":["971","00","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",[5,6,7,8,9,10,11,12],[["(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],["(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],"0"],"AF":["93","00","[2-7]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],"0"],"AG":["1","011","(?:268|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([457]\\d{6})$","268$1",0,"268"],"AI":["1","011","(?:264|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2457]\\d{6})$","264$1",0,"264"],"AL":["355","00","(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",[6,7,8,9],[["(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],"0"],"AM":["374","00","(?:[1-489]\\d|55|60|77)\\d{6}",[8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],["(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],["(\\d{3})(\\d{5})","$1 $2",["[23]"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[4-9]"],"0$1"]],"0"],"AO":["244","00","[29]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]]],"AR":["54","00","11\\d{8}|(?:[2368]|9\\d)\\d{9}",[10,11],[["(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],["(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1",0,"$1 $2 $3-$4"]],"0",0,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],"AS":["1","011","(?:[58]\\d\\d|684|900)\\d{7}",[10],0,"1",0,"1|([267]\\d{6})$","684$1",0,"684"],"AT":["43","00","1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",[4,5,6,7,8,9,10,11,12,13],[["(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],["(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],["(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],["(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],"0"],"AU":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|(?:[2-478]\\d\\d|550)\\d{6}|1\\d{4,7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],"0",0,"0|(183[12])",0,0,0,[["(?:[237]\\d{5}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|(?:[6-8]\\d{3}|9(?:[02-9]\\d\\d|1(?:[0-57-9]\\d|6[0135-9])))\\d))\\d{3}",[9]],["4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,["16\\d{3,7}",[5,6,7,8,9]],["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"AW":["297","00","(?:[25-79]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]]],"AX":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|(?:[147]\\d|3[0-46-9]|50)\\d{4,8}",[5,6,7,8,9,10],0,"0",0,0,0,0,"18",0,"00"],"AZ":["994","00","(?:365\\d{3}|900200)\\d{3}|(?:[12457]\\d|60|88)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],"0"],"BA":["387","00","6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],"0"],"BB":["1","011","(?:246|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","246$1",0,"246"],"BD":["880","00","[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{4,6})","$1-$2",["31[5-7]|[459]1"],"0$1"],["(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],["(\\d{4})(\\d{3,6})","$1-$2",["[13-9]"],"0$1"],["(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],"0"],"BE":["32","00","4\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],"0"],"BF":["226","00","[25-7]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25-7]"]]]],"BG":["359","00","[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",[6,7,8,9],[["(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],"0"],"BH":["973","00","[136-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[13679]|8[047]"]]]],"BI":["257","00","(?:[267]\\d|31)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]]],"BJ":["229","00","[2689]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"]]]],"BL":["590","00","(?:590|69\\d)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:2[7-9]|5[12]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],"BM":["1","011","(?:441|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","441$1",0,"441"],"BN":["673","00","[2-578]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]]],"BO":["591","00(?:1\\d)?","(?:[2-467]\\d{3}|80017)\\d{4}",[8,9],[["(\\d)(\\d{7})","$1 $2",["[23]|4[46]"]],["(\\d{8})","$1",["[67]"]],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"]]],"0",0,"0(1\\d)?"],"BQ":["599","00","(?:[34]1|7\\d)\\d{5}",[7],0,0,0,0,0,0,"[347]"],"BR":["55","00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",[8,9,10,11],[["(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],["(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[189][1-9]|2[12478])[2-57]|[3-7]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["1[1-9]|[2-9]"],"($1)"]],"0",0,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"BS":["1","011","(?:242|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([3-8]\\d{6})$","242$1",0,"242"],"BT":["975","00","[17]\\d{7}|[2-8]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]]],"BW":["267","00","90\\d{5}|(?:[2-6]|7\\d)\\d{6}",[7,8],[["(\\d{2})(\\d{5})","$1 $2",["90"]],["(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]]],"BY":["375","810","(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],["(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],["(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],"8",0,"0|80?",0,0,0,0,"8~10"],"BZ":["501","00","(?:0800\\d|[2-8])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],["(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]]],"CA":["1","011","(?:[2-8]\\d|90)\\d{8}",[10],0,"1",0,0,0,0,0,[["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}"],0,0,0,["600[2-9]\\d{6}"]]],"CC":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",[9]],["4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CD":["243","00","[189]\\d{8}|[1-68]\\d{6}",[7,9],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],"0"],"CF":["236","00","(?:[27]\\d{3}|8776)\\d{4}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]]],"CG":["242","00","222\\d{6}|(?:0\\d|80)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]]],"CH":["41","00","8\\d{11}|[2-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],"0"],"CI":["225","00","[02-8]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-8]"]]]],"CK":["682","00","[2-8]\\d{4}",[5],[["(\\d{2})(\\d{3})","$1 $2",["[2-8]"]]]],"CL":["56","(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0","1230\\d{7}|6\\d{9,10}|[2-9]\\d{8}",[9,10,11],[["(\\d{5})(\\d{4})","$1 $2",["21"],"($1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]]],"CM":["237","00","(?:[26]\\d\\d|88)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]]],"CN":["86","00|1(?:[12]\\d|79|9[0235-7])\\d\\d00","1[1279]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-68]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1",1],["(\\d{3})(\\d{7,8})","$1 $2",["9"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",1]],"0",0,"0|(1(?:[12]\\d|79|9[0235-7])\\d\\d)",0,0,0,0,"00"],"CO":["57","00(?:4(?:[14]4|56)|[579])","(?:1\\d|3)\\d{9}|[124-8]\\d{7}",[8,10,11],[["(\\d)(\\d{7})","$1 $2",["1[2-79]|[25-8]|(?:18|4)[2-9]"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["3"]],["(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9)","1(?:800|9)"],"0$1",0,"$1 $2 $3"]],"0",0,"0([3579]|4(?:[14]4|56))?"],"CR":["506","00","(?:8\\d|90)\\d{8}|[24-8]\\d{7}",[8,10],[["(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"]]],0,0,"(19(?:0[0-2468]|1[09]|20|66|77|99))"],"CU":["53","119","[27]\\d{6,7}|[34]\\d{5,7}|5\\d{7}",[6,7,8],[["(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],["(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],"0"],"CV":["238","0","[2-59]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-59]"]]]],"CW":["599","00","(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[3467]"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],0,0,0,0,0,"[69]"],"CX":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",[9]],["4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CY":["357","00","(?:[279]\\d|[58]0)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]]],"CZ":["420","00","(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]]],"DE":["49","00","[2579]\\d{5,14}|49[67]0\\d{1,4}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|7[89]|9\\d)\\d{1,3}|49(?:[12]\\d|3[1-689]|7[1-7])\\d{1,8}|49(?:[05]\\d|[46][1-8])\\d{1,9}|(?:1|[368]\\d|4[0-8])\\d{3,13}",[4,5,6,7,8,9,10,11,12,13,14,15],[["(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],["(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],["(\\d{4})(\\d{3,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],["(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],["(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],["(\\d{5})(\\d{3,10})","$1 $2",["3"],"0$1"],["(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],["(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["15[0568]"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],["(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],["(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],["(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],["(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],"0"],"DJ":["253","00","(?:2\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]]],"DK":["45","00","[2-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]]],"DM":["1","011","(?:[58]\\d\\d|767|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","767$1",0,"767"],"DO":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,0,0,0,"8[024]9"],"DZ":["213","00","(?:[1-4]|[5-79]\\d|80)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],"0"],"EC":["593","00","1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}",[8,9,10,11],[["(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)",0,"$1-$2-$3"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],"0"],"EE":["372","00","8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],["(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-4])","[45]|8(?:00[1-9]|[1-4])"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["80"]]]],"EG":["20","00","[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",[8,9,10],[["(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],["(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[189]"],"0$1"]],"0"],"EH":["212","00","[5-8]\\d{8}",[9],0,"0",0,0,0,0,"528[89]"],"ER":["291","00","[178]\\d{6}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],"0"],"ES":["34","00","(?:51|[6-9]\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]]],"ET":["251","00","(?:11|[2-59]\\d)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],"0"],"FI":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}|[1-35689]\\d{4}",[5,6,7,8,9,10],[["(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],["(\\d{3})(\\d{3,7})","$1 $2",["(?:[12]0|7)0|[368]"],"0$1"],["(\\d{2})(\\d{4,8})","$1 $2",["[12457]"],"0$1"]],"0",0,0,0,0,"1[03-79]|[2-9]",0,"00"],"FJ":["679","0(?:0|52)","45\\d{5}|(?:0800\\d|[235-9])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],0,0,0,0,0,0,0,"00"],"FK":["500","00","[2-7]\\d{4}",[5]],"FM":["691","00","[39]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[39]"]]]],"FO":["298","00","(?:[2-8]\\d|90)\\d{4}",[6],[["(\\d{6})","$1",["[2-9]"]]],0,0,"(10(?:01|[12]0|88))"],"FR":["33","00","[1-9]\\d{8}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],"0"],"GA":["241","00","(?:0\\d|[2-7])\\d{6}",[7,8],[["(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]]],"GB":["44","00","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",[7,9,10],[["(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[024-9])","[25]|7(?:0|6(?:[04-9]|2[356]))"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],"0",0,0,0,0,0,[["(?:1(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|2(?:0[024-9]|1[0-7]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))|2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d)\\d{6}|1(?:(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d|7(?:(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))\\d|6888[2-46-8]))\\d\\d",[9,10]],["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",[10]],["56\\d{8}",[10]]],0," x"],"GD":["1","011","(?:473|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","473$1",0,"473"],"GE":["995","00","(?:[3-57]\\d\\d|800)\\d{6}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],"0"],"GF":["594","00","[56]94\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0"],"GG":["44","00","(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",[7,9,10],0,"0",0,"0|([25-9]\\d{5})$","1481$1",0,0,[["1481[25-9]\\d{5}",[10]],["7(?:(?:781|839)\\d|911[17])\\d{5}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",[10]],["56\\d{8}",[10]]]],"GH":["233","00","(?:[235]\\d{3}|800)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],"0"],"GI":["350","00","(?:[25]\\d\\d|629)\\d{5}",[8],[["(\\d{3})(\\d{5})","$1 $2",["2"]]]],"GL":["299","00","(?:19|[2-689]\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]]],"GM":["220","00","[2-9]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"GN":["224","00","(?:30|6\\d\\d|722)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]]],"GP":["590","00","(?:590|69\\d)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0",0,0,0,0,0,[["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],"GQ":["240","00","222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{6})","$1 $2",["[89]"]]]],"GR":["30","00","(?:[268]\\d|[79]0)\\d{8}",[10],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],["(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]]]],"GT":["502","00","(?:1\\d{3}|[2-7])\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"GU":["1","011","(?:[58]\\d\\d|671|900)\\d{7}",[10],0,"1",0,"1|([3-9]\\d{6})$","671$1",0,"671"],"GW":["245","00","[49]\\d{8}|4\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["40"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]]],"GY":["592","001","(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]]],"HK":["852","00(?:30|5[09]|[126-9]?)","8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",[5,6,7,8,9,11],[["(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],["(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],0,0,0,0,0,0,0,"00"],"HN":["504","00","[237-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]]],"HR":["385","00","(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",[6,7,8,9],[["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],"0"],"HT":["509","00","[2-489]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]]],"HU":["36","00","[2357]\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],"06"],"ID":["62","00[189]","(?:(?:007803|8\\d{4})\\d|[1-36])\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",[7,8,9,10,11,12,13],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],["(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],["(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],["(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],["(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],["(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],["(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],"0"],"IE":["353","00","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],["(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],["(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"]],"0"],"IL":["972","0(?:0|1[2-9])","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",[7,8,9,10,11,12],[["(\\d{4})(\\d{3})","$1-$2",["125"]],["(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],["(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],["(\\d{4})(\\d{6})","$1-$2",["159"]],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],"0"],"IM":["44","00","1624\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([5-8]\\d{5})$","1624$1",0,"74576|(?:16|7[56])24"],"IN":["91","00","(?:00800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",[8,9,10,11,12,13],[["(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],0,1],["(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],0,1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|(?:55|61)2|7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:1(?:29|60|8[06])|261|552|788[01])[2-7]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])"],"0$1",1],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|[4-8])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|3179)|807(?:1|9[1-3])|(?:1552|7(?:28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",1],["(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",1],["(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],0,1],["(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],0,1]],"0"],"IO":["246","00","3\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["3"]]]],"IQ":["964","00","(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"IR":["98","00","[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",[4,5,6,7,10],[["(\\d{4,5})","$1",["96"],"0$1"],["(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],"0"],"IS":["354","00|1(?:0(?:01|[12]0)|100)","(?:38\\d|[4-9])\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],0,0,0,0,0,0,0,"00"],"IT":["39","00","0\\d{6,10}|55\\d{8}|[08]\\d{5}|(?:3[0-8]|8)\\d{7,9}|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],[["(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],["(\\d{4})(\\d{4})","$1 $2",["894"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]],["(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],0,0,0,0,0,0,[["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],["33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",[9,10,11]],["80(?:0\\d{3}|3)\\d{3}",[6,9]],["(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",[6,8,9,10]],["1(?:78\\d|99)\\d{6}",[9,10]],0,0,0,["55\\d{8}",[10]],["84(?:[08]\\d{3}|[17])\\d{3}",[6,9]]]],"JE":["44","00","1534\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([0-24-8]\\d{5})$","1534$1",0,0,[["1534[0-24-8]\\d{5}"],["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"],["80(?:07(?:35|81)|8901)\\d{4}"],["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],["701511\\d{4}"],0,["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}"],["56\\d{8}"]]],"JM":["1","011","(?:[58]\\d\\d|658|900)\\d{7}",[10],0,"1",0,0,0,0,"658|876"],"JO":["962","00","900\\d{5}|(?:(?:[268]|7\\d)\\d|32|53)\\d{6}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],["(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"JP":["81","010","00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",[8,9,10,11,12,13,14,15,16,17],[["(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],["(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6[0-24-689]|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|5[0-3589]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])","[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],"0"],"KE":["254","000","(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",[7,8,9,10],[["(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0"],"KG":["996","00","(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]"],"0$1"],["(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],"0"],"KH":["855","00[14-9]","1\\d{9}|[1-9]\\d{7,8}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"KI":["686","00","(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",[5,8],0,"0"],"KM":["269","00","[3478]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]]],"KN":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","869$1",0,"869"],"KP":["850","00|99","85\\d{6}|(?:19\\d|2)\\d{7}",[8,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],"0"],"KR":["82","00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",[5,6,8,9,10,11,12,13,14],[["(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1"],["(\\d{4})(\\d{4})","$1-$2",["1"]],["(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1"]],"0",0,"0(8(?:[1-46-8]|5\\d\\d))?"],"KW":["965","00","(?:18|[2569]\\d\\d)\\d{5}",[7,8],[["(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],["(\\d{3})(\\d{5})","$1 $2",["[25]"]]]],"KY":["1","011","(?:345|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","345$1",0,"345"],"KZ":["7","810","33622\\d{5}|(?:7\\d|80)\\d{8}",[10],0,"8",0,0,0,0,"33|7",0,"8~10"],"LA":["856","00","(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["3"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2"],"0$1"]],"0"],"LB":["961","00","[7-9]\\d{7}|[13-9]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],"0"],"LC":["1","011","(?:[58]\\d\\d|758|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","758$1",0,"758"],"LI":["423","00","90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",[7,9],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],"0",0,"0|(10(?:01|20|66))"],"LK":["94","00","(?:[1-7]\\d|[89]1)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],"0"],"LR":["231","00","(?:2|33|5\\d|77|88)\\d{7}|[45]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3578]"],"0$1"]],"0"],"LS":["266","00","(?:[256]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2568]"]]]],"LT":["370","00","(?:[3469]\\d|52|[78]0)\\d{6}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",1],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",1],["(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(8-$1)",1],["(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(8-$1)",1]],"8",0,"[08]"],"LU":["352","00","35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",[4,5,6,7,8,9,10,11],[["(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]],0,0,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],"LV":["371","00","(?:[268]\\d|90)\\d{6}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]]],"LY":["218","00","(?:[2569]\\d|71)\\d{7}",[9],[["(\\d{2})(\\d{7})","$1-$2",["[25-79]"],"0$1"]],"0"],"MA":["212","00","[5-8]\\d{8}",[9],[["(\\d{5})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],["(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892"],"0$1"],["(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],["(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],"0",0,0,0,0,0,[["5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"],["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[06-8]|6[1267]|7[017]))\\d{6}"],["80\\d{7}"],["89\\d{7}"],0,0,0,0,["5924[01]\\d{4}"]]],"MC":["377","00","870\\d{5}|(?:[349]|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],"0"],"MD":["373","00","(?:[235-7]\\d|[89]0)\\d{6}",[8],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],"0"],"ME":["382","00","(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],"0"],"MF":["590","00","(?:590|69\\d)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],"MG":["261","00","[23]\\d{8}",[9],[["(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],"0",0,"0|([24-9]\\d{6})$","20$1"],"MH":["692","011","329\\d{4}|(?:[256]\\d|45)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],"1"],"MK":["389","00","[2-578]\\d{7}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],"0"],"ML":["223","00","(?:[246-9]\\d|50)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]]],"MM":["95","00","1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",[6,7,8,9,10],[["(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],["(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],["(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],"0"],"MN":["976","001","[12]\\d{7,9}|[57-9]\\d{7}",[8,9,10],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[57-9]"]],["(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],"0"],"MO":["853","00","(?:28|[68]\\d)\\d{6}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[268]"]]]],"MP":["1","011","[58]\\d{9}|(?:67|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","670$1",0,"670"],"MQ":["596","00","(?:596|69\\d)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0"],"MR":["222","00","(?:[2-4]\\d\\d|800)\\d{5}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]]],"MS":["1","011","66449\\d{5}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(4\\d{6})$","664$1",0,"664"],"MT":["356","00","3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]]],"MU":["230","0(?:0|[24-7]0|3[03])","(?:[2-468]|5\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],["(\\d{4})(\\d{4})","$1 $2",["5"]]],0,0,0,0,0,0,0,"020"],"MV":["960","0(?:0|19)","(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",[7,10],[["(\\d{3})(\\d{4})","$1-$2",["[3467]|9[14-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],0,0,0,0,0,0,0,"00"],"MW":["265","00","1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",[7,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[17-9]"],"0$1"]],"0"],"MX":["52","0[09]","(?:1\\d|[2-9])\\d{9}",[10,11],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],"01 $1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],"01 $1",1],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],"044 $1",0,"$1 $2 $3 $4"],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 $3 $4",["1"],"044 $1",0,"$1 $2 $3 $4"]],"01",0,"0[12]|04[45]([2-9]\\d{9})$","1$1",0,0,0,"00"],"MY":["60","00","1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[0249]|[367][2-9]|8[1-9])|8"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],"0"],"MZ":["258","00","(?:2|8\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],"NA":["264","00","[68]\\d{7,8}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],"NC":["687","00","[2-57-9]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]]],"NE":["227","00","[0289]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[01]"]]]],"NF":["672","00","[13]\\d{5}",[6],[["(\\d{2})(\\d{4})","$1 $2",["1"]],["(\\d)(\\d{5})","$1 $2",["3"]]],0,0,"([0-258]\\d{4})$","3$1"],"NG":["234","009","(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",[7,8,10,11,12,13,14],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-7]|8[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],["(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],"0"],"NI":["505","00","(?:1800|[25-8]\\d{3})\\d{4}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]]],"NL":["31","00","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",[5,6,7,8,9,10],[["(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],["(\\d)(\\d{8})","$1 $2",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],"0"],"NO":["47","00","(?:0|[2-9]\\d{3})\\d{4}",[5,8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],0,0,0,0,0,"[02-689]|7[0-8]"],"NP":["977","00","9\\d{9}|[1-9]\\d{7}",[8,10],[["(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],["(\\d{2})(\\d{6})","$1-$2",["[1-8]|9(?:[1-579]|6[2-6])"],"0$1"],["(\\d{3})(\\d{7})","$1-$2",["9"]]],"0"],"NR":["674","00","(?:444|55\\d|888)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[458]"]]]],"NU":["683","00","(?:[47]|888\\d)\\d{3}",[4,7],[["(\\d{3})(\\d{4})","$1 $2",["8"]]]],"NZ":["64","0(?:0|161)","[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}",[8,9,10],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[59]|80"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7|86"],"0$1"]],"0",0,0,0,0,0,0,"00"],"OM":["968","00","(?:[279]\\d{3}|500)\\d{4}|8007\\d{4,5}",[7,8,9],[["(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],["(\\d{2})(\\d{6})","$1 $2",["2"]],["(\\d{4})(\\d{4})","$1 $2",["[79]"]]]],"PA":["507","00","(?:[1-57-9]|6\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],["(\\d{4})(\\d{4})","$1-$2",["6"]]]],"PE":["51","19(?:1[124]|77|90)00","(?:[14-8]|9\\d)\\d{7}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],"0",0,0,0,0,0,0,0," Anexo "],"PF":["689","00","[48]\\d{7}|4\\d{5}",[6,8],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[48]"]]]],"PG":["675","00|140[1-3]","(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],["(\\d{4})(\\d{4})","$1 $2",["[78]"]]],0,0,0,0,0,0,0,"00"],"PH":["63","00","(?:1800|8)\\d{7,9}|2\\d{5}(?:\\d{2})?|(?:[3-7]|9\\d)\\d{8}",[6,8,9,10,11,12,13],[["(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],["(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],"0"],"PK":["92","00","122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",[8,9,10,11,12],[["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["[89]0"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["1"]],["(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],["(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],["(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],["(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],"0"],"PL":["48","00","[1-57-9]\\d{6}(?:\\d{2})?|6\\d{5,8}",[6,7,8,9],[["(\\d{5})","$1",["19"]],["(\\d{3})(\\d{3})","$1 $2",["11|64"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["39|45|5[0137]|6[0469]|7[02389]|8[08]"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-8]|9[145]"]]]],"PM":["508","00","[45]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],"0"],"PR":["1","011","(?:[589]\\d\\d|787)\\d{7}",[10],0,"1",0,0,0,0,"787|939"],"PS":["970","00","[2489]2\\d{6}|(?:1\\d|5)\\d{8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"PT":["351","00","(?:[26-9]\\d|30)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]]],"PW":["680","01[12]","(?:[25-8]\\d\\d|345|488|900)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"PY":["595","00","59\\d{4,6}|(?:[2-46-9]\\d|5[0-8])\\d{4,7}",[6,7,8,9],[["(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6[347]|7[46-8]|85"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],["(\\d{3})(\\d{6})","$1 $2",["9"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"]],"0"],"QA":["974","00","800\\d{4}|(?:2|[3-7]\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],["(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]]],"RE":["262","00","(?:26|[68]\\d)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[268]"],"0$1"]],"0",0,0,0,0,"262|69|8"],"RO":["40","00","(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",[6,9],[["(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],["(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],"0",0,0,0,0,0,0,0," int "],"RS":["381","00","38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",[6,7,8,9,10,11,12],[["(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],["(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],"0"],"RU":["7","810","[347-9]\\d{9}",[10],[["(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",1],["(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",1]],"8",0,0,0,0,"3[04-689]|[489]",0,"8~10"],"RW":["250","00","(?:06|[27]\\d\\d|[89]00)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],"0"],"SA":["966","00","92\\d{7}|(?:[15]|8\\d)\\d{8}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["9"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],"0"],"SB":["677","0[01]","(?:[1-6]|[7-9]\\d\\d)\\d{4}",[5,7],[["(\\d{2})(\\d{5})","$1 $2",["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],"SC":["248","010|0[0-2]","8000\\d{3}|(?:[249]\\d|64)\\d{5}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],0,0,0,0,0,0,0,"00"],"SD":["249","00","[19]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],"0"],"SE":["46","00","(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1",0,"$1 $2"],["(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3"],["(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1",0,"$1 $2 $3"],["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3 $4"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1",0,"$1 $2 $3 $4"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1",0,"$1 $2 $3 $4 $5"]],"0"],"SG":["65","0[0-3]\\d","(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",[8,10,11],[["(\\d{4})(\\d{4})","$1 $2",["[369]|8[1-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],["(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"SH":["290","00","(?:[256]\\d|8)\\d{3}",[4,5],0,0,0,0,0,0,"[256]"],"SI":["386","00|10(?:22|66|88|99)","[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",[5,6,7,8],[["(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],"0",0,0,0,0,0,0,"00"],"SJ":["47","00","0\\d{4}|(?:[4589]\\d|79)\\d{6}",[5,8],0,0,0,0,0,0,"79"],"SK":["421","00","[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",[6,7,9],[["(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],"0"],"SL":["232","00","(?:[2-578]\\d|66|99)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[2-9]"],"(0$1)"]],"0"],"SM":["378","00","(?:0549|[5-7]\\d)\\d{6}",[8,10],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],["(\\d{4})(\\d{6})","$1 $2",["0"]]],0,0,"([89]\\d{5})$","0549$1"],"SN":["221","00","(?:[378]\\d{4}|93330)\\d{4}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]]],"SO":["252","00","[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}",[6,7,8,9],[["(\\d{2})(\\d{4})","$1 $2",["8[125]"]],["(\\d{6})","$1",["[134]"]],["(\\d)(\\d{6})","$1 $2",["1|2[0-79]|3[0-46-8]|4[0-7]|59"]],["(\\d)(\\d{7})","$1 $2",["24|[67]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[348]|64|79[0-8]|90"]],["(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[1-35-9]|799|9[2-9]"]]],"0"],"SR":["597","00","(?:[2-5]|68|[78]\\d)\\d{5}",[6,7],[["(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],["(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],["(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]]],"SS":["211","00","[19]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],"0"],"ST":["239","00","(?:22|9\\d)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[29]"]]]],"SV":["503","00","[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",[7,8,11],[["(\\d{3})(\\d{4})","$1 $2",["[89]"]],["(\\d{4})(\\d{4})","$1 $2",["[267]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]]],"SX":["1","011","7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(5\\d{6})$","721$1",0,"721"],"SY":["963","00","[1-39]\\d{8}|[1-5]\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",1]],"0"],"SZ":["268","00","0800\\d{4}|(?:[237]\\d|900)\\d{6}",[8,9],[["(\\d{4})(\\d{4})","$1 $2",["[0237]"]],["(\\d{5})(\\d{4})","$1 $2",["9"]]]],"TA":["290","00","8\\d{3}",[4],0,0,0,0,0,0,"8"],"TC":["1","011","(?:[58]\\d\\d|649|900)\\d{7}",[10],0,"1",0,"1|([2-479]\\d{6})$","649$1",0,"649"],"TD":["235","00|16","(?:22|[69]\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],0,0,0,0,0,0,0,"00"],"TG":["228","00","[279]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]]],"TH":["66","00[1-9]","1\\d{8,9}|(?:[2-57]|[689]\\d)\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"TJ":["992","810","(?:[3-59]\\d|77|88)\\d{7}",[9],[["(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"],0,1],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],0,1],["(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3"],0,1],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[457-9]"],0,1]],"8",0,0,0,0,0,0,"8~10"],"TK":["690","00","[2-47]\\d{3,6}",[4,5,6,7]],"TL":["670","00","7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],["(\\d{4})(\\d{4})","$1 $2",["7"]]]],"TM":["993","810","[1-6]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],["(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"TN":["216","00","[2-57-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]]],"TO":["676","00","[78]\\d{6}|[2-478]\\d{4}|(?:080|[56])0\\d{3}",[5,7],[["(\\d{2})(\\d{3})","$1-$2",["[2-6]|7[014]|8[05]"]],["(\\d{4})(\\d{3})","$1 $2",["0"]],["(\\d{3})(\\d{4})","$1 $2",["7[578]|8"]]]],"TR":["90","00","(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}",[7,10],[["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[0589]|90"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)","5(?:[0-59]|6161)"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",1]],"0"],"TT":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-46-8]\\d{6})$","868$1",0,"868"],"TV":["688","00","(?:2|7\\d\\d|90)\\d{4}",[5,6,7]],"TW":["886","0(?:0[25-79]|19)","(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",[7,8,9,10],[["(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[25][2-8]|[346]|7[1-9]|8[27-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[258]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0",0,0,0,0,0,0,0,"#"],"TZ":["255","00[056]","(?:[26-8]\\d|41|90)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],"0"],"UA":["380","00","[89]\\d{9}|[3-9]\\d{8}",[9,10],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]","4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["[3-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0",0,0,0,0,0,0,"0~0"],"UG":["256","00[057]","800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",[9],[["(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],"0"],"US":["1","011","[2-9]\\d{9}",[10],[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],0,1,"$1-$2-$3"]],"1",0,0,0,0,0,[["(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}"],0,["710[2-9]\\d{6}"]]],"UY":["598","0(?:0|1[3-9]\\d)","(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["8|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[24]"]]],"0",0,0,0,0,0,0,"00"," int. "],"UZ":["998","810","[679]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[679]"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"VA":["39","00","0\\d{6,10}|55\\d{8}|[08]\\d{5}|(?:3[0-8]|8)\\d{7,9}|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],0,0,0,0,0,0,"06698"],"VC":["1","011","(?:[58]\\d\\d|784|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","784$1",0,"784"],"VE":["58","00","[89]00\\d{7}|(?:[24]\\d|50)\\d{8}",[10],[["(\\d{3})(\\d{7})","$1-$2",["[24589]"],"0$1"]],"0"],"VG":["1","011","(?:284|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-578]\\d{6})$","284$1",0,"284"],"VI":["1","011","[58]\\d{9}|(?:34|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","340$1",0,"340"],"VN":["84","00","[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",1],["(\\d{4})(\\d{4,6})","$1 $2",["1"],0,1],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",1]],"0"],"VU":["678","00","(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}",[5,7],[["(\\d{3})(\\d{4})","$1 $2",["[579]"]]]],"WF":["681","00","(?:[45]0|68|72|8\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]]],"WS":["685","0","[2-6]\\d{4}|8\\d{5}(?:\\d{4})?|[78]\\d{6}",[5,6,7,10],[["(\\d{5})","$1",["[2-6]"]],["(\\d{3})(\\d{3,7})","$1 $2",["8"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],"XK":["383","00","[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],"0"],"YE":["967","00","(?:1|7\\d)\\d{7}|[1-7]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],"0"],"YT":["262","00","80\\d{7}|(?:26|63)9\\d{6}",[9],0,"0",0,0,0,0,"269|63"],"ZA":["27","00","[1-9]\\d{8}|8\\d{4,7}",[5,6,7,8,9],[["(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"]],"0"],"ZM":["260","00","800\\d{6}|(?:21|76|9\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[79]"],"0$1"]],"0"],"ZW":["263","00","2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",[5,6,7,8,9,10],[["(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],["(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],["(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],"0"],"001":["979",0,"\\d{9}",[9],[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]]]}};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeArguments", function() { return normalizeArguments; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



function parsePhoneNumber() {
	var _normalizeArguments = normalizeArguments(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}

function normalizeArguments(args) {
	var _Array$prototype$slic = Array.prototype.slice.call(args),
	    _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
	    arg_1 = _Array$prototype$slic2[0],
	    arg_2 = _Array$prototype$slic2[1],
	    arg_3 = _Array$prototype$slic2[2],
	    arg_4 = _Array$prototype$slic2[3];

	var text = void 0;
	var options = void 0;
	var metadata = void 0;

	// If the phone number is passed as a string.
	// `parsePhoneNumber('88005553535', ...)`.
	if (typeof arg_1 === 'string') {
		text = arg_1;
	} else throw new TypeError('A text for parsing must be a string.');

	// If "default country" argument is being passed then move it to `options`.
	// `parsePhoneNumber('88005553535', 'RU', [options], metadata)`.
	if (!arg_2 || typeof arg_2 === 'string') {
		if (arg_4) {
			options = arg_3;
			metadata = arg_4;
		} else {
			options = undefined;
			metadata = arg_3;
		}

		if (arg_2) {
			options = _extends({ defaultCountry: arg_2 }, options);
		}
	}
	// `defaultCountry` is not passed.
	// Example: `parsePhoneNumber('+78005553535', [options], metadata)`.
	else if (isObject(arg_2)) {
			if (arg_3) {
				options = arg_2;
				metadata = arg_3;
			} else {
				metadata = arg_2;
			}
		} else throw new Error('Invalid second argument: ' + arg_2);

	return {
		text: text,
		options: options,
		metadata: metadata
	};
}

// Otherwise istanbul would show this as "branch not covered".
/* istanbul ignore next */
var isObject = function isObject(_) {
	return (typeof _ === 'undefined' ? 'undefined' : _typeof(_)) === 'object';
};
//# sourceMappingURL=parsePhoneNumber.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function parsePhoneNumber(text, options, metadata) {
	return Object(_parse___WEBPACK_IMPORTED_MODULE_0__["default"])(text, _extends({}, options, { v2: true }), metadata);
}
//# sourceMappingURL=parsePhoneNumber_.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extract_formatted_phone_number", function() { return extract_formatted_phone_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strip_national_prefix_and_carrier_code", function() { return strip_national_prefix_and_carrier_code; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find_country_code", function() { return find_country_code; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCountryCallingCode", function() { return extractCountryCallingCode; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _getCountryCallingCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _IDD__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _RFC3966__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(21);
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(22);
// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js
















// We don't allow input strings for parsing to be longer than 250 chars.
// This prevents malicious input from consuming CPU.
var MAX_INPUT_STRING_LENGTH = 250;

// This consists of the plus symbol, digits, and arabic-indic digits.
var PHONE_NUMBER_START_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']');

// Regular expression of trailing characters that we want to remove.
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp('[^' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']+$');

// `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//
function parse(text) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var metadata = arguments[2];

	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata);

	// Validate `defaultCountry`.
	if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
		if (options.v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('INVALID_COUNTRY');
		}
		throw new Error('Unknown country: ' + options.defaultCountry);
	}

	// Parse the phone number.

	var _parse_input = parse_input(text, options.v2),
	    formatted_phone_number = _parse_input.number,
	    ext = _parse_input.ext;

	// If the phone number is not viable then return nothing.


	if (!formatted_phone_number) {
		if (options.v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('NOT_A_NUMBER');
		}
		return {};
	}

	var _parse_phone_number = parse_phone_number(formatted_phone_number, options.defaultCountry, metadata),
	    country = _parse_phone_number.country,
	    nationalNumber = _parse_phone_number.national_number,
	    countryCallingCode = _parse_phone_number.countryCallingCode,
	    carrierCode = _parse_phone_number.carrierCode;

	if (!metadata.selectedCountry()) {
		if (options.v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('INVALID_COUNTRY');
		}
		return {};
	}

	// Validate national (significant) number length.
	if (nationalNumber.length < _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"]) {
		// Won't throw here because the regexp already demands length > 1.
		/* istanbul ignore if */
		if (options.v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_SHORT');
		}
		// Google's demo just throws an error in this case.
		return {};
	}

	// Validate national (significant) number length.
	//
	// A sidenote:
	//
	// They say that sometimes national (significant) numbers
	// can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
	// https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
	// Such numbers will just be discarded.
	//
	if (nationalNumber.length > _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_LENGTH_FOR_NSN"]) {
		if (options.v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_LONG');
		}
		// Google's demo just throws an error in this case.
		return {};
	}

	if (options.v2) {
		var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_12__["default"](countryCallingCode, nationalNumber, metadata.metadata);

		if (country) {
			phoneNumber.country = country;
		}
		if (carrierCode) {
			phoneNumber.carrierCode = carrierCode;
		}
		if (ext) {
			phoneNumber.ext = ext;
		}

		return phoneNumber;
	}

	// Check if national phone number pattern matches the number.
	// National number pattern is different for each country,
	// even for those ones which are part of the "NANPA" group.
	var valid = country && Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, metadata.nationalNumberPattern()) ? true : false;

	if (!options.extended) {
		return valid ? result(country, nationalNumber, ext) : {};
	}

	return {
		country: country,
		countryCallingCode: countryCallingCode,
		carrierCode: carrierCode,
		valid: valid,
		possible: valid ? true : options.extended === true && metadata.possibleLengths() && Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_9__["is_possible_number"])(nationalNumber, countryCallingCode !== undefined, metadata),
		phone: nationalNumber,
		ext: ext
	};
}

/**
 * Extracts a parseable phone number.
 * @param  {string} text - Input.
 * @return {string}.
 */
function extract_formatted_phone_number(text, v2) {
	if (!text) {
		return;
	}

	if (text.length > MAX_INPUT_STRING_LENGTH) {
		if (v2) {
			throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_LONG');
		}
		return;
	}

	// Attempt to extract a possible number from the string passed in

	var starts_at = text.search(PHONE_NUMBER_START_PATTERN);

	if (starts_at < 0) {
		return;
	}

	return text
	// Trim everything to the left of the phone number
	.slice(starts_at)
	// Remove trailing non-numerical characters
	.replace(AFTER_PHONE_NUMBER_END_PATTERN, '');
}

// Strips any national prefix (such as 0, 1) present in the number provided.
// "Carrier codes" are only used  in Colombia and Brazil,
// and only when dialing within those countries from a mobile phone to a fixed line number.
function strip_national_prefix_and_carrier_code(number, metadata) {
	if (!number || !metadata.nationalPrefixForParsing()) {
		return { number: number };
	}

	// Attempt to parse the first digits as a national prefix
	var national_prefix_pattern = new RegExp('^(?:' + metadata.nationalPrefixForParsing() + ')');
	var national_prefix_matcher = national_prefix_pattern.exec(number);

	// If no national prefix is present in the phone number,
	// but the national prefix is optional for this country,
	// then consider this phone number valid.
	//
	// Google's reference `libphonenumber` implementation
	// wouldn't recognize such phone numbers as valid,
	// but I think it would perfectly make sense
	// to consider such phone numbers as valid
	// because if a national phone number was originally
	// formatted without the national prefix
	// then it must be parseable back into the original national number.
	// In other words, `parse(format(number))`
	// must always be equal to `number`.
	//
	if (!national_prefix_matcher) {
		return { number: number };
	}

	var national_significant_number = void 0;

	// `national_prefix_for_parsing` capturing groups
	// (used only for really messy cases: Argentina, Brazil, Mexico, Somalia)
	var captured_groups_count = national_prefix_matcher.length - 1;

	// If the national number tranformation is needed then do it.
	//
	// `national_prefix_matcher[captured_groups_count]` means that
	// the corresponding captured group is not empty.
	// It can be empty if it's optional.
	// Example: "0?(?:...)?" for Argentina.
	//
	if (metadata.nationalPrefixTransformRule() && national_prefix_matcher[captured_groups_count]) {
		national_significant_number = number.replace(national_prefix_pattern, metadata.nationalPrefixTransformRule());
	}
	// Else, no transformation is necessary,
	// and just strip the national prefix.
	else {
			national_significant_number = number.slice(national_prefix_matcher[0].length);
		}

	var carrierCode = void 0;
	if (captured_groups_count > 0) {
		carrierCode = national_prefix_matcher[1];
	}

	// The following is done in `get_country_and_national_number_for_local_number()` instead.
	//
	// // Verify the parsed national (significant) number for this country
	// const national_number_rule = new RegExp(metadata.nationalNumberPattern())
	// //
	// // If the original number (before stripping national prefix) was viable,
	// // and the resultant number is not, then prefer the original phone number.
	// // This is because for some countries (e.g. Russia) the same digit could be both
	// // a national prefix and a leading digit of a valid national phone number,
	// // like `8` is the national prefix for Russia and both
	// // `8 800 555 35 35` and `800 555 35 35` are valid numbers.
	// if (matchesEntirely(number, national_number_rule) &&
	// 		!matchesEntirely(national_significant_number, national_number_rule))
	// {
	// 	return number
	// }

	// Return the parsed national (significant) number
	return {
		number: national_significant_number,
		carrierCode: carrierCode
	};
}

function find_country_code(country_calling_code, national_phone_number, metadata) {
	// Is always non-empty, because `country_calling_code` is always valid
	var possible_countries = metadata.countryCallingCodes()[country_calling_code];

	// If there's just one country corresponding to the country code,
	// then just return it, without further phone number digits validation.
	if (possible_countries.length === 1) {
		return possible_countries[0];
	}

	return _find_country_code(possible_countries, national_phone_number, metadata.metadata);
}

// Changes `metadata` `country`.
function _find_country_code(possible_countries, national_phone_number, metadata) {
	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata);

	for (var _iterator = possible_countries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var country = _ref;

		metadata.country(country);

		// Leading digits check would be the simplest one
		if (metadata.leadingDigits()) {
			if (national_phone_number && national_phone_number.search(metadata.leadingDigits()) === 0) {
				return country;
			}
		}
		// Else perform full validation with all of those
		// fixed-line/mobile/etc regular expressions.
		else if (Object(_getNumberType___WEBPACK_IMPORTED_MODULE_8__["default"])({ phone: national_phone_number, country: country }, undefined, metadata.metadata)) {
				return country;
			}
	}
}

/**
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?ext }`.
 */
function parse_input(text, v2) {
	// Parse RFC 3966 phone number URI.
	if (text && text.indexOf('tel:') === 0) {
		return Object(_RFC3966__WEBPACK_IMPORTED_MODULE_11__["parseRFC3966"])(text);
	}

	var number = extract_formatted_phone_number(text, v2);

	// If the phone number is not viable, then abort.
	if (!number || !Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_4__["default"])(number)) {
		return {};
	}

	// Attempt to parse extension first, since it doesn't require region-specific
	// data and we want to have the non-normalised number here.
	var with_extension_stripped = Object(_extension__WEBPACK_IMPORTED_MODULE_5__["extractExtension"])(number);
	if (with_extension_stripped.ext) {
		return with_extension_stripped;
	}

	return { number: number };
}

/**
 * Creates `parse()` result object.
 */
function result(country, national_number, ext) {
	var result = {
		country: country,
		phone: national_number
	};

	if (ext) {
		result.ext = ext;
	}

	return result;
}

/**
 * Parses a viable phone number.
 * Returns `{ country, countryCallingCode, national_number }`.
 */
function parse_phone_number(formatted_phone_number, default_country, metadata) {
	var _extractCountryCallin = extractCountryCallingCode(formatted_phone_number, default_country, metadata.metadata),
	    countryCallingCode = _extractCountryCallin.countryCallingCode,
	    number = _extractCountryCallin.number;

	if (!number) {
		return { countryCallingCode: countryCallingCode };
	}

	var country = void 0;

	if (countryCallingCode) {
		metadata.chooseCountryByCountryCallingCode(countryCallingCode);
	} else if (default_country) {
		metadata.country(default_country);
		country = default_country;
		countryCallingCode = Object(_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_7__["default"])(default_country, metadata.metadata);
	} else return {};

	var _parse_national_numbe = parse_national_number(number, metadata),
	    national_number = _parse_national_numbe.national_number,
	    carrier_code = _parse_national_numbe.carrier_code;

	// Sometimes there are several countries
	// corresponding to the same country phone code
	// (e.g. NANPA countries all having `1` country phone code).
	// Therefore, to reliably determine the exact country,
	// national (significant) number should have been parsed first.
	//
	// When `metadata.json` is generated, all "ambiguous" country phone codes
	// get their countries populated with the full set of
	// "phone number type" regular expressions.
	//


	var exactCountry = find_country_code(countryCallingCode, national_number, metadata);
	if (exactCountry) {
		country = exactCountry;
		metadata.country(country);
	}

	return {
		country: country,
		countryCallingCode: countryCallingCode,
		national_number: national_number,
		carrierCode: carrier_code
	};
}

function parse_national_number(number, metadata) {
	var national_number = Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__["default"])(number);
	var carrier_code = void 0;

	// Parsing national prefixes and carrier codes
	// is only required for local phone numbers
	// but some people don't understand that
	// and sometimes write international phone numbers
	// with national prefixes (or maybe even carrier codes).
	// http://ucken.blogspot.ru/2016/03/trunk-prefixes-in-skype4b.html
	// Google's original library forgives such mistakes
	// and so does this library, because it has been requested:
	// https://github.com/catamphetamine/libphonenumber-js/issues/127

	var _strip_national_prefi = strip_national_prefix_and_carrier_code(national_number, metadata),
	    potential_national_number = _strip_national_prefi.number,
	    carrierCode = _strip_national_prefi.carrierCode;

	// If metadata has "possible lengths" then employ the new algorythm.


	if (metadata.possibleLengths()) {
		// We require that the NSN remaining after stripping the national prefix and
		// carrier code be long enough to be a possible length for the region.
		// Otherwise, we don't do the stripping, since the original number could be
		// a valid short number.
		switch (Object(_getNumberType___WEBPACK_IMPORTED_MODULE_8__["checkNumberLengthForType"])(potential_national_number, undefined, metadata)) {
			case 'TOO_SHORT':
			// case 'IS_POSSIBLE_LOCAL_ONLY':
			case 'INVALID_LENGTH':
				break;
			default:
				national_number = potential_national_number;
				carrier_code = carrierCode;
		}
	} else {
		// If the original number (before stripping national prefix) was viable,
		// and the resultant number is not, then prefer the original phone number.
		// This is because for some countries (e.g. Russia) the same digit could be both
		// a national prefix and a leading digit of a valid national phone number,
		// like `8` is the national prefix for Russia and both
		// `8 800 555 35 35` and `800 555 35 35` are valid numbers.
		if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(national_number, metadata.nationalNumberPattern()) && !Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(potential_national_number, metadata.nationalNumberPattern())) {
			// Keep the number without stripping national prefix.
		} else {
			national_number = potential_national_number;
			carrier_code = carrierCode;
		}
	}

	return {
		national_number: national_number,
		carrier_code: carrier_code
	};
}

// Determines the country for a given (possibly incomplete) phone number.
// export function get_country_from_phone_number(number, metadata)
// {
// 	return parse_phone_number(number, null, metadata).country
// }

// Parses a formatted phone number
// and returns `{ countryCallingCode, number }`
// where `number` is just the "number" part
// which is left after extracting `countryCallingCode`
// and is not necessarily a "national (significant) number"
// and might as well contain national prefix.
//
function extractCountryCallingCode(number, country, metadata) {
	number = Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__["default"])(number);

	if (!number) {
		return {};
	}

	// If this is not an international phone number,
	// then don't extract country phone code.
	if (number[0] !== '+') {
		// Convert an "out-of-country" dialing phone number
		// to a proper international phone number.
		var numberWithoutIDD = Object(_IDD__WEBPACK_IMPORTED_MODULE_10__["stripIDDPrefix"])(number, country, metadata);

		// If an IDD prefix was stripped then
		// convert the number to international one
		// for subsequent parsing.
		if (numberWithoutIDD && numberWithoutIDD !== number) {
			number = '+' + numberWithoutIDD;
		} else {
			return { number: number };
		}
	}

	// Fast abortion: country codes do not begin with a '0'
	if (number[1] === '0') {
		return {};
	}

	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata);

	// The thing with country phone codes
	// is that they are orthogonal to each other
	// i.e. there's no such country phone code A
	// for which country phone code B exists
	// where B starts with A.
	// Therefore, while scanning digits,
	// if a valid country code is found,
	// that means that it is the country code.
	//
	var i = 2;
	while (i - 1 <= _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_LENGTH_COUNTRY_CODE"] && i <= number.length) {
		var countryCallingCode = number.slice(1, i);

		if (metadata.countryCallingCodes()[countryCallingCode]) {
			return {
				countryCallingCode: countryCallingCode,
				number: number.slice(i)
			};
		}

		i++;
	}

	return {};
}
//# sourceMappingURL=parse_.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_LENGTH_FOR_NSN", function() { return MIN_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_LENGTH_FOR_NSN", function() { return MAX_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_LENGTH_COUNTRY_CODE", function() { return MAX_LENGTH_COUNTRY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_DIGITS", function() { return VALID_DIGITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITESPACE", function() { return WHITESPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_PUNCTUATION", function() { return VALID_PUNCTUATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUS_CHARS", function() { return PLUS_CHARS; });
// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2;

// The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.
var MAX_LENGTH_FOR_NSN = 17;

// The maximum length of the country calling code.
var MAX_LENGTH_COUNTRY_CODE = 3;

// Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).
var VALID_DIGITS = '0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9';

// `DASHES` will be right after the opening square bracket of the "character class"
var DASHES = '-\u2010-\u2015\u2212\u30FC\uFF0D';
var SLASHES = '\uFF0F/';
var DOTS = '\uFF0E.';
var WHITESPACE = ' \xA0\xAD\u200B\u2060\u3000';
var BRACKETS = '()\uFF08\uFF09\uFF3B\uFF3D\\[\\]';
// export const OPENING_BRACKETS = '(\uFF08\uFF3B\\\['
var TILDES = '~\u2053\u223C\uFF5E';

// Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.
var VALID_PUNCTUATION = '' + DASHES + SLASHES + DOTS + WHITESPACE + BRACKETS + TILDES;

var PLUS_CHARS = '+\uFF0B';
// const LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+')
//# sourceMappingURL=constants.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchesEntirely", function() { return matchesEntirely; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArrays", function() { return mergeArrays; });
// Checks whether the entire input sequence can be matched
// against the regular expression.
function matchesEntirely() {
	var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var regular_expression = arguments[1];

	return new RegExp('^(?:' + regular_expression + ')$').test(text);
}

/**
 * Merges two arrays.
 * @param  {*} a
 * @param  {*} b
 * @return {*}
 */
function mergeArrays(a, b) {
	var merged = a.slice();

	for (var _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var element = _ref;

		if (a.indexOf(element) < 0) {
			merged.push(element);
		}
	}

	return merged.sort(function (a, b) {
		return a - b;
	});

	// ES6 version, requires Set polyfill.
	// let merged = new Set(a)
	// for (const element of b)
	// {
	// 	merged.add(i)
	// }
	// return Array.from(merged).sort((a, b) => a - b)
}
//# sourceMappingURL=util.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://stackoverflow.com/a/46971044/970769
var ParseError = function ParseError(code) {
  _classCallCheck(this, ParseError);

  this.name = this.constructor.name;
  this.message = code;
  this.stack = new Error(code).stack;
};

/* harmony default export */ __webpack_exports__["default"] = (ParseError);


ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;
//# sourceMappingURL=ParseError.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMetadata", function() { return validateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtPrefix", function() { return getExtPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCode", function() { return getCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportedCountry", function() { return isSupportedCountry; });
/* harmony import */ var semver_compare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var semver_compare__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semver_compare__WEBPACK_IMPORTED_MODULE_0__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// Added "possibleLengths" and renamed
// "country_phone_code_to_countries" to "country_calling_codes".
var V2 = '1.0.18';

// Added "idd_prefix" and "default_idd_prefix".
var V3 = '1.2.0';

var DEFAULT_EXT_PREFIX = ' ext. ';

var Metadata = function () {
	function Metadata(metadata) {
		_classCallCheck(this, Metadata);

		validateMetadata(metadata);

		this.metadata = metadata;

		this.v1 = !metadata.version;
		this.v2 = metadata.version !== undefined && semver_compare__WEBPACK_IMPORTED_MODULE_0___default()(metadata.version, V3) === -1;
		this.v3 = metadata.version !== undefined; // && compare(metadata.version, V4) === -1
	}

	_createClass(Metadata, [{
		key: 'hasCountry',
		value: function hasCountry(country) {
			return this.metadata.countries[country] !== undefined;
		}
	}, {
		key: 'country',
		value: function country(_country) {
			if (!_country) {
				this._country = undefined;
				this.country_metadata = undefined;
				return this;
			}

			if (!this.hasCountry(_country)) {
				throw new Error('Unknown country: ' + _country);
			}

			this._country = _country;
			this.country_metadata = this.metadata.countries[_country];
			return this;
		}
	}, {
		key: 'getDefaultCountryMetadataForRegion',
		value: function getDefaultCountryMetadataForRegion() {
			return this.metadata.countries[this.countryCallingCodes()[this.countryCallingCode()][0]];
		}
	}, {
		key: 'countryCallingCode',
		value: function countryCallingCode() {
			return this.country_metadata[0];
		}
	}, {
		key: 'IDDPrefix',
		value: function IDDPrefix() {
			if (this.v1 || this.v2) return;
			return this.country_metadata[1];
		}
	}, {
		key: 'defaultIDDPrefix',
		value: function defaultIDDPrefix() {
			if (this.v1 || this.v2) return;
			return this.country_metadata[12];
		}
	}, {
		key: 'nationalNumberPattern',
		value: function nationalNumberPattern() {
			if (this.v1 || this.v2) return this.country_metadata[1];
			return this.country_metadata[2];
		}
	}, {
		key: 'possibleLengths',
		value: function possibleLengths() {
			if (this.v1) return;
			return this.country_metadata[this.v2 ? 2 : 3];
		}
	}, {
		key: '_getFormats',
		value: function _getFormats(country_metadata) {
			return country_metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
		}

		// For countries of the same region (e.g. NANPA)
		// formats are all stored in the "main" country for that region.
		// E.g. "RU" and "KZ", "US" and "CA".

	}, {
		key: 'formats',
		value: function formats() {
			var _this = this;

			var formats = this._getFormats(this.country_metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
			return formats.map(function (_) {
				return new Format(_, _this);
			});
		}
	}, {
		key: 'nationalPrefix',
		value: function nationalPrefix() {
			return this.country_metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
		}
	}, {
		key: '_getNationalPrefixFormattingRule',
		value: function _getNationalPrefixFormattingRule(country_metadata) {
			return country_metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
		}

		// For countries of the same region (e.g. NANPA)
		// national prefix formatting rule is stored in the "main" country for that region.
		// E.g. "RU" and "KZ", "US" and "CA".

	}, {
		key: 'nationalPrefixFormattingRule',
		value: function nationalPrefixFormattingRule() {
			return this._getNationalPrefixFormattingRule(this.country_metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
		}
	}, {
		key: 'nationalPrefixForParsing',
		value: function nationalPrefixForParsing() {
			// If `national_prefix_for_parsing` is not set explicitly,
			// then infer it from `national_prefix` (if any)
			return this.country_metadata[this.v1 ? 5 : this.v2 ? 6 : 7] || this.nationalPrefix();
		}
	}, {
		key: 'nationalPrefixTransformRule',
		value: function nationalPrefixTransformRule() {
			return this.country_metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
		}
	}, {
		key: '_getNationalPrefixIsOptionalWhenFormatting',
		value: function _getNationalPrefixIsOptionalWhenFormatting() {
			return !!this.country_metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
		}

		// For countries of the same region (e.g. NANPA)
		// "national prefix is optional when parsing" flag is
		// stored in the "main" country for that region.
		// E.g. "RU" and "KZ", "US" and "CA".

	}, {
		key: 'nationalPrefixIsOptionalWhenFormatting',
		value: function nationalPrefixIsOptionalWhenFormatting() {
			return this._getNationalPrefixIsOptionalWhenFormatting(this.country_metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
		}
	}, {
		key: 'leadingDigits',
		value: function leadingDigits() {
			return this.country_metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
		}
	}, {
		key: 'types',
		value: function types() {
			return this.country_metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
		}
	}, {
		key: 'hasTypes',
		value: function hasTypes() {
			// Versions 1.2.0 - 1.2.4: can be `[]`.
			/* istanbul ignore next */
			if (this.types() && this.types().length === 0) {
				return false;
			}
			// Versions <= 1.2.4: can be `undefined`.
			// Version >= 1.2.5: can be `0`.
			return !!this.types();
		}
	}, {
		key: 'type',
		value: function type(_type) {
			if (this.hasTypes() && getType(this.types(), _type)) {
				return new Type(getType(this.types(), _type), this);
			}
		}
	}, {
		key: 'ext',
		value: function ext() {
			if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
			return this.country_metadata[13] || DEFAULT_EXT_PREFIX;
		}
	}, {
		key: 'countryCallingCodes',
		value: function countryCallingCodes() {
			if (this.v1) return this.metadata.country_phone_code_to_countries;
			return this.metadata.country_calling_codes;
		}

		// Formatting information for regions which share
		// a country calling code is contained by only one region
		// for performance reasons. For example, for NANPA region
		// ("North American Numbering Plan Administration",
		//  which includes USA, Canada, Cayman Islands, Bahamas, etc)
		// it will be contained in the metadata for `US`.
		//
		// `country_calling_code` is always valid.
		// But the actual country may not necessarily be part of the metadata.
		//

	}, {
		key: 'chooseCountryByCountryCallingCode',
		value: function chooseCountryByCountryCallingCode(country_calling_code) {
			var country = this.countryCallingCodes()[country_calling_code][0];

			// Do not want to test this case.
			// (custom metadata, not all countries).
			/* istanbul ignore else */
			if (this.hasCountry(country)) {
				this.country(country);
			}
		}
	}, {
		key: 'selectedCountry',
		value: function selectedCountry() {
			return this._country;
		}
	}]);

	return Metadata;
}();

/* harmony default export */ __webpack_exports__["default"] = (Metadata);

var Format = function () {
	function Format(format, metadata) {
		_classCallCheck(this, Format);

		this._format = format;
		this.metadata = metadata;
	}

	_createClass(Format, [{
		key: 'pattern',
		value: function pattern() {
			return this._format[0];
		}
	}, {
		key: 'format',
		value: function format() {
			return this._format[1];
		}
	}, {
		key: 'leadingDigitsPatterns',
		value: function leadingDigitsPatterns() {
			return this._format[2] || [];
		}
	}, {
		key: 'nationalPrefixFormattingRule',
		value: function nationalPrefixFormattingRule() {
			return this._format[3] || this.metadata.nationalPrefixFormattingRule();
		}
	}, {
		key: 'nationalPrefixIsOptionalWhenFormatting',
		value: function nationalPrefixIsOptionalWhenFormatting() {
			return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormatting();
		}
	}, {
		key: 'nationalPrefixIsMandatoryWhenFormatting',
		value: function nationalPrefixIsMandatoryWhenFormatting() {
			// National prefix is omitted if there's no national prefix formatting rule
			// set for this country, or when the national prefix formatting rule
			// contains no national prefix itself, or when this rule is set but
			// national prefix is optional for this phone number format
			// (and it is not enforced explicitly)
			return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormatting();
		}

		// Checks whether national prefix formatting rule contains national prefix.

	}, {
		key: 'usesNationalPrefix',
		value: function usesNationalPrefix() {
			return this.nationalPrefixFormattingRule() &&
			// Check that national prefix formatting rule is not a dummy one.
			this.nationalPrefixFormattingRule() !== '$1' &&
			// Check that national prefix formatting rule actually has national prefix digit(s).
			/\d/.test(this.nationalPrefixFormattingRule().replace('$1', ''));
		}
	}, {
		key: 'internationalFormat',
		value: function internationalFormat() {
			return this._format[5] || this.format();
		}
	}]);

	return Format;
}();

var Type = function () {
	function Type(type, metadata) {
		_classCallCheck(this, Type);

		this.type = type;
		this.metadata = metadata;
	}

	_createClass(Type, [{
		key: 'pattern',
		value: function pattern() {
			if (this.metadata.v1) return this.type;
			return this.type[0];
		}
	}, {
		key: 'possibleLengths',
		value: function possibleLengths() {
			if (this.metadata.v1) return;
			return this.type[1] || this.metadata.possibleLengths();
		}
	}]);

	return Type;
}();

function getType(types, type) {
	switch (type) {
		case 'FIXED_LINE':
			return types[0];
		case 'MOBILE':
			return types[1];
		case 'TOLL_FREE':
			return types[2];
		case 'PREMIUM_RATE':
			return types[3];
		case 'PERSONAL_NUMBER':
			return types[4];
		case 'VOICEMAIL':
			return types[5];
		case 'UAN':
			return types[6];
		case 'PAGER':
			return types[7];
		case 'VOIP':
			return types[8];
		case 'SHARED_COST':
			return types[9];
	}
}

function validateMetadata(metadata) {
	if (!metadata) {
		throw new Error('[libphonenumber-js] `metadata` argument not passed. Check your arguments.');
	}

	// `country_phone_code_to_countries` was renamed to
	// `country_calling_codes` in `1.0.18`.
	if (!is_object(metadata) || !is_object(metadata.countries) || !is_object(metadata.country_calling_codes) && !is_object(metadata.country_phone_code_to_countries)) {
		throw new Error('[libphonenumber-js] `metadata` argument was passed but it\'s not a valid metadata. Must be an object having `.countries` and `.country_calling_codes` child object properties. Got ' + (is_object(metadata) ? 'an object of shape: { ' + Object.keys(metadata).join(', ') + ' }' : 'a ' + type_of(metadata) + ': ' + metadata) + '.');
	}
}

// Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".
/* istanbul ignore next */
var is_object = function is_object(_) {
	return (typeof _ === 'undefined' ? 'undefined' : _typeof(_)) === 'object';
};

// Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".
/* istanbul ignore next */
var type_of = function type_of(_) {
	return typeof _ === 'undefined' ? 'undefined' : _typeof(_);
};

/**
 * Returns extension prefix for a country.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string?}
 * @example
 * // Returns " ext. "
 * getExtPrefix("US")
 */
function getExtPrefix(country, metadata) {
	metadata = new Metadata(metadata);
	if (metadata.hasCountry(country)) {
		return metadata.country(country).ext();
	}
	return DEFAULT_EXT_PREFIX;
}

/**
 * Returns "country calling code" for a country.
 * Throws an error if the country doesn't exist or isn't supported by this library.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string}
 * @example
 * // Returns "44"
 * getCountryCallingCode("GB")
 */
function getCountryCallingCode(country, metadata) {
	metadata = new Metadata(metadata);
	if (metadata.hasCountry(country)) {
		return metadata.country(country).countryCallingCode();
	}
	throw new Error('Unknown country: ' + country);
}

function isSupportedCountry(country, metadata) {
	// metadata = new Metadata(metadata)
	// return metadata.hasCountry(country)
	return metadata.countries[country] !== undefined;
}
//# sourceMappingURL=metadata.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function cmp (a, b) {
    var pa = a.split('.');
    var pb = b.split('.');
    for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
    }
    return 0;
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isViablePhoneNumber; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);




//  Regular expression of viable phone numbers. This is location independent.
//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//
var MIN_LENGTH_PHONE_NUMBER_PATTERN = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{' + _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"] + '}';
//
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//
var VALID_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + ']{0,1}' + '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']*' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']' + '){3,}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']*';

// The combined regular expression for valid phone numbers:
//
var VALID_PHONE_NUMBER_PATTERN = new RegExp(
// Either a short two-digit-only phone number
'^' + MIN_LENGTH_PHONE_NUMBER_PATTERN + '$' + '|' +
// Or a longer fully parsed phone number (min 3 characters)
'^' + VALID_PHONE_NUMBER +
// Phone number extensions
'(?:' + _extension__WEBPACK_IMPORTED_MODULE_1__["EXTN_PATTERNS_FOR_PARSING"] + ')?' + '$', 'i');

// Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//
function isViablePhoneNumber(number) {
	return number.length >= _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"] && VALID_PHONE_NUMBER_PATTERN.test(number);
}
//# sourceMappingURL=isViablePhoneNumber.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTN_PATTERNS_FOR_PARSING", function() { return EXTN_PATTERNS_FOR_PARSING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTN_PATTERNS_FOR_MATCHING", function() { return EXTN_PATTERNS_FOR_MATCHING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractExtension", function() { return extractExtension; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


// The RFC 3966 format for extensions.
var RFC3966_EXTN_PREFIX = ';ext=';

// Pattern to capture digits used in an extension.
// Places a maximum length of '7' for an extension.
var CAPTURING_EXTN_DIGITS = '([' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{1,7})';

/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */
function create_extension_pattern(purpose) {
	// One-character symbols that can be used to indicate an extension.
	var single_extension_characters = 'x\uFF58#\uFF03~\uFF5E';

	switch (purpose) {
		// For parsing, we are slightly more lenient in our interpretation than for matching. Here we
		// allow "comma" and "semicolon" as possible extension indicators. When matching, these are
		case 'parsing':
			single_extension_characters = ',;' + single_extension_characters;
	}

	return RFC3966_EXTN_PREFIX + CAPTURING_EXTN_DIGITS + '|' + '[ \xA0\\t,]*' + '(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|' +
	// "доб."
	'\u0434\u043E\u0431|' + '[' + single_extension_characters + ']|int|anexo|\uFF49\uFF4E\uFF54)' + '[:\\.\uFF0E]?[ \xA0\\t,-]*' + CAPTURING_EXTN_DIGITS + '#?|' + '[- ]+([' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{1,5})#';
}

/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */
var EXTN_PATTERNS_FOR_PARSING = create_extension_pattern('parsing');

var EXTN_PATTERNS_FOR_MATCHING = create_extension_pattern('matching');

// Regexp of all known extension prefixes used by different regions followed by
// 1 or more valid digits, for use when parsing.
var EXTN_PATTERN = new RegExp('(?:' + EXTN_PATTERNS_FOR_PARSING + ')$', 'i');

// Strips any extension (as in, the part of the number dialled after the call is
// connected, usually indicated with extn, ext, x or similar) from the end of
// the number, and returns it.
function extractExtension(number) {
	var start = number.search(EXTN_PATTERN);
	if (start < 0) {
		return {};
	}

	// If we find a potential extension, and the number preceding this is a viable
	// number, we assume it is an extension.
	var number_without_extension = number.slice(0, start);

	var matches = number.match(EXTN_PATTERN);
	var i = 1;
	while (i < matches.length) {
		if (matches[i] != null && matches[i].length > 0) {
			return {
				number: number_without_extension,
				ext: matches[i]
			};
		}
		i++;
	}
}
//# sourceMappingURL=extension.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseIncompletePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberCharacter", function() { return parsePhoneNumberCharacter; });
/* harmony import */ var _parseDigits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);


/**
 * Parses phone number characters from a string.
 * Drops all punctuation leaving only digits and the leading `+` sign (if any).
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseIncompletePhoneNumber('8 (800) 555')
 * // Outputs '8800555'.
 * parseIncompletePhoneNumber('+7 800 555')
 * // Outputs '+7800555'.
 * ```
 */
function parseIncompletePhoneNumber(string) {
	var result = '';

	// Using `.split('')` here instead of normal `for ... of`
	// because the importing application doesn't neccessarily include an ES6 polyfill.
	// The `.split('')` approach discards "exotic" UTF-8 characters
	// (the ones consisting of four bytes) but digits
	// (including non-European ones) don't fall into that range
	// so such "exotic" characters would be discarded anyway.
	for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var character = _ref;

		result += parsePhoneNumberCharacter(character, result) || '';
	}

	return result;
}

/**
 * `input-format` `parse()` function.
 * https://github.com/catamphetamine/input-format
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string} value - The value parsed so far.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */
function parsePhoneNumberCharacter(character, value) {
	// Only allow a leading `+`.
	if (character === '+') {
		// If this `+` is not the first parsed character
		// then discard it.
		if (value) {
			return;
		}

		return '+';
	}

	// Allow digits.
	return Object(_parseDigits__WEBPACK_IMPORTED_MODULE_0__["parseDigit"])(character);
}
//# sourceMappingURL=parseIncompletePhoneNumber.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIGITS", function() { return DIGITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDigit", function() { return parseDigit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseDigits; });
// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
//
// E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
//
var DIGITS = {
	'0': '0',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	'6': '6',
	'7': '7',
	'8': '8',
	'9': '9',
	'\uFF10': '0', // Fullwidth digit 0
	'\uFF11': '1', // Fullwidth digit 1
	'\uFF12': '2', // Fullwidth digit 2
	'\uFF13': '3', // Fullwidth digit 3
	'\uFF14': '4', // Fullwidth digit 4
	'\uFF15': '5', // Fullwidth digit 5
	'\uFF16': '6', // Fullwidth digit 6
	'\uFF17': '7', // Fullwidth digit 7
	'\uFF18': '8', // Fullwidth digit 8
	'\uFF19': '9', // Fullwidth digit 9
	'\u0660': '0', // Arabic-indic digit 0
	'\u0661': '1', // Arabic-indic digit 1
	'\u0662': '2', // Arabic-indic digit 2
	'\u0663': '3', // Arabic-indic digit 3
	'\u0664': '4', // Arabic-indic digit 4
	'\u0665': '5', // Arabic-indic digit 5
	'\u0666': '6', // Arabic-indic digit 6
	'\u0667': '7', // Arabic-indic digit 7
	'\u0668': '8', // Arabic-indic digit 8
	'\u0669': '9', // Arabic-indic digit 9
	'\u06F0': '0', // Eastern-Arabic digit 0
	'\u06F1': '1', // Eastern-Arabic digit 1
	'\u06F2': '2', // Eastern-Arabic digit 2
	'\u06F3': '3', // Eastern-Arabic digit 3
	'\u06F4': '4', // Eastern-Arabic digit 4
	'\u06F5': '5', // Eastern-Arabic digit 5
	'\u06F6': '6', // Eastern-Arabic digit 6
	'\u06F7': '7', // Eastern-Arabic digit 7
	'\u06F8': '8', // Eastern-Arabic digit 8
	'\u06F9': '9' // Eastern-Arabic digit 9
};

function parseDigit(character) {
	return DIGITS[character];
}

/**
 * Parses phone number digits from a string.
 * Drops all punctuation leaving only digits.
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseDigits('8 (800) 555')
 * // Outputs '8800555'.
 * ```
 */
function parseDigits(string) {
	var result = '';

	// Using `.split('')` here instead of normal `for ... of`
	// because the importing application doesn't neccessarily include an ES6 polyfill.
	// The `.split('')` approach discards "exotic" UTF-8 characters
	// (the ones consisting of four bytes) but digits
	// (including non-European ones) don't fall into that range
	// so such "exotic" characters would be discarded anyway.
	for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var character = _ref;

		var digit = parseDigit(character);
		if (digit) {
			result += digit;
		}
	}

	return result;
}
//# sourceMappingURL=parseDigits.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _metadata__WEBPACK_IMPORTED_MODULE_0__["getCountryCallingCode"]; });

// Deprecated. Import from 'metadata.js' directly instead.

//# sourceMappingURL=getCountryCallingCode.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_of_type", function() { return is_of_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkNumberLengthForType", function() { return checkNumberLengthForType; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



var NON_FIXED_LINE_PHONE_TYPES = ['MOBILE', 'PREMIUM_RATE', 'TOLL_FREE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL'];

// Finds out national phone number type (fixed line, mobile, etc)
function getNumberType(input) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var metadata = arguments[2];

	// When `parse()` returned `{}`
	// meaning that the phone number is not a valid one.
	if (!input.country) {
		return;
	}

	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);

	if (!metadata.hasCountry(input.country)) {
		throw new Error('Unknown country: ' + input.country);
	}

	var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
	metadata.country(input.country);

	// The following is copy-pasted from the original function:
	// https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835

	// Is this national number even valid for this country
	if (!Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, metadata.nationalNumberPattern())) {
		return;
	}

	// Is it fixed line number
	if (is_of_type(nationalNumber, 'FIXED_LINE', metadata)) {
		// Because duplicate regular expressions are removed
		// to reduce metadata size, if "mobile" pattern is ""
		// then it means it was removed due to being a duplicate of the fixed-line pattern.
		//
		if (metadata.type('MOBILE') && metadata.type('MOBILE').pattern() === '') {
			return 'FIXED_LINE_OR_MOBILE';
		}

		// v1 metadata.
		// Legacy.
		// Deprecated.
		if (!metadata.type('MOBILE')) {
			return 'FIXED_LINE_OR_MOBILE';
		}

		// Check if the number happens to qualify as both fixed line and mobile.
		// (no such country in the minimal metadata set)
		/* istanbul ignore if */
		if (is_of_type(nationalNumber, 'MOBILE', metadata)) {
			return 'FIXED_LINE_OR_MOBILE';
		}

		return 'FIXED_LINE';
	}

	for (var _iterator = NON_FIXED_LINE_PHONE_TYPES, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var _type = _ref;

		if (is_of_type(nationalNumber, _type, metadata)) {
			return _type;
		}
	}
}

function is_of_type(nationalNumber, type, metadata) {
	type = metadata.type(type);

	if (!type || !type.pattern()) {
		return false;
	}

	// Check if any possible number lengths are present;
	// if so, we use them to avoid checking
	// the validation pattern if they don't match.
	// If they are absent, this means they match
	// the general description, which we have
	// already checked before a specific number type.
	if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
		return false;
	}

	return Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, type.pattern());
}

// Should only be called for the "new" metadata which has "possible lengths".
function checkNumberLengthForType(nationalNumber, type, metadata) {
	var type_info = metadata.type(type);

	// There should always be "<possiblePengths/>" set for every type element.
	// This is declared in the XML schema.
	// For size efficiency, where a sub-description (e.g. fixed-line)
	// has the same "<possiblePengths/>" as the "general description", this is missing,
	// so we fall back to the "general description". Where no numbers of the type
	// exist at all, there is one possible length (-1) which is guaranteed
	// not to match the length of any real phone number.
	var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths();
	// let local_lengths    = type_info && type.possibleLengthsLocal() || metadata.possibleLengthsLocal()

	if (type === 'FIXED_LINE_OR_MOBILE') {
		// No such country in metadata.
		/* istanbul ignore next */
		if (!metadata.type('FIXED_LINE')) {
			// The rare case has been encountered where no fixedLine data is available
			// (true for some non-geographical entities), so we just check mobile.
			return checkNumberLengthForType(nationalNumber, 'MOBILE', metadata);
		}

		var mobile_type = metadata.type('MOBILE');

		if (mobile_type) {
			// Merge the mobile data in if there was any. "Concat" creates a new
			// array, it doesn't edit possible_lengths in place, so we don't need a copy.
			// Note that when adding the possible lengths from mobile, we have
			// to again check they aren't empty since if they are this indicates
			// they are the same as the general desc and should be obtained from there.
			possible_lengths = Object(_util__WEBPACK_IMPORTED_MODULE_1__["mergeArrays"])(possible_lengths, mobile_type.possibleLengths());
			// The current list is sorted; we need to merge in the new list and
			// re-sort (duplicates are okay). Sorting isn't so expensive because
			// the lists are very small.

			// if (local_lengths)
			// {
			// 	local_lengths = mergeArrays(local_lengths, mobile_type.possibleLengthsLocal())
			// }
			// else
			// {
			// 	local_lengths = mobile_type.possibleLengthsLocal()
			// }
		}
	}
	// If the type doesn't exist then return 'INVALID_LENGTH'.
	else if (type && !type_info) {
			return 'INVALID_LENGTH';
		}

	var actual_length = nationalNumber.length;

	// In `libphonenumber-js` all "local-only" formats are dropped for simplicity.
	// // This is safe because there is never an overlap beween the possible lengths
	// // and the local-only lengths; this is checked at build time.
	// if (local_lengths && local_lengths.indexOf(nationalNumber.length) >= 0)
	// {
	// 	return 'IS_POSSIBLE_LOCAL_ONLY'
	// }

	var minimum_length = possible_lengths[0];

	if (minimum_length === actual_length) {
		return 'IS_POSSIBLE';
	}

	if (minimum_length > actual_length) {
		return 'TOO_SHORT';
	}

	if (possible_lengths[possible_lengths.length - 1] < actual_length) {
		return 'TOO_LONG';
	}

	// We skip the first element since we've already checked it.
	return possible_lengths.indexOf(actual_length, 1) >= 0 ? 'IS_POSSIBLE' : 'INVALID_LENGTH';
}
//# sourceMappingURL=getNumberType_.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPossibleNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_possible_number", function() { return is_possible_number; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);



function isPossibleNumber(input, options, metadata) {
	/* istanbul ignore if */
	if (options === undefined) {
		options = {};
	}

	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);

	if (options.v2) {
		if (!input.countryCallingCode) {
			throw new Error('Invalid phone number object passed');
		}
		metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
	} else {
		if (!input.phone) {
			return false;
		}
		if (input.country) {
			if (!metadata.hasCountry(input.country)) {
				throw new Error('Unknown country: ' + input.country);
			}
			metadata.country(input.country);
		} else {
			if (!input.countryCallingCode) {
				throw new Error('Invalid phone number object passed');
			}
			metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
		}
	}

	if (!metadata.possibleLengths()) {
		throw new Error('Metadata too old');
	}

	return is_possible_number(input.phone || input.nationalNumber, undefined, metadata);
}

function is_possible_number(national_number, is_international, metadata) {
	switch (Object(_getNumberType___WEBPACK_IMPORTED_MODULE_1__["checkNumberLengthForType"])(national_number, undefined, metadata)) {
		case 'IS_POSSIBLE':
			return true;
		// case 'IS_POSSIBLE_LOCAL_ONLY':
		// 	return !is_international
		default:
			return false;
	}
}
//# sourceMappingURL=isPossibleNumber_.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIDDPrefix", function() { return getIDDPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripIDDPrefix", function() { return stripIDDPrefix; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



var CAPTURING_DIGIT_PATTERN = new RegExp('([' + _constants__WEBPACK_IMPORTED_MODULE_1__["VALID_DIGITS"] + '])');

/**
 * Pattern that makes it easy to distinguish whether a region has a single
 * international dialing prefix or not. If a region has a single international
 * prefix (e.g. 011 in USA), it will be represented as a string that contains
 * a sequence of ASCII digits, and possibly a tilde, which signals waiting for
 * the tone. If there are multiple available international prefixes in a
 * region, they will be represented as a regex string that always contains one
 * or more characters that are not ASCII digits or a tilde.
 */
var SINGLE_IDD_PREFIX = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;

// For regions that have multiple IDD prefixes
// a preferred IDD prefix is returned.
function getIDDPrefix(country, metadata) {
	var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
	countryMetadata.country(country);

	if (SINGLE_IDD_PREFIX.test(countryMetadata.IDDPrefix())) {
		return countryMetadata.IDDPrefix();
	}

	return countryMetadata.defaultIDDPrefix();
}

function stripIDDPrefix(number, country, metadata) {
	if (!country) {
		return;
	}

	// Check if the number is IDD-prefixed.

	var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
	countryMetadata.country(country);

	var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());

	if (number.search(IDDPrefixPattern) !== 0) {
		return;
	}

	// Strip IDD prefix.
	number = number.slice(number.match(IDDPrefixPattern)[0].length);

	// Some kind of a weird edge case.
	// No explanation from Google given.
	var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
	/* istanbul ignore next */
	if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
		if (matchedGroups[1] === '0') {
			return;
		}
	}

	return number;
}
//# sourceMappingURL=IDD.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRFC3966", function() { return parseRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRFC3966", function() { return formatRFC3966; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



// https://www.ietf.org/rfc/rfc3966.txt

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */
function parseRFC3966(text) {
	var number = void 0;
	var ext = void 0;

	// Replace "tel:" with "tel=" for parsing convenience.
	text = text.replace(/^tel:/, 'tel=');

	for (var _iterator = text.split(';'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var part = _ref;

		var _part$split = part.split('='),
		    _part$split2 = _slicedToArray(_part$split, 2),
		    name = _part$split2[0],
		    value = _part$split2[1];

		switch (name) {
			case 'tel':
				number = value;
				break;
			case 'ext':
				ext = value;
				break;
			case 'phone-context':
				// Only "country contexts" are supported.
				// "Domain contexts" are ignored.
				if (value[0] === '+') {
					number = value + number;
				}
				break;
		}
	}

	// If the phone number is not viable, then abort.
	if (!Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(number)) {
		return {};
	}

	var result = { number: number };
	if (ext) {
		result.ext = ext;
	}
	return result;
}

/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */
function formatRFC3966(_ref2) {
	var number = _ref2.number,
	    ext = _ref2.ext;

	if (!number) {
		return '';
	}

	if (number[0] !== '+') {
		throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
	}

	return 'tel:' + number + (ext ? ';ext=' + ext : '');
}
//# sourceMappingURL=RFC3966.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var PhoneNumber = function () {
	function PhoneNumber(countryCallingCode, nationalNumber, metadata) {
		_classCallCheck(this, PhoneNumber);

		if (!countryCallingCode) {
			throw new TypeError('`countryCallingCode` not passed');
		}
		if (!nationalNumber) {
			throw new TypeError('`nationalNumber` not passed');
		}
		// If country code is passed then derive `countryCallingCode` from it.
		// Also store the country code as `.country`.
		if (isCountryCode(countryCallingCode)) {
			this.country = countryCallingCode;
			var _metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
			_metadata.country(countryCallingCode);
			countryCallingCode = _metadata.countryCallingCode();
		}
		this.countryCallingCode = countryCallingCode;
		this.nationalNumber = nationalNumber;
		this.number = '+' + this.countryCallingCode + this.nationalNumber;
		this.metadata = metadata;
	}

	_createClass(PhoneNumber, [{
		key: 'isPossible',
		value: function isPossible() {
			return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__["default"])(this, { v2: true }, this.metadata);
		}
	}, {
		key: 'isValid',
		value: function isValid() {
			return Object(_validate___WEBPACK_IMPORTED_MODULE_2__["default"])(this, { v2: true }, this.metadata);
		}

		// // Is just an alias for `this.isValid() && this.country === country`.
		// // https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
		// isValidForRegion(country) {
		// 	return isValidNumberForRegion(this, country, { v2: true }, this.metadata)
		// }

	}, {
		key: 'getType',
		value: function getType() {
			return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_4__["default"])(this, { v2: true }, this.metadata);
		}
	}, {
		key: 'format',
		value: function format(_format, options) {
			return Object(_format___WEBPACK_IMPORTED_MODULE_5__["default"])(this, _format, options ? _extends({}, options, { v2: true }) : { v2: true }, this.metadata);
		}
	}, {
		key: 'formatNational',
		value: function formatNational(options) {
			return this.format('NATIONAL', options);
		}
	}, {
		key: 'formatInternational',
		value: function formatInternational(options) {
			return this.format('INTERNATIONAL', options);
		}
	}, {
		key: 'getURI',
		value: function getURI(options) {
			return this.format('RFC3966', options);
		}
	}]);

	return PhoneNumber;
}();

/* harmony default export */ __webpack_exports__["default"] = (PhoneNumber);


var isCountryCode = function isCountryCode(value) {
	return (/^[A-Z]{2}$/.test(value)
	);
};
//# sourceMappingURL=PhoneNumber.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);




/**
 * Checks if a given phone number is valid.
 *
 * If the `number` is a string, it will be parsed to an object,
 * but only if it contains only valid phone number characters (including punctuation).
 * If the `number` is an object, it is used as is.
 *
 * The optional `defaultCountry` argument is the default country.
 * I.e. it does not restrict to just that country,
 * e.g. in those cases where several countries share
 * the same phone numbering rules (NANPA, Britain, etc).
 * For example, even though the number `07624 369230`
 * belongs to the Isle of Man ("IM" country code)
 * calling `isValidNumber('07624369230', 'GB', metadata)`
 * still returns `true` because the country is not restricted to `GB`,
 * it's just that `GB` is the default one for the phone numbering rules.
 * For restricting the country see `isValidNumberForRegion()`
 * though restricting a country might not be a good idea.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 *
 * Examples:
 *
 * ```js
 * isValidNumber('+78005553535', metadata)
 * isValidNumber('8005553535', 'RU', metadata)
 * isValidNumber('88005553535', 'RU', metadata)
 * isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */
function isValidNumber(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var metadata = arguments[2];

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);

  // This is just to support `isValidNumber({})`
  // for cases when `parseNumber()` returns `{}`.
  if (!input.country) {
    return false;
  }

  if (!metadata.hasCountry(input.country)) {
    throw new Error('Unknown country: ' + input.country);
  }

  metadata.country(input.country);

  // By default, countries only have type regexps when it's required for
  // distinguishing different countries having the same `countryCallingCode`.
  if (metadata.hasTypes()) {
    return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_2__["default"])(input, options, metadata.metadata) !== undefined;
  }

  // If there are no type regexps for this country in metadata then use
  // `nationalNumberPattern` as a "better than nothing" replacement.
  var national_number = options.v2 ? input.nationalNumber : input.phone;
  return Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(national_number, metadata.nationalNumberPattern());
}
//# sourceMappingURL=validate_.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumberForRegion; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);


/**
 * Checks if a given phone number is valid within a given region.
 * Is just an alias for `phoneNumber.isValid() && phoneNumber.country === country`.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 */
function isValidNumberForRegion(input, country) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var metadata = arguments[3];

  return input.country === country && Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(input, options, metadata);
}
//# sourceMappingURL=isValidNumberForRegion_.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_GROUP_PATTERN", function() { return FIRST_GROUP_PATTERN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format_national_number_using_format", function() { return format_national_number_using_format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choose_format_for_number", function() { return choose_format_for_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeInternationalFormatStyle", function() { return changeInternationalFormatStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatIDDSameCountryCallingCodeNumber", function() { return formatIDDSameCountryCallingCodeNumber; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _IDD__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _RFC3966__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js







var defaultOptions = {
	formatExtension: function formatExtension(formattedNumber, extension, metadata) {
		return '' + formattedNumber + metadata.ext() + extension;
	}

	// Formats a phone number
	//
	// Example use cases:
	//
	// ```js
	// formatNumber('8005553535', 'RU', 'INTERNATIONAL')
	// formatNumber('8005553535', 'RU', 'INTERNATIONAL', metadata)
	// formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL')
	// formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', metadata)
	// formatNumber('+78005553535', 'NATIONAL')
	// formatNumber('+78005553535', 'NATIONAL', metadata)
	// ```
	//
};function formatNumber(input, format, options, metadata) {
	// Apply default options.
	if (options) {
		options = _extends({}, defaultOptions, options);
	} else {
		options = defaultOptions;
	}

	metadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__["default"](metadata);

	if (input.country) {
		// Validate `input.country`.
		if (!metadata.hasCountry(input.country)) {
			throw new Error('Unknown country: ' + input.country);
		}
		metadata.country(input.country);
	} else if (input.countryCallingCode) {
		metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
	} else return input.phone || '';

	var countryCallingCode = metadata.countryCallingCode();

	var nationalNumber = options.v2 ? input.nationalNumber : input.phone;

	// This variable should have been declared inside `case`s
	// but Babel has a bug and it says "duplicate variable declaration".
	var number = void 0;

	switch (format) {
		case 'NATIONAL':
			// Legacy argument support.
			// (`{ country: ..., phone: '' }`)
			if (!nationalNumber) {
				return '';
			}
			number = format_national_number(nationalNumber, 'NATIONAL', metadata);
			return addExtension(number, input.ext, metadata, options.formatExtension);

		case 'INTERNATIONAL':
			// Legacy argument support.
			// (`{ country: ..., phone: '' }`)
			if (!nationalNumber) {
				return '+' + countryCallingCode;
			}
			number = format_national_number(nationalNumber, 'INTERNATIONAL', metadata);
			number = '+' + countryCallingCode + ' ' + number;
			return addExtension(number, input.ext, metadata, options.formatExtension);

		case 'E.164':
			// `E.164` doesn't define "phone number extensions".
			return '+' + countryCallingCode + nationalNumber;

		case 'RFC3966':
			return Object(_RFC3966__WEBPACK_IMPORTED_MODULE_4__["formatRFC3966"])({
				number: '+' + countryCallingCode + nationalNumber,
				ext: input.ext
			});

		case 'IDD':
			if (!options.fromCountry) {
				return;
				// throw new Error('`fromCountry` option not passed for IDD-prefixed formatting.')
			}
			var IDDPrefix = Object(_IDD__WEBPACK_IMPORTED_MODULE_3__["getIDDPrefix"])(options.fromCountry, metadata.metadata);
			if (!IDDPrefix) {
				return;
			}
			if (options.humanReadable) {
				var formattedForSameCountryCallingCode = countryCallingCode && formatIDDSameCountryCallingCodeNumber(nationalNumber, metadata.countryCallingCode(), options.fromCountry, metadata);
				if (formattedForSameCountryCallingCode) {
					number = formattedForSameCountryCallingCode;
				} else {
					number = IDDPrefix + ' ' + countryCallingCode + ' ' + format_national_number(nationalNumber, 'INTERNATIONAL', metadata);
				}
				return addExtension(number, input.ext, metadata, options.formatExtension);
			}
			return '' + IDDPrefix + countryCallingCode + nationalNumber;

		default:
			throw new Error('Unknown "format" argument passed to "formatNumber()": "' + format + '"');
	}
}

// This was originally set to $1 but there are some countries for which the
// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly.  Therefore, we use \d, so that the first
// group actually used in the pattern will be matched.
var FIRST_GROUP_PATTERN = /(\$\d)/;

function format_national_number_using_format(number, format, useInternationalFormat, includeNationalPrefixForNationalFormat, metadata) {
	var formattedNumber = number.replace(new RegExp(format.pattern()), useInternationalFormat ? format.internationalFormat() : format.nationalPrefixFormattingRule() && (!format.nationalPrefixIsOptionalWhenFormatting() || includeNationalPrefixForNationalFormat) ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format());

	if (useInternationalFormat) {
		return changeInternationalFormatStyle(formattedNumber);
	}

	return formattedNumber;
}

function format_national_number(number, format_as, metadata) {
	var format = choose_format_for_number(metadata.formats(), number);
	if (!format) {
		return number;
	}
	return format_national_number_using_format(number, format, format_as === 'INTERNATIONAL', true, metadata);
}

function choose_format_for_number(available_formats, national_number) {
	for (var _iterator = available_formats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var format = _ref;

		// Validate leading digits
		if (format.leadingDigitsPatterns().length > 0) {
			// The last leading_digits_pattern is used here, as it is the most detailed
			var last_leading_digits_pattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1];

			// If leading digits don't match then move on to the next phone number format
			if (national_number.search(last_leading_digits_pattern) !== 0) {
				continue;
			}
		}

		// Check that the national number matches the phone number format regular expression
		if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(national_number, format.pattern())) {
			return format;
		}
	}
}

// Removes brackets and replaces dashes with spaces.
//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
// For some reason Google's metadata contains `<intlFormat/>`s with brackets and dashes.
// Meanwhile, there's no single opinion about using punctuation in international phone numbers.
//
// For example, Google's `<intlFormat/>` for USA is `+1 213-373-4253`.
// And here's a quote from WikiPedia's "North American Numbering Plan" page:
// https://en.wikipedia.org/wiki/North_American_Numbering_Plan
//
// "The country calling code for all countries participating in the NANP is 1.
// In international format, an NANP number should be listed as +1 301 555 01 00,
// where 301 is an area code (Maryland)."
//
// I personally prefer the international format without any punctuation.
// For example, brackets are remnants of the old age, meaning that the
// phone number part in brackets (so called "area code") can be omitted
// if dialing within the same "area".
// And hyphens were clearly introduced for splitting local numbers into memorizable groups.
// For example, remembering "5553535" is difficult but "555-35-35" is much simpler.
// Imagine a man taking a bus from home to work and seeing an ad with a phone number.
// He has a couple of seconds to memorize that number until it passes by.
// If it were spaces instead of hyphens the man wouldn't necessarily get it,
// but with hyphens instead of spaces the grouping is more explicit.
// I personally think that hyphens introduce visual clutter,
// so I prefer replacing them with spaces in international numbers.
// In the modern age all output is done on displays where spaces are clearly distinguishable
// so hyphens can be safely replaced with spaces without losing any legibility.
//
function changeInternationalFormatStyle(local) {
	return local.replace(new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']+', 'g'), ' ').trim();
}

function addExtension(formattedNumber, ext, metadata, formatExtension) {
	return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}

function formatIDDSameCountryCallingCodeNumber(number, toCountryCallingCode, fromCountry, toCountryMetadata) {
	var fromCountryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__["default"](toCountryMetadata.metadata);
	fromCountryMetadata.country(fromCountry);

	// If calling within the same country calling code.
	if (toCountryCallingCode === fromCountryMetadata.countryCallingCode()) {
		// For NANPA regions, return the national format for these regions
		// but prefix it with the country calling code.
		if (toCountryCallingCode === '1') {
			return toCountryCallingCode + ' ' + format_national_number(number, 'NATIONAL', toCountryMetadata);
		}

		// If regions share a country calling code, the country calling code need
		// not be dialled. This also applies when dialling within a region, so this
		// if clause covers both these cases. Technically this is the case for
		// dialling from La Reunion to other overseas departments of France (French
		// Guiana, Martinique, Guadeloupe), but not vice versa - so we don't cover
		// this edge case for now and for those cases return the version including
		// country calling code. Details here:
		// http://www.petitfute.com/voyage/225-info-pratiques-reunion
		//
		return format_national_number(number, 'NATIONAL', toCountryMetadata);
	}
}
//# sourceMappingURL=format_.js.map

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);



function parsePhoneNumberFromString() {
	var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__["default"])(text, options, metadata);
}
//# sourceMappingURL=parsePhoneNumberFromString.js.map

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





function parsePhoneNumberFromString(text, options, metadata) {
	// Validate `defaultCountry`.
	if (options && options.defaultCountry && !Object(_metadata__WEBPACK_IMPORTED_MODULE_2__["isSupportedCountry"])(options.defaultCountry, metadata)) {
		options = _extends({}, options, {
			defaultCountry: undefined
		});
	}
	// Parse phone number.
	try {
		return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
	} catch (error) {
		/* istanbul ignore else */
		if (error instanceof _ParseError__WEBPACK_IMPORTED_MODULE_1__["default"]) {
			//
		} else {
			throw error;
		}
	}
}
//# sourceMappingURL=parsePhoneNumberFromString_.js.map

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



// `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//
function parseNumber() {
	var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_parse___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
//# sourceMappingURL=parse.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatNumber; });
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();




function formatNumber() {
	var _normalizeArguments = normalizeArguments(arguments),
	    input = _normalizeArguments.input,
	    format = _normalizeArguments.format,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_format___WEBPACK_IMPORTED_MODULE_0__["default"])(input, format, options, metadata);
}

// Sort out arguments
function normalizeArguments(args) {
	var _Array$prototype$slic = Array.prototype.slice.call(args),
	    _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 5),
	    arg_1 = _Array$prototype$slic2[0],
	    arg_2 = _Array$prototype$slic2[1],
	    arg_3 = _Array$prototype$slic2[2],
	    arg_4 = _Array$prototype$slic2[3],
	    arg_5 = _Array$prototype$slic2[4];

	var input = void 0;
	var format = void 0;
	var options = void 0;
	var metadata = void 0;

	// Sort out arguments.

	// If the phone number is passed as a string.
	// `format('8005553535', ...)`.
	if (typeof arg_1 === 'string') {
		// If country code is supplied.
		// `format('8005553535', 'RU', 'NATIONAL', [options], metadata)`.
		if (typeof arg_3 === 'string') {
			format = arg_3;

			if (arg_5) {
				options = arg_4;
				metadata = arg_5;
			} else {
				metadata = arg_4;
			}

			input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(arg_1, { defaultCountry: arg_2, extended: true }, metadata);
		}
		// Just an international phone number is supplied
		// `format('+78005553535', 'NATIONAL', [options], metadata)`.
		else {
				if (typeof arg_2 !== 'string') {
					throw new Error('`format` argument not passed to `formatNumber(number, format)`');
				}

				format = arg_2;

				if (arg_4) {
					options = arg_3;
					metadata = arg_4;
				} else {
					metadata = arg_3;
				}

				input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(arg_1, { extended: true }, metadata);
			}
	}
	// If the phone number is passed as a parsed number object.
	// `format({ phone: '8005553535', country: 'RU' }, 'NATIONAL', [options], metadata)`.
	else if (is_object(arg_1)) {
			input = arg_1;
			format = arg_2;

			if (arg_4) {
				options = arg_3;
				metadata = arg_4;
			} else {
				metadata = arg_3;
			}
		} else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.');

	// Legacy lowercase formats.
	if (format === 'International') {
		format = 'INTERNATIONAL';
	} else if (format === 'National') {
		format = 'NATIONAL';
	}

	return {
		input: input,
		format: format,
		options: options,
		metadata: metadata
	};
}

// Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".
/* istanbul ignore next */
var is_object = function is_object(_) {
	return (typeof _ === 'undefined' ? 'undefined' : _typeof(_)) === 'object';
};
//# sourceMappingURL=format.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeArguments", function() { return normalizeArguments; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();





// Finds out national phone number type (fixed line, mobile, etc)
function getNumberType() {
	var _normalizeArguments = normalizeArguments(arguments),
	    input = _normalizeArguments.input,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_1__["default"])(input, options, metadata);
}

// Sort out arguments
function normalizeArguments(args) {
	var _Array$prototype$slic = Array.prototype.slice.call(args),
	    _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
	    arg_1 = _Array$prototype$slic2[0],
	    arg_2 = _Array$prototype$slic2[1],
	    arg_3 = _Array$prototype$slic2[2],
	    arg_4 = _Array$prototype$slic2[3];

	var input = void 0;
	var options = {};
	var metadata = void 0;

	// If the phone number is passed as a string.
	// `getNumberType('88005553535', ...)`.
	if (typeof arg_1 === 'string') {
		// If "default country" argument is being passed
		// then convert it to an `options` object.
		// `getNumberType('88005553535', 'RU', metadata)`.
		if ((typeof arg_2 === 'undefined' ? 'undefined' : _typeof(arg_2)) !== 'object') {
			if (arg_4) {
				options = arg_3;
				metadata = arg_4;
			} else {
				metadata = arg_3;
			}

			// `parse` extracts phone numbers from raw text,
			// therefore it will cut off all "garbage" characters,
			// while this `validate` function needs to verify
			// that the phone number contains no "garbage"
			// therefore the explicit `isViablePhoneNumber` check.
			if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(arg_1)) {
				input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(arg_1, { defaultCountry: arg_2 }, metadata);
			} else {
				input = {};
			}
		}
		// No "resrict country" argument is being passed.
		// International phone number is passed.
		// `getNumberType('+78005553535', metadata)`.
		else {
				if (arg_3) {
					options = arg_2;
					metadata = arg_3;
				} else {
					metadata = arg_2;
				}

				// `parse` extracts phone numbers from raw text,
				// therefore it will cut off all "garbage" characters,
				// while this `validate` function needs to verify
				// that the phone number contains no "garbage"
				// therefore the explicit `isViablePhoneNumber` check.
				if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(arg_1)) {
					input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(arg_1, undefined, metadata);
				} else {
					input = {};
				}
			}
	}
	// If the phone number is passed as a parsed phone number.
	// `getNumberType({ phone: '88005553535', country: 'RU' }, ...)`.
	else if (is_object(arg_1)) {
			input = arg_1;

			if (arg_3) {
				options = arg_2;
				metadata = arg_3;
			} else {
				metadata = arg_2;
			}
		} else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.');

	return {
		input: input,
		options: options,
		metadata: metadata
	};
}

// Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".
/* istanbul ignore next */
var is_object = function is_object(_) {
	return (typeof _ === 'undefined' ? 'undefined' : _typeof(_)) === 'object';
};
//# sourceMappingURL=getNumberType.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getExampleNumber; });
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);


function getExampleNumber(country, examples, metadata) {
	if (examples[country]) {
		return new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"](country, examples[country], metadata);
	}
}
//# sourceMappingURL=getExampleNumber.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPossibleNumber; });
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);



/**
 * Checks if a given phone number is possible.
 * Which means it only checks phone number length
 * and doesn't test any regular expressions.
 *
 * Examples:
 *
 * ```js
 * isPossibleNumber('+78005553535', metadata)
 * isPossibleNumber('8005553535', 'RU', metadata)
 * isPossibleNumber('88005553535', 'RU', metadata)
 * isPossibleNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */
function isPossibleNumber() {
  var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__["default"])(input, options, metadata);
}
//# sourceMappingURL=isPossibleNumber.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumber; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);



// Finds out national phone number type (fixed line, mobile, etc)
function isValidNumber() {
	var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
	    input = _normalizeArguments.input,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(input, options, metadata);
}
//# sourceMappingURL=validate.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumberForRegion; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);




function isValidNumberForRegion(number, country, metadata) {
	if (typeof number !== 'string') {
		throw new TypeError('number must be a string');
	}

	if (typeof country !== 'string') {
		throw new TypeError('country must be a string');
	}

	// `parse` extracts phone numbers from raw text,
	// therefore it will cut off all "garbage" characters,
	// while this `validate` function needs to verify
	// that the phone number contains no "garbage"
	// therefore the explicit `isViablePhoneNumber` check.
	var input = void 0;
	if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(number)) {
		input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(number, { defaultCountry: country }, metadata);
	} else {
		input = {};
	}

	return Object(_isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__["default"])(input, country, undefined, metadata);
}
//# sourceMappingURL=isValidNumberForRegion.js.map

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony import */ var _findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
// This is a legacy function.
// Use `findNumbers()` instead.




function findPhoneNumbers() {
	var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}

/**
 * @return ES6 `for ... of` iterator.
 */
function searchPhoneNumbers() {
	var _normalizeArguments2 = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
	    text = _normalizeArguments2.text,
	    options = _normalizeArguments2.options,
	    metadata = _normalizeArguments2.metadata;

	return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__["searchPhoneNumbers"])(text, options, metadata);
}
//# sourceMappingURL=findPhoneNumbers.js.map

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearch", function() { return PhoneNumberSearch; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a legacy function.
// Use `findNumbers()` instead.











// Copy-pasted from `./parse.js`.
var VALID_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + ']{0,1}' + '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']*' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']' + '){3,}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']*';

var WHITESPACE_IN_THE_BEGINNING_PATTERN = new RegExp('^[' + _constants__WEBPACK_IMPORTED_MODULE_0__["WHITESPACE"] + ']+');
var PUNCTUATION_IN_THE_END_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']+$');

// // Regular expression for getting opening brackets for a valid number
// // found using `PHONE_NUMBER_START_PATTERN` for prepending those brackets to the number.
// const BEFORE_NUMBER_DIGITS_PUNCTUATION = new RegExp('[' + OPENING_BRACKETS + ']+' + '[' + WHITESPACE + ']*' + '$')

var VALID_PRECEDING_CHARACTER_PATTERN = /[^a-zA-Z0-9]/;

function findPhoneNumbers(text, options, metadata) {
	/* istanbul ignore if */
	if (options === undefined) {
		options = {};
	}

	var search = new PhoneNumberSearch(text, options, metadata);
	var phones = [];
	while (search.hasNext()) {
		phones.push(search.next());
	}
	return phones;
}

/**
 * @return ES6 `for ... of` iterator.
 */
function searchPhoneNumbers(text, options, metadata) {
	/* istanbul ignore if */
	if (options === undefined) {
		options = {};
	}

	var search = new PhoneNumberSearch(text, options, metadata);

	return _defineProperty({}, Symbol.iterator, function () {
		return {
			next: function next() {
				if (search.hasNext()) {
					return {
						done: false,
						value: search.next()
					};
				}
				return {
					done: true
				};
			}
		};
	});
}

/**
 * Extracts a parseable phone number including any opening brackets, etc.
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?startsAt, ?endsAt }`.
 */
var PhoneNumberSearch = function () {
	function PhoneNumberSearch(text) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var metadata = arguments[2];

		_classCallCheck(this, PhoneNumberSearch);

		this.state = 'NOT_READY';

		this.text = text;
		this.options = options;
		this.metadata = metadata;

		this.regexp = new RegExp(VALID_PHONE_NUMBER +
		// Phone number extensions
		'(?:' + _extension__WEBPACK_IMPORTED_MODULE_1__["EXTN_PATTERNS_FOR_PARSING"] + ')?', 'ig');

		// this.searching_from = 0
	}
	// Iteration tristate.


	_createClass(PhoneNumberSearch, [{
		key: 'find',
		value: function find() {
			var matches = this.regexp.exec(this.text);

			if (!matches) {
				return;
			}

			var number = matches[0];
			var startsAt = matches.index;

			number = number.replace(WHITESPACE_IN_THE_BEGINNING_PATTERN, '');
			startsAt += matches[0].length - number.length;
			// Fixes not parsing numbers with whitespace in the end.
			// Also fixes not parsing numbers with opening parentheses in the end.
			// https://github.com/catamphetamine/libphonenumber-js/issues/252
			number = number.replace(PUNCTUATION_IN_THE_END_PATTERN, '');

			number = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_3__["default"])(number);

			var result = this.parseCandidate(number, startsAt);

			if (result) {
				return result;
			}

			// Tail recursion.
			// Try the next one if this one is not a valid phone number.
			return this.find();
		}
	}, {
		key: 'parseCandidate',
		value: function parseCandidate(number, startsAt) {
			if (!Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_4__["default"])(number, startsAt, this.text)) {
				return;
			}

			// Don't parse phone numbers which are non-phone numbers
			// due to being part of something else (e.g. a UUID).
			// https://github.com/catamphetamine/libphonenumber-js/issues/213
			// Copy-pasted from Google's `PhoneNumberMatcher.js` (`.parseAndValidate()`).
			if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_5__["default"])(number, startsAt, this.text, this.options.extended ? 'POSSIBLE' : 'VALID')) {
				return;
			}

			// // Prepend any opening brackets left behind by the
			// // `PHONE_NUMBER_START_PATTERN` regexp.
			// const text_before_number = text.slice(this.searching_from, startsAt)
			// const full_number_starts_at = text_before_number.search(BEFORE_NUMBER_DIGITS_PUNCTUATION)
			// if (full_number_starts_at >= 0)
			// {
			// 	number   = text_before_number.slice(full_number_starts_at) + number
			// 	startsAt = full_number_starts_at
			// }
			//
			// this.searching_from = matches.lastIndex

			var result = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(number, this.options, this.metadata);

			if (!result.phone) {
				return;
			}

			result.startsAt = startsAt;
			result.endsAt = startsAt + number.length;

			return result;
		}
	}, {
		key: 'hasNext',
		value: function hasNext() {
			if (this.state === 'NOT_READY') {
				this.last_match = this.find();

				if (this.last_match) {
					this.state = 'READY';
				} else {
					this.state = 'DONE';
				}
			}

			return this.state === 'READY';
		}
	}, {
		key: 'next',
		value: function next() {
			// Check the state and find the next match as a side-effect if necessary.
			if (!this.hasNext()) {
				throw new Error('No next element');
			}

			// Don't retain that memory any longer than necessary.
			var result = this.last_match;
			this.last_match = null;
			this.state = 'NOT_READY';
			return result;
		}
	}]);

	return PhoneNumberSearch;
}();
//# sourceMappingURL=findPhoneNumbers_.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePreCandidate; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);


// Regular expression of characters typically used to start a second phone number for the purposes
// of parsing. This allows us to strip off parts of the number that are actually the start of
// another number, such as for: (530) 583-6985 x302/x2303 -> the second extension here makes this
// actually two phone numbers, (530) 583-6985 x302 and (530) 583-6985 x2303. We remove the second
// extension so that the first number is parsed correctly.
//
// Matches a slash (\ or /) followed by a space followed by an `x`.
//
var SECOND_NUMBER_START_PATTERN = /[\\/] *x/;

function parsePreCandidate(candidate) {
	// Check for extra numbers at the end.
	// TODO: This is the place to start when trying to support extraction of multiple phone number
	// from split notations (+41 79 123 45 67 / 68).
	return Object(_util__WEBPACK_IMPORTED_MODULE_0__["trimAfterFirstMatch"])(SECOND_NUMBER_START_PATTERN, candidate);
}
//# sourceMappingURL=parsePreCandidate.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limit", function() { return limit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimAfterFirstMatch", function() { return trimAfterFirstMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
/** Returns a regular expression quantifier with an upper and lower limit. */
function limit(lower, upper) {
	if (lower < 0 || upper <= 0 || upper < lower) {
		throw new TypeError();
	}
	return "{" + lower + "," + upper + "}";
}

/**
 * Trims away any characters after the first match of {@code pattern} in {@code candidate},
 * returning the trimmed version.
 */
function trimAfterFirstMatch(regexp, string) {
	var index = string.search(regexp);

	if (index >= 0) {
		return string.slice(0, index);
	}

	return string;
}

function startsWith(string, substring) {
	return string.indexOf(substring) === 0;
}

function endsWith(string, substring) {
	return string.indexOf(substring, string.length - substring.length) === string.length - substring.length;
}
//# sourceMappingURL=util.js.map

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidPreCandidate; });
// Matches strings that look like dates using "/" as a separator.
// Examples: 3/10/2011, 31/10/96 or 08/31/95.
var SLASH_SEPARATED_DATES = /(?:(?:[0-3]?\d\/[01]?\d)|(?:[01]?\d\/[0-3]?\d))\/(?:[12]\d)?\d{2}/;

// Matches timestamps.
// Examples: "2012-01-02 08:00".
// Note that the reg-ex does not include the
// trailing ":\d\d" -- that is covered by TIME_STAMPS_SUFFIX.
var TIME_STAMPS = /[12]\d{3}[-/]?[01]\d[-/]?[0-3]\d +[0-2]\d$/;
var TIME_STAMPS_SUFFIX_LEADING = /^:[0-5]\d/;

function isValidPreCandidate(candidate, offset, text) {
	// Skip a match that is more likely to be a date.
	if (SLASH_SEPARATED_DATES.test(candidate)) {
		return false;
	}

	// Skip potential time-stamps.
	if (TIME_STAMPS.test(candidate)) {
		var followingText = text.slice(offset + candidate.length);
		if (TIME_STAMPS_SUFFIX_LEADING.test(followingText)) {
			return false;
		}
	}

	return true;
}
//# sourceMappingURL=isValidPreCandidate.js.map

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEAD_CLASS", function() { return LEAD_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidCandidate; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _utf_8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
// Copy-pasted from `PhoneNumberMatcher.js`.






var OPENING_PARENS = '(\\[\uFF08\uFF3B';
var CLOSING_PARENS = ')\\]\uFF09\uFF3D';
var NON_PARENS = '[^' + OPENING_PARENS + CLOSING_PARENS + ']';

var LEAD_CLASS = '[' + OPENING_PARENS + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + ']';

// Punctuation that may be at the start of a phone number - brackets and plus signs.
var LEAD_CLASS_LEADING = new RegExp('^' + LEAD_CLASS);

// Limit on the number of pairs of brackets in a phone number.
var BRACKET_PAIR_LIMIT = Object(_util__WEBPACK_IMPORTED_MODULE_1__["limit"])(0, 3);

/**
 * Pattern to check that brackets match. Opening brackets should be closed within a phone number.
 * This also checks that there is something inside the brackets. Having no brackets at all is also
 * fine.
 *
 * An opening bracket at the beginning may not be closed, but subsequent ones should be.  It's
 * also possible that the leading bracket was dropped, so we shouldn't be surprised if we see a
 * closing bracket first. We limit the sets of brackets in a phone number to four.
 */
var MATCHING_BRACKETS_ENTIRE = new RegExp('^' + "(?:[" + OPENING_PARENS + "])?" + "(?:" + NON_PARENS + "+" + "[" + CLOSING_PARENS + "])?" + NON_PARENS + "+" + "(?:[" + OPENING_PARENS + "]" + NON_PARENS + "+[" + CLOSING_PARENS + "])" + BRACKET_PAIR_LIMIT + NON_PARENS + "*" + '$');

/**
 * Matches strings that look like publication pages. Example:
 * <pre>Computing Complete Answers to Queries in the Presence of Limited Access Patterns.
 * Chen Li. VLDB J. 12(3): 211-227 (2003).</pre>
 *
 * The string "211-227 (2003)" is not a telephone number.
 */
var PUB_PAGES = /\d{1,5}-+\d{1,5}\s{0,4}\(\d{1,4}/;

function isValidCandidate(candidate, offset, text, leniency) {
	// Check the candidate doesn't contain any formatting
	// which would indicate that it really isn't a phone number.
	if (!MATCHING_BRACKETS_ENTIRE.test(candidate) || PUB_PAGES.test(candidate)) {
		return;
	}

	// If leniency is set to VALID or stricter, we also want to skip numbers that are surrounded
	// by Latin alphabetic characters, to skip cases like abc8005001234 or 8005001234def.
	if (leniency !== 'POSSIBLE') {
		// If the candidate is not at the start of the text,
		// and does not start with phone-number punctuation,
		// check the previous character.
		if (offset > 0 && !LEAD_CLASS_LEADING.test(candidate)) {
			var previousChar = text[offset - 1];
			// We return null if it is a latin letter or an invalid punctuation symbol.
			if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isInvalidPunctuationSymbol"])(previousChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isLatinLetter"])(previousChar)) {
				return false;
			}
		}

		var lastCharIndex = offset + candidate.length;
		if (lastCharIndex < text.length) {
			var nextChar = text[lastCharIndex];
			if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isInvalidPunctuationSymbol"])(nextChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isLatinLetter"])(nextChar)) {
				return false;
			}
		}
	}

	return true;
}
//# sourceMappingURL=isValidCandidate.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pZ", function() { return pZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PZ", function() { return PZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_pN", function() { return _pN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pNd", function() { return pNd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_pL", function() { return _pL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLatinLetter", function() { return isLatinLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInvalidPunctuationSymbol", function() { return isInvalidPunctuationSymbol; });
// Javascript doesn't support UTF-8 regular expressions.
// So mimicking them here.

// Copy-pasted from `PhoneNumberMatcher.js`.

/**
 * "\p{Z}" is any kind of whitespace or invisible separator ("Separator").
 * http://www.regular-expressions.info/unicode.html
 * "\P{Z}" is the reverse of "\p{Z}".
 * "\p{N}" is any kind of numeric character in any script ("Number").
 * "\p{Nd}" is a digit zero through nine in any script except "ideographic scripts" ("Decimal_Digit_Number").
 * "\p{Sc}" is a currency symbol ("Currency_Symbol").
 * "\p{L}" is any kind of letter from any language ("Letter").
 * "\p{Mn}" is "non-spacing mark".
 *
 * Javascript doesn't support Unicode Regular Expressions
 * so substituting it with this explicit set of characters.
 *
 * https://stackoverflow.com/questions/13210194/javascript-regex-equivalent-of-a-za-z-using-pl
 * https://github.com/danielberndt/babel-plugin-utf-8-regex/blob/master/src/transformer.js
 */

var _pZ = ' \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000';
var pZ = '[' + _pZ + ']';
var PZ = '[^' + _pZ + ']';

var _pN = '0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19';
// const pN = `[${_pN}]`

var _pNd = '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19';
var pNd = '[' + _pNd + ']';

var _pL = 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
var pL = '[' + _pL + ']';
var pL_regexp = new RegExp(pL);

var _pSc = '$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6';
var pSc = '[' + _pSc + ']';
var pSc_regexp = new RegExp(pSc);

var _pMn = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u08FE\u0900-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26';
var pMn = '[' + _pMn + ']';
var pMn_regexp = new RegExp(pMn);

var _InBasic_Latin = '\0-\x7F';
var _InLatin_1_Supplement = '\x80-\xFF';
var _InLatin_Extended_A = '\u0100-\u017F';
var _InLatin_Extended_Additional = '\u1E00-\u1EFF';
var _InLatin_Extended_B = '\u0180-\u024F';
var _InCombining_Diacritical_Marks = '\u0300-\u036F';

var latinLetterRegexp = new RegExp('[' + _InBasic_Latin + _InLatin_1_Supplement + _InLatin_Extended_A + _InLatin_Extended_Additional + _InLatin_Extended_B + _InCombining_Diacritical_Marks + ']');

/**
 * Helper method to determine if a character is a Latin-script letter or not.
 * For our purposes, combining marks should also return true since we assume
 * they have been added to a preceding Latin character.
 */
function isLatinLetter(letter) {
  // Combining marks are a subset of non-spacing-mark.
  if (!pL_regexp.test(letter) && !pMn_regexp.test(letter)) {
    return false;
  }

  return latinLetterRegexp.test(letter);
}

function isInvalidPunctuationSymbol(character) {
  return character === '%' || pSc_regexp.test(character);
}
//# sourceMappingURL=utf-8.js.map

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findNumbers; });
/* harmony import */ var _findNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



function findNumbers() {
	var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	return Object(_findNumbers___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
//# sourceMappingURL=findNumbers.js.map

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findNumbers; });
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);


function findNumbers(text, options, metadata) {
	var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__["default"](text, options, metadata);
	var results = [];
	while (matcher.hasNext()) {
		results.push(matcher.next());
	}
	return results;
}
//# sourceMappingURL=findNumbers_.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _findNumbers_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
/* harmony import */ var _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);
/* harmony import */ var _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45);
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37);
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(39);
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A port of Google's `PhoneNumberMatcher.java`.
 * https://github.com/googlei18n/libphonenumber/blob/master/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberMatcher.java
 * Date: 08.03.2018.
 */




















/**
 * Patterns used to extract phone numbers from a larger phone-number-like pattern. These are
 * ordered according to specificity. For example, white-space is last since that is frequently
 * used in numbers, not just to separate two numbers. We have separate patterns since we don't
 * want to break up the phone-number-like text on more than one different kind of symbol at one
 * time, although symbols of the same type (e.g. space) can be safely grouped together.
 *
 * Note that if there is a match, we will always check any text found up to the first match as
 * well.
 */
var INNER_MATCHES = [
// Breaks on the slash - e.g. "651-234-2345/332-445-1234"
'\\/+(.*)/',

// Note that the bracket here is inside the capturing group, since we consider it part of the
// phone number. Will match a pattern like "(650) 223 3345 (754) 223 3321".
'(\\([^(]*)',

// Breaks on a hyphen - e.g. "12345 - 332-445-1234 is my number."
// We require a space on either side of the hyphen for it to be considered a separator.
'(?:' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + '-|-' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + ')' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + '*(.+)',

// Various types of wide hyphens. Note we have decided not to enforce a space here, since it's
// possible that it's supposed to be used to break two numbers without spaces, and we haven't
// seen many instances of it used within a number.
'[\u2012-\u2015\uFF0D]' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + '*(.+)',

// Breaks on a full stop - e.g. "12345. 332-445-1234 is my number."
'\\.+' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + '*([^.]+)',

// Breaks on space - e.g. "3324451234 8002341234"
_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pZ"] + '+(' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["PZ"] + '+)'];

// Limit on the number of leading (plus) characters.
var leadLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["limit"])(0, 2);

// Limit on the number of consecutive punctuation characters.
var punctuationLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["limit"])(0, 4);

/* The maximum number of digits allowed in a digit-separated block. As we allow all digits in a
 * single block, set high enough to accommodate the entire national number and the international
 * country code. */
var digitBlockLimit = _constants__WEBPACK_IMPORTED_MODULE_1__["MAX_LENGTH_FOR_NSN"] + _constants__WEBPACK_IMPORTED_MODULE_1__["MAX_LENGTH_COUNTRY_CODE"];

// Limit on the number of blocks separated by punctuation.
// Uses digitBlockLimit since some formats use spaces to separate each digit.
var blockLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["limit"])(0, digitBlockLimit);

/* A punctuation sequence allowing white space. */
var punctuation = '[' + _constants__WEBPACK_IMPORTED_MODULE_1__["VALID_PUNCTUATION"] + ']' + punctuationLimit;

// A digits block without punctuation.
var digitSequence = _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["pNd"] + Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["limit"])(1, digitBlockLimit);

/**
 * Phone number pattern allowing optional punctuation.
 * The phone number pattern used by `find()`, similar to
 * VALID_PHONE_NUMBER, but with the following differences:
 * <ul>
 *   <li>All captures are limited in order to place an upper bound to the text matched by the
 *       pattern.
 * <ul>
 *   <li>Leading punctuation / plus signs are limited.
 *   <li>Consecutive occurrences of punctuation are limited.
 *   <li>Number of digits is limited.
 * </ul>
 *   <li>No whitespace is allowed at the start or end.
 *   <li>No alpha digits (vanity numbers such as 1-800-SIX-FLAGS) are currently supported.
 * </ul>
 */
var PATTERN = '(?:' + _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_8__["LEAD_CLASS"] + punctuation + ')' + leadLimit + digitSequence + '(?:' + punctuation + digitSequence + ')' + blockLimit + '(?:' + _extension__WEBPACK_IMPORTED_MODULE_2__["EXTN_PATTERNS_FOR_MATCHING"] + ')?';

// Regular expression of trailing characters that we want to remove.
// We remove all characters that are not alpha or numerical characters.
// The hash character is retained here, as it may signify
// the previous block was an extension.
//
// // Don't know what does '&&' mean here.
// const UNWANTED_END_CHAR_PATTERN = new RegExp(`[[\\P{N}&&\\P{L}]&&[^#]]+$`)
//
var UNWANTED_END_CHAR_PATTERN = new RegExp('[^' + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["_pN"] + _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_4__["_pL"] + '#]+$');

var NON_DIGITS_PATTERN = /(\D+)/;

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

/**
 * A stateful class that finds and extracts telephone numbers from {@linkplain CharSequence text}.
 * Instances can be created using the {@linkplain PhoneNumberUtil#findNumbers factory methods} in
 * {@link PhoneNumberUtil}.
 *
 * <p>Vanity numbers (phone numbers using alphabetic digits such as <tt>1-800-SIX-FLAGS</tt> are
 * not found.
 *
 * <p>This class is not thread-safe.
 */

var PhoneNumberMatcher = function () {

  /**
   * Creates a new instance. See the factory methods in {@link PhoneNumberUtil} on how to obtain a
   * new instance.
   *
   * @param util  the phone number util to use
   * @param text  the character sequence that we will search, null for no text
   * @param country  the country to assume for phone numbers not written in international format
   *     (with a leading plus, or with the international dialing prefix of the specified region).
   *     May be null or "ZZ" if only numbers with a leading plus should be
   *     considered.
   * @param leniency  the leniency to use when evaluating candidate phone numbers
   * @param maxTries  the maximum number of invalid numbers to try before giving up on the text.
   *     This is to cover degenerate cases where the text has a lot of false positives in it. Must
   *     be {@code >= 0}.
   */

  /** The iteration tristate. */
  function PhoneNumberMatcher() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadata = arguments[2];

    _classCallCheck(this, PhoneNumberMatcher);

    this.state = 'NOT_READY';
    this.searchIndex = 0;

    options = _extends({}, options, {
      defaultCountry: options.defaultCountry && Object(_metadata__WEBPACK_IMPORTED_MODULE_9__["isSupportedCountry"])(options.defaultCountry, metadata) ? options.defaultCountry : undefined,
      leniency: options.leniency || options.extended ? 'POSSIBLE' : 'VALID',
      maxTries: options.maxTries || MAX_SAFE_INTEGER
    });

    if (!options.leniency) {
      throw new TypeError('`Leniency` not supplied');
    }

    if (options.maxTries < 0) {
      throw new TypeError('`maxTries` not supplied');
    }

    this.text = text;
    this.options = options;
    this.metadata = metadata;

    /** The degree of validation requested. */
    this.leniency = _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_5__["default"][options.leniency];

    if (!this.leniency) {
      throw new TypeError('Unknown leniency: ' + options.leniency + '.');
    }

    /** The maximum number of retries after matching an invalid number. */
    this.maxTries = options.maxTries;

    this.PATTERN = new RegExp(PATTERN, 'ig');
  }

  /**
   * Attempts to find the next subsequence in the searched sequence on or after {@code searchIndex}
   * that represents a phone number. Returns the next match, null if none was found.
   *
   * @param index  the search index to start searching at
   * @return  the phone number match found, null if none can be found
   */


  /** The next index to start searching at. Undefined in {@link State#DONE}. */


  _createClass(PhoneNumberMatcher, [{
    key: 'find',
    value: function find() // (index)
    {
      // // Reset the regular expression.
      // this.PATTERN.lastIndex = index

      var matches = void 0;
      while (this.maxTries > 0 && (matches = this.PATTERN.exec(this.text)) !== null) {
        var candidate = matches[0];
        var offset = matches.index;

        candidate = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_6__["default"])(candidate);

        if (Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_7__["default"])(candidate, offset, this.text)) {
          var match =
          // Try to come up with a valid match given the entire candidate.
          this.parseAndVerify(candidate, offset, this.text)
          // If that failed, try to find an "inner match" -
          // there might be a phone number within this candidate.
          || this.extractInnerMatch(candidate, offset, this.text);

          if (match) {
            if (this.options.v2) {
              var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"](match.country, match.phone, this.metadata);
              if (match.ext) {
                phoneNumber.ext = match.ext;
              }
              return {
                startsAt: match.startsAt,
                endsAt: match.endsAt,
                number: phoneNumber
              };
            }
            return match;
          }
        }

        this.maxTries--;
      }
    }

    /**
     * Attempts to extract a match from `candidate`
     * if the whole candidate does not qualify as a match.
     */

  }, {
    key: 'extractInnerMatch',
    value: function extractInnerMatch(candidate, offset, text) {
      for (var _iterator = INNER_MATCHES, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var innerMatchPattern = _ref;

        var isFirstMatch = true;
        var matches = void 0;
        var possibleInnerMatch = new RegExp(innerMatchPattern, 'g');
        while ((matches = possibleInnerMatch.exec(candidate)) !== null && this.maxTries > 0) {
          if (isFirstMatch) {
            // We should handle any group before this one too.
            var _group = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["trimAfterFirstMatch"])(UNWANTED_END_CHAR_PATTERN, candidate.slice(0, matches.index));

            var _match = this.parseAndVerify(_group, offset, text);
            if (_match) {
              return _match;
            }

            this.maxTries--;
            isFirstMatch = false;
          }

          var group = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_3__["trimAfterFirstMatch"])(UNWANTED_END_CHAR_PATTERN, matches[1]);

          // Java code does `groupMatcher.start(1)` here,
          // but there's no way in javascript to get a group match start index,
          // therefore using the overall match start index `matches.index`.
          var match = this.parseAndVerify(group, offset + matches.index, text);
          if (match) {
            return match;
          }

          this.maxTries--;
        }
      }
    }

    /**
     * Parses a phone number from the `candidate` using `parseNumber` and
     * verifies it matches the requested `leniency`. If parsing and verification succeed,
     * a corresponding `PhoneNumberMatch` is returned, otherwise this method returns `null`.
     *
     * @param candidate  the candidate match
     * @param offset  the offset of {@code candidate} within {@link #text}
     * @return  the parsed and validated phone number match, or null
     */

  }, {
    key: 'parseAndVerify',
    value: function parseAndVerify(candidate, offset, text) {
      if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_8__["default"])(candidate, offset, text, this.options.leniency)) {
        return;
      }

      var number = Object(_parse___WEBPACK_IMPORTED_MODULE_10__["default"])(candidate, {
        extended: true,
        defaultCountry: this.options.defaultCountry
      }, this.metadata);

      if (!number.possible) {
        return;
      }

      if (this.leniency(number, candidate, this.metadata)) {
        // // We used parseAndKeepRawInput to create this number,
        // // but for now we don't return the extra values parsed.
        // // TODO: stop clearing all values here and switch all users over
        // // to using rawInput() rather than the rawString() of PhoneNumberMatch.
        // number.clearCountryCodeSource()
        // number.clearRawInput()
        // number.clearPreferredDomesticCarrierCode()

        var result = {
          startsAt: offset,
          endsAt: offset + candidate.length,
          country: number.country,
          phone: number.phone
        };

        if (number.ext) {
          result.ext = number.ext;
        }

        return result;
      }
    }
  }, {
    key: 'hasNext',
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.lastMatch = this.find(); // (this.searchIndex)

        if (this.lastMatch) {
          // this.searchIndex = this.lastMatch.endsAt
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: 'next',
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      }

      // Don't retain that memory any longer than necessary.
      var result = this.lastMatch;
      this.lastMatch = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberMatcher;
}();

/* harmony default export */ __webpack_exports__["default"] = (PhoneNumberMatcher);
//# sourceMappingURL=PhoneNumberMatcher.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsMoreThanOneSlashInNationalNumber", function() { return containsMoreThanOneSlashInNationalNumber; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _parseDigits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);





/**
 * Leniency when finding potential phone numbers in text segments
 * The levels here are ordered in increasing strictness.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Phone numbers accepted are "possible", but not necessarily "valid".
   */
  POSSIBLE: function POSSIBLE(number, candidate, metadata) {
    return true;
  },


  /**
   * Phone numbers accepted are "possible" and "valid".
   * Numbers written in national format must have their national-prefix
   * present if it is usually written for a number of this type.
   */
  VALID: function VALID(number, candidate, metadata) {
    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidate.toString(), metadata)) {
      return false;
    }

    // Skipped for simplicity.
    // return isNationalPrefixPresentIfRequired(number, metadata)
    return true;
  },


  /**
   * Phone numbers accepted are "valid" and
   * are grouped in a possible way for this locale. For example, a US number written as
   * "65 02 53 00 00" and "650253 0000" are not accepted at this leniency level, whereas
   * "650 253 0000", "650 2530000" or "6502530000" are.
   * Numbers with more than one '/' symbol in the national significant number
   * are also dropped at this level.
   *
   * Warning: This level might result in lower coverage especially for regions outside of
   * country code "+1". If you are not sure about which level to use,
   * email the discussion group libphonenumber-discuss@googlegroups.com.
   */
  STRICT_GROUPING: function STRICT_GROUPING(number, candidate, metadata) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsRemainGrouped);
  },


  /**
   * Phone numbers accepted are {@linkplain PhoneNumberUtil#isValidNumber(PhoneNumber) valid} and
   * are grouped in the same way that we would have formatted it, or as a single block. For
   * example, a US number written as "650 2530000" is not accepted at this leniency level, whereas
   * "650 253 0000" or "6502530000" are.
   * Numbers with more than one '/' symbol are also dropped at this level.
   * <p>
   * Warning: This level might result in lower coverage especially for regions outside of country
   * code "+1". If you are not sure about which level to use, email the discussion group
   * libphonenumber-discuss@googlegroups.com.
   */
  EXACT_GROUPING: function EXACT_GROUPING(number, candidate, metadata) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsAreExactlyPresent);
  }
});

function containsOnlyValidXChars(number, candidate, metadata) {
  // The characters 'x' and 'X' can be (1) a carrier code, in which case they always precede the
  // national significant number or (2) an extension sign, in which case they always precede the
  // extension number. We assume a carrier code is more than 1 digit, so the first case has to
  // have more than 1 consecutive 'x' or 'X', whereas the second case can only have exactly 1 'x'
  // or 'X'. We ignore the character if it appears as the last character of the string.
  for (var index = 0; index < candidate.length - 1; index++) {
    var charAtIndex = candidate.charAt(index);

    if (charAtIndex === 'x' || charAtIndex === 'X') {
      var charAtNextIndex = candidate.charAt(index + 1);

      if (charAtNextIndex === 'x' || charAtNextIndex === 'X') {
        // This is the carrier code case, in which the 'X's always precede the national
        // significant number.
        index++;
        if (util.isNumberMatch(number, candidate.substring(index)) != MatchType.NSN_MATCH) {
          return false;
        }
        // This is the extension sign case, in which the 'x' or 'X' should always precede the
        // extension number.
      } else if (Object(_parseDigits__WEBPACK_IMPORTED_MODULE_1__["default"])(candidate.substring(index)) !== number.ext) {
        return false;
      }
    }
  }

  return true;
}

function isNationalPrefixPresentIfRequired(number, _metadata) {
  // First, check how we deduced the country code. If it was written in international format, then
  // the national prefix is not required.
  if (number.getCountryCodeSource() != 'FROM_DEFAULT_COUNTRY') {
    return true;
  }

  var phoneNumberRegion = util.getRegionCodeForCountryCode(number.getCountryCode());

  var metadata = util.getMetadataForRegion(phoneNumberRegion);
  if (metadata == null) {
    return true;
  }

  // Check if a national prefix should be present when formatting this number.
  var nationalNumber = util.getNationalSignificantNumber(number);
  var formatRule = util.chooseFormattingPatternForNumber(metadata.numberFormats(), nationalNumber);

  // To do this, we check that a national prefix formatting rule was present
  // and that it wasn't just the first-group symbol ($1) with punctuation.
  if (formatRule && formatRule.getNationalPrefixFormattingRule().length > 0) {
    if (formatRule.getNationalPrefixOptionalWhenFormatting()) {
      // The national-prefix is optional in these cases, so we don't need to check if it was
      // present.
      return true;
    }

    if (PhoneNumberUtil.formattingRuleHasFirstGroupOnly(formatRule.getNationalPrefixFormattingRule())) {
      // National Prefix not needed for this number.
      return true;
    }

    // Normalize the remainder.
    var rawInputCopy = PhoneNumberUtil.normalizeDigitsOnly(number.getRawInput());

    // Check if we found a national prefix and/or carrier code at the start of the raw input, and
    // return the result.
    return util.maybeStripNationalPrefixAndCarrierCode(rawInputCopy, metadata, null);
  }

  return true;
}

function containsMoreThanOneSlashInNationalNumber(number, candidate) {
  var firstSlashInBodyIndex = candidate.indexOf('/');
  if (firstSlashInBodyIndex < 0) {
    // No slashes, this is okay.
    return false;
  }

  // Now look for a second one.
  var secondSlashInBodyIndex = candidate.indexOf('/', firstSlashInBodyIndex + 1);
  if (secondSlashInBodyIndex < 0) {
    // Only one slash, this is okay.
    return false;
  }

  // If the first slash is after the country calling code, this is permitted.
  var candidateHasCountryCode = number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN || number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN;

  if (candidateHasCountryCode && PhoneNumberUtil.normalizeDigitsOnly(candidate.substring(0, firstSlashInBodyIndex)) === String(number.getCountryCode())) {
    // Any more slashes and this is illegal.
    return candidate.slice(secondSlashInBodyIndex + 1).indexOf('/') >= 0;
  }

  return true;
}

function checkNumberGroupingIsValid(number, candidate, metadata, checkGroups) {
  // TODO: Evaluate how this works for other locales (testing has been limited to NANPA regions)
  // and optimise if necessary.
  var normalizedCandidate = normalizeDigits(candidate, true /* keep non-digits */);
  var formattedNumberGroups = getNationalNumberGroups(metadata, number, null);
  if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
    return true;
  }

  // If this didn't pass, see if there are any alternate formats, and try them instead.
  var alternateFormats = MetadataManager.getAlternateFormatsForCountry(number.getCountryCode());

  if (alternateFormats) {
    for (var _iterator = alternateFormats.numberFormats(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alternateFormat = _ref;

      formattedNumberGroups = getNationalNumberGroups(metadata, number, alternateFormat);

      if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Helper method to get the national-number part of a number, formatted without any national
 * prefix, and return it as a set of digit blocks that would be formatted together.
 */
function getNationalNumberGroups(metadata, number, formattingPattern) {
  if (formattingPattern) {
    // We format the NSN only, and split that according to the separator.
    var nationalSignificantNumber = util.getNationalSignificantNumber(number);
    return util.formatNsnUsingPattern(nationalSignificantNumber, formattingPattern, 'RFC3966', metadata).split('-');
  }

  // This will be in the format +CC-DG;ext=EXT where DG represents groups of digits.
  var rfc3966Format = formatNumber(number, 'RFC3966', metadata);

  // We remove the extension part from the formatted string before splitting it into different
  // groups.
  var endIndex = rfc3966Format.indexOf(';');
  if (endIndex < 0) {
    endIndex = rfc3966Format.length;
  }

  // The country-code will have a '-' following it.
  var startIndex = rfc3966Format.indexOf('-') + 1;
  return rfc3966Format.slice(startIndex, endIndex).split('-');
}

function allNumberGroupsAreExactlyPresent(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var candidateGroups = normalizedCandidate.split(NON_DIGITS_PATTERN);

  // Set this to the last group, skipping it if the number has an extension.
  var candidateNumberGroupIndex = number.hasExtension() ? candidateGroups.length - 2 : candidateGroups.length - 1;

  // First we check if the national significant number is formatted as a block.
  // We use contains and not equals, since the national significant number may be present with
  // a prefix such as a national number prefix, or the country code itself.
  if (candidateGroups.length == 1 || candidateGroups[candidateNumberGroupIndex].contains(util.getNationalSignificantNumber(number))) {
    return true;
  }

  // Starting from the end, go through in reverse, excluding the first group, and check the
  // candidate and number groups are the same.
  var formattedNumberGroupIndex = formattedNumberGroups.length - 1;
  while (formattedNumberGroupIndex > 0 && candidateNumberGroupIndex >= 0) {
    if (candidateGroups[candidateNumberGroupIndex] !== formattedNumberGroups[formattedNumberGroupIndex]) {
      return false;
    }
    formattedNumberGroupIndex--;
    candidateNumberGroupIndex--;
  }

  // Now check the first group. There may be a national prefix at the start, so we only check
  // that the candidate group ends with the formatted number group.
  return candidateNumberGroupIndex >= 0 && Object(_util__WEBPACK_IMPORTED_MODULE_2__["endsWith"])(candidateGroups[candidateNumberGroupIndex], formattedNumberGroups[0]);
}

function allNumberGroupsRemainGrouped(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var fromIndex = 0;
  if (number.getCountryCodeSource() !== CountryCodeSource.FROM_DEFAULT_COUNTRY) {
    // First skip the country code if the normalized candidate contained it.
    var countryCode = String(number.getCountryCode());
    fromIndex = normalizedCandidate.indexOf(countryCode) + countryCode.length();
  }

  // Check each group of consecutive digits are not broken into separate groupings in the
  // {@code normalizedCandidate} string.
  for (var i = 0; i < formattedNumberGroups.length; i++) {
    // Fails if the substring of {@code normalizedCandidate} starting from {@code fromIndex}
    // doesn't contain the consecutive digits in formattedNumberGroups[i].
    fromIndex = normalizedCandidate.indexOf(formattedNumberGroups[i], fromIndex);
    if (fromIndex < 0) {
      return false;
    }
    // Moves {@code fromIndex} forward.
    fromIndex += formattedNumberGroups[i].length();
    if (i == 0 && fromIndex < normalizedCandidate.length()) {
      // We are at the position right after the NDC. We get the region used for formatting
      // information based on the country code in the phone number, rather than the number itself,
      // as we do not need to distinguish between different countries with the same country
      // calling code and this is faster.
      var region = util.getRegionCodeForCountryCode(number.getCountryCode());
      if (util.getNddPrefixForRegion(region, true) != null && Character.isDigit(normalizedCandidate.charAt(fromIndex))) {
        // This means there is no formatting symbol after the NDC. In this case, we only
        // accept the number if there is no formatting symbol at all in the number, except
        // for extensions. This is only important for countries with national prefixes.
        var nationalSignificantNumber = util.getNationalSignificantNumber(number);
        return Object(_util__WEBPACK_IMPORTED_MODULE_2__["startsWith"])(normalizedCandidate.slice(fromIndex - formattedNumberGroups[i].length), nationalSignificantNumber);
      }
    }
  }

  // The check here makes sure that we haven't mistakenly already used the extension to
  // match the last group of the subscriber number. Note the extension cannot have
  // formatting in-between digits.
  return normalizedCandidate.slice(fromIndex).contains(number.getExtension());
}
//# sourceMappingURL=Leniency.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return searchNumbers; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * @return ES6 `for ... of` iterator.
 */
function searchNumbers() {
	var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
	    text = _normalizeArguments.text,
	    options = _normalizeArguments.options,
	    metadata = _normalizeArguments.metadata;

	var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__["default"](text, options, metadata);

	return _defineProperty({}, Symbol.iterator, function () {
		return {
			next: function next() {
				if (matcher.hasNext()) {
					return {
						done: false,
						value: matcher.next()
					};
				}
				return {
					done: true
				};
			}
		};
	});
}
//# sourceMappingURL=searchNumbers.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIGIT_PLACEHOLDER", function() { return DIGIT_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strip_dangling_braces", function() { return strip_dangling_braces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cut_stripping_dangling_braces", function() { return cut_stripping_dangling_braces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close_dangling_braces", function() { return close_dangling_braces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count_occurences", function() { return count_occurences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18);
/* harmony import */ var _parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This is an enhanced port of Google Android `libphonenumber`'s
// `asyoutypeformatter.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/blob/8d21a365061de2ba0675c878a710a7b24f74d2ae/javascript/i18n/phonenumbers/asyoutypeformatter.js
//
// Simplified: does not differentiate between "local-only" numbers
// and "internationally dialable" numbers.
// For example, doesn't include changes like this:
// https://github.com/googlei18n/libphonenumber/commit/865da605da12b01053c4f053310bac7c5fbb7935

















// Used in phone number format template creation.
// Could be any digit, I guess.
var DUMMY_DIGIT = '9';
// I don't know why is it exactly `15`
var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15;
// Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.
var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH);

// The digits that have not been entered yet will be represented by a \u2008,
// the punctuation space.
var DIGIT_PLACEHOLDER = 'x'; // '\u2008' (punctuation space)
var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER);

// Deprecated: Google has removed some formatting pattern related code from their repo.
// https://github.com/googlei18n/libphonenumber/commit/a395b4fef3caf57c4bc5f082e1152a4d2bd0ba4c
// Because this library supports generating custom metadata
// some users may still be using old metadata so the relevant
// code seems to stay until some next major version update.
var SUPPORT_LEGACY_FORMATTING_PATTERNS = true;

// A pattern that is used to match character classes in regular expressions.
// An example of a character class is "[1-4]".
var CREATE_CHARACTER_CLASS_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
	return (/\[([^\[\]])*\]/g
	);
};

// Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.
var CREATE_STANDALONE_DIGIT_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
	return (/\d(?=[^,}][^,}])/g
	);
};

// A pattern that is used to determine if a `format` is eligible
// to be used by the "as you type formatter".
// It is eligible when the `format` contains groups of the dollar sign
// followed by a single digit, separated by valid phone number punctuation.
// This prevents invalid punctuation (such as the star sign in Israeli star numbers)
// getting into the output of the "as you type formatter".
var ELIGIBLE_FORMAT_PATTERN = new RegExp('^' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + ']*' + '(\\$\\d[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + ']*)+' + '$');

// This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.
var MIN_LEADING_DIGITS_LENGTH = 3;

var VALID_INCOMPLETE_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["PLUS_CHARS"] + ']{0,1}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_DIGITS"] + ']*';

var VALID_INCOMPLETE_PHONE_NUMBER_PATTERN = new RegExp('^' + VALID_INCOMPLETE_PHONE_NUMBER + '$', 'i');

var AsYouType = function () {

	/**
  * @param {string?} [defaultCountry] - The default country used for parsing non-international phone numbers.
  * @param {Object} metadata
  */
	function AsYouType(defaultCountry, metadata) {
		_classCallCheck(this, AsYouType);

		this.options = {};

		this.metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);

		if (defaultCountry && this.metadata.hasCountry(defaultCountry)) {
			this.defaultCountry = defaultCountry;
		}

		this.reset();
	}
	// Not setting `options` to a constructor argument
	// not to break backwards compatibility
	// for older versions of the library.


	_createClass(AsYouType, [{
		key: 'input',
		value: function input(text) {
			// Parse input

			var extracted_number = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extract_formatted_phone_number"])(text) || '';

			// Special case for a lone '+' sign
			// since it's not considered a possible phone number.
			if (!extracted_number) {
				if (text && text.indexOf('+') >= 0) {
					extracted_number = '+';
				}
			}

			// Validate possible first part of a phone number
			if (!VALID_INCOMPLETE_PHONE_NUMBER_PATTERN.test(extracted_number)) {
				return this.currentOutput;
			}

			return this.processInput(Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_7__["default"])(extracted_number));
		}
	}, {
		key: 'processInput',
		value: function processInput(input) {
			// If an out of position '+' sign detected
			// (or a second '+' sign),
			// then just drop it from the input.
			if (input[0] === '+') {
				if (!this.parsedInput) {
					this.parsedInput += '+';

					// If a default country was set
					// then reset it because an explicitly international
					// phone number is being entered
					this.resetCountriness();
				}

				input = input.slice(1);
			}

			// Raw phone number
			this.parsedInput += input;

			// // Reset phone number validation state
			// this.valid = false

			// Add digits to the national number
			this.nationalNumber += input;

			// TODO: Deprecated: rename `this.nationalNumber`
			// to `this.nationalNumber` and remove `.getNationalNumber()`.

			// Try to format the parsed input

			if (this.isInternational()) {
				if (!this.countryCallingCode) {
					// Extract country calling code from the digits entered so far.

					// There must be some digits in order to extract anything from them.
					if (!this.nationalNumber) {
						// Return raw phone number
						return this.parsedInput;
					}

					// If one looks at country phone codes
					// then he can notice that no one country phone code
					// is ever a (leftmost) substring of another country phone code.
					// So if a valid country code is extracted so far
					// then it means that this is the country code.

					// If no country phone code could be extracted so far,
					// then just return the raw phone number,
					// because it has no way of knowing
					// how to format the phone number so far.
					if (!this.extractCountryCallingCode()) {
						// Return raw phone number
						return this.parsedInput;
					}

					// Initialize country-specific data
					this.initialize_phone_number_formats_for_this_country_calling_code();
					this.resetFormat();
					this.determineTheCountry();
				}
				// `this.country` could be `undefined`,
				// for instance, when there is ambiguity
				// in a form of several different countries
				// each corresponding to the same country phone code
				// (e.g. NANPA: USA, Canada, etc),
				// and there's not enough digits entered
				// to reliably determine the country
				// the phone number belongs to.
				// Therefore, in cases of such ambiguity,
				// each time something is input,
				// try to determine the country
				// (if it's not determined yet).
				else if (!this.country) {
						this.determineTheCountry();
					}
			} else {
				// Some national prefixes are substrings of other national prefixes
				// (for the same country), therefore try to extract national prefix each time
				// because a longer national prefix might be available at some point in time.

				var previous_national_prefix = this.nationalPrefix;
				this.nationalNumber = this.nationalPrefix + this.nationalNumber;

				// Possibly extract a national prefix
				this.extractNationalPrefix();

				if (this.nationalPrefix !== previous_national_prefix) {
					// National number has changed
					// (due to another national prefix been extracted)
					// therefore national number has changed
					// therefore reset all previous formatting data.
					// (and leading digits matching state)
					this.matching_formats = undefined;
					this.resetFormat();
				}
			}

			// if (!this.shouldFormat())
			// {
			// 	return this.format_as_non_formatted_number()
			// }

			if (!this.nationalNumber) {
				return this.format_as_non_formatted_number();
			}

			// Check the available phone number formats
			// based on the currently available leading digits.
			this.match_formats_by_leading_digits();

			// Format the phone number (given the next digits)
			var formatted_national_phone_number = this.formatNationalNumber(input);

			// If the phone number could be formatted,
			// then return it, possibly prepending with country phone code
			// (for international phone numbers only)
			if (formatted_national_phone_number) {
				return this.formatFullNumber(formatted_national_phone_number);
			}

			// If the phone number couldn't be formatted,
			// then just fall back to the raw phone number.
			return this.format_as_non_formatted_number();
		}
	}, {
		key: 'format_as_non_formatted_number',
		value: function format_as_non_formatted_number() {
			// Strip national prefix for incorrectly inputted international phones.
			if (this.isInternational() && this.countryCallingCode) {
				return '+' + this.countryCallingCode + this.nationalNumber;
			}

			return this.parsedInput;
		}
	}, {
		key: 'formatNationalNumber',
		value: function formatNationalNumber(next_digits) {
			// Format the next phone number digits
			// using the previously chosen phone number format.
			//
			// This is done here because if `attempt_to_format_complete_phone_number`
			// was placed before this call then the `template`
			// wouldn't reflect the situation correctly (and would therefore be inconsistent)
			//
			var national_number_formatted_with_previous_format = void 0;
			if (this.chosenFormat) {
				national_number_formatted_with_previous_format = this.formatNextNationalNumberDigits(next_digits);
			}

			// See if the input digits can be formatted properly already. If not,
			// use the results from formatNextNationalNumberDigits(), which does formatting
			// based on the formatting pattern chosen.

			var formatted_number = this.attempt_to_format_complete_phone_number();

			// Just because a phone number doesn't have a suitable format
			// that doesn't mean that the phone is invalid
			// because phone number formats only format phone numbers,
			// they don't validate them and some (rare) phone numbers
			// are meant to stay non-formatted.
			if (formatted_number) {
				return formatted_number;
			}

			// For some phone number formats national prefix

			// If the previously chosen phone number format
			// didn't match the next (current) digit being input
			// (leading digits pattern didn't match).
			if (this.chooseAnotherFormat()) {
				// And a more appropriate phone number format
				// has been chosen for these `leading digits`,
				// then format the national phone number (so far)
				// using the newly selected phone number pattern.

				// Will return `undefined` if it couldn't format
				// the supplied national number
				// using the selected phone number pattern.

				return this.reformatNationalNumber();
			}

			// If could format the next (current) digit
			// using the previously chosen phone number format
			// then return the formatted number so far.

			// If no new phone number format could be chosen,
			// and couldn't format the supplied national number
			// using the selected phone number pattern,
			// then it will return `undefined`.

			return national_number_formatted_with_previous_format;
		}
	}, {
		key: 'reset',
		value: function reset() {
			// Input stripped of non-phone-number characters.
			// Can only contain a possible leading '+' sign and digits.
			this.parsedInput = '';

			this.currentOutput = '';

			// This contains the national prefix that has been extracted. It contains only
			// digits without formatting.
			this.nationalPrefix = '';

			this.nationalNumber = '';
			this.carrierCode = '';

			this.resetCountriness();

			this.resetFormat();

			return this;
		}
	}, {
		key: 'resetCountry',
		value: function resetCountry() {
			if (this.isInternational()) {
				this.country = undefined;
			} else {
				this.country = this.defaultCountry;
			}
		}
	}, {
		key: 'resetCountriness',
		value: function resetCountriness() {
			this.resetCountry();

			if (this.defaultCountry && !this.isInternational()) {
				this.metadata.country(this.defaultCountry);
				this.countryCallingCode = this.metadata.countryCallingCode();

				this.initialize_phone_number_formats_for_this_country_calling_code();
			} else {
				this.metadata.country(undefined);
				this.countryCallingCode = undefined;

				// "Available formats" are all formats available for the country.
				// "Matching formats" are only formats eligible for the national number being entered.
				this.available_formats = [];
				this.matching_formats = undefined;
			}
		}
	}, {
		key: 'resetFormat',
		value: function resetFormat() {
			this.chosenFormat = undefined;
			this.template = undefined;
			this.partially_populated_template = undefined;
			this.last_match_position = -1;
		}

		// Format each digit of national phone number (so far)
		// using the newly selected phone number pattern.

	}, {
		key: 'reformatNationalNumber',
		value: function reformatNationalNumber() {
			// Format each digit of national phone number (so far)
			// using the selected phone number pattern.
			return this.formatNextNationalNumberDigits(this.nationalNumber);
		}
	}, {
		key: 'initialize_phone_number_formats_for_this_country_calling_code',
		value: function initialize_phone_number_formats_for_this_country_calling_code() {
			// Get all "eligible" phone number formats for this country
			this.available_formats = this.metadata.formats().filter(function (format) {
				return ELIGIBLE_FORMAT_PATTERN.test(format.internationalFormat());
			});

			this.matching_formats = undefined;
		}
	}, {
		key: 'match_formats_by_leading_digits',
		value: function match_formats_by_leading_digits() {
			var leading_digits = this.nationalNumber;

			// "leading digits" pattern list starts with a
			// "leading digits" pattern fitting a maximum of 3 leading digits.
			// So, after a user inputs 3 digits of a national (significant) phone number
			// this national (significant) number can already be formatted.
			// The next "leading digits" pattern is for 4 leading digits max,
			// and the "leading digits" pattern after it is for 5 leading digits max, etc.

			// This implementation is different from Google's
			// in that it searches for a fitting format
			// even if the user has entered less than
			// `MIN_LEADING_DIGITS_LENGTH` digits of a national number.
			// Because some leading digits patterns already match for a single first digit.
			var index_of_leading_digits_pattern = leading_digits.length - MIN_LEADING_DIGITS_LENGTH;
			if (index_of_leading_digits_pattern < 0) {
				index_of_leading_digits_pattern = 0;
			}

			// "Available formats" are all formats available for the country.
			// "Matching formats" are only formats eligible for the national number being entered.

			// If at least `MIN_LEADING_DIGITS_LENGTH` digits of a national number are available
			// then format matching starts narrowing down the list of possible formats
			// (only previously matched formats are considered for next digits).
			var available_formats = this.had_enough_leading_digits && this.matching_formats || this.available_formats;
			this.had_enough_leading_digits = this.shouldFormat();

			this.matching_formats = available_formats.filter(function (format) {
				var leading_digits_patterns_count = format.leadingDigitsPatterns().length;

				// If this format is not restricted to a certain
				// leading digits pattern then it fits.
				if (leading_digits_patterns_count === 0) {
					return true;
				}

				var leading_digits_pattern_index = Math.min(index_of_leading_digits_pattern, leading_digits_patterns_count - 1);
				var leading_digits_pattern = format.leadingDigitsPatterns()[leading_digits_pattern_index];

				// Brackets are required for `^` to be applied to
				// all or-ed (`|`) parts, not just the first one.
				return new RegExp('^(' + leading_digits_pattern + ')').test(leading_digits);
			});

			// If there was a phone number format chosen
			// and it no longer holds given the new leading digits then reset it.
			// The test for this `if` condition is marked as:
			// "Reset a chosen format when it no longer holds given the new leading digits".
			// To construct a valid test case for this one can find a country
			// in `PhoneNumberMetadata.xml` yielding one format for 3 `<leadingDigits>`
			// and yielding another format for 4 `<leadingDigits>` (Australia in this case).
			if (this.chosenFormat && this.matching_formats.indexOf(this.chosenFormat) === -1) {
				this.resetFormat();
			}
		}
	}, {
		key: 'shouldFormat',
		value: function shouldFormat() {
			// Start matching any formats at all when the national number
			// entered so far is at least 3 digits long,
			// otherwise format matching would give false negatives
			// like when the digits entered so far are `2`
			// and the leading digits pattern is `21` –
			// it's quite obvious in this case that the format could be the one
			// but due to the absence of further digits it would give false negative.
			//
			// Presumably the limitation of "3 digits min"
			// is imposed to exclude false matches,
			// e.g. when there are two different formats
			// each one fitting one or two leading digits being input.
			// But for this case I would propose a specific `if/else` condition.
			//
			return this.nationalNumber.length >= MIN_LEADING_DIGITS_LENGTH;
		}

		// Check to see if there is an exact pattern match for these digits. If so, we
		// should use this instead of any other formatting template whose
		// `leadingDigitsPattern` also matches the input.

	}, {
		key: 'attempt_to_format_complete_phone_number',
		value: function attempt_to_format_complete_phone_number() {
			for (var _iterator = this.matching_formats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref = _i.value;
				}

				var format = _ref;

				var matcher = new RegExp('^(?:' + format.pattern() + ')$');

				if (!matcher.test(this.nationalNumber)) {
					continue;
				}

				if (!this.isFormatApplicable(format)) {
					continue;
				}

				// To leave the formatter in a consistent state
				this.resetFormat();
				this.chosenFormat = format;

				var formatted_number = Object(_format___WEBPACK_IMPORTED_MODULE_5__["format_national_number_using_format"])(this.nationalNumber, format, this.isInternational(), this.nationalPrefix !== '', this.metadata);

				// Special handling for NANPA countries for AsYouType formatter.
				// Copied from Google's `libphonenumber`:
				// https://github.com/googlei18n/libphonenumber/blob/66986dbbe443ee8450e2b54dcd44ac384b3bbee8/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L535-L573
				if (this.nationalPrefix && this.countryCallingCode === '1') {
					formatted_number = '1 ' + formatted_number;
				}

				// Set `this.template` and `this.partially_populated_template`.
				//
				// `else` case doesn't ever happen
				// with the current metadata,
				// but just in case.
				//
				/* istanbul ignore else */
				if (this.createFormattingTemplate(format)) {
					// Populate `this.partially_populated_template`
					this.reformatNationalNumber();
				} else {
					// Prepend `+CountryCode` in case of an international phone number
					var full_number = this.formatFullNumber(formatted_number);
					this.template = full_number.replace(/[\d\+]/g, DIGIT_PLACEHOLDER);
					this.partially_populated_template = full_number;
				}

				return formatted_number;
			}
		}

		// Prepends `+CountryCode` in case of an international phone number

	}, {
		key: 'formatFullNumber',
		value: function formatFullNumber(formattedNationalNumber) {
			if (this.isInternational()) {
				return '+' + this.countryCallingCode + ' ' + formattedNationalNumber;
			}
			return formattedNationalNumber;
		}

		// Extracts the country calling code from the beginning
		// of the entered `national_number` (so far),
		// and places the remaining input into the `national_number`.

	}, {
		key: 'extractCountryCallingCode',
		value: function extractCountryCallingCode() {
			var _extractCountryCallin = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractCountryCallingCode"])(this.parsedInput, this.defaultCountry, this.metadata.metadata),
			    countryCallingCode = _extractCountryCallin.countryCallingCode,
			    number = _extractCountryCallin.number;

			if (!countryCallingCode) {
				return;
			}

			this.countryCallingCode = countryCallingCode;

			// Sometimes people erroneously write national prefix
			// as part of an international number, e.g. +44 (0) ....
			// This violates the standards for international phone numbers,
			// so "As You Type" formatter assumes no national prefix
			// when parsing a phone number starting from `+`.
			// Even if it did attempt to filter-out that national prefix
			// it would look weird for a user trying to enter a digit
			// because from user's perspective the keyboard "wouldn't be working".
			this.nationalNumber = number;

			this.metadata.chooseCountryByCountryCallingCode(countryCallingCode);
			return this.metadata.selectedCountry() !== undefined;
		}
	}, {
		key: 'extractNationalPrefix',
		value: function extractNationalPrefix() {
			this.nationalPrefix = '';

			if (!this.metadata.selectedCountry()) {
				return;
			}

			// Only strip national prefixes for non-international phone numbers
			// because national prefixes can't be present in international phone numbers.
			// While `parseNumber()` is forgiving is such cases, `AsYouType` is not.

			var _strip_national_prefi = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["strip_national_prefix_and_carrier_code"])(this.nationalNumber, this.metadata),
			    potential_national_number = _strip_national_prefi.number,
			    carrierCode = _strip_national_prefi.carrierCode;

			if (carrierCode) {
				this.carrierCode = carrierCode;
			}

			// We require that the NSN remaining after stripping the national prefix and
			// carrier code be long enough to be a possible length for the region.
			// Otherwise, we don't do the stripping, since the original number could be
			// a valid short number.
			if (!this.metadata.possibleLengths() || this.isPossibleNumber(this.nationalNumber) && !this.isPossibleNumber(potential_national_number)) {
				// Verify the parsed national (significant) number for this country
				//
				// If the original number (before stripping national prefix) was viable,
				// and the resultant number is not, then prefer the original phone number.
				// This is because for some countries (e.g. Russia) the same digit could be both
				// a national prefix and a leading digit of a valid national phone number,
				// like `8` is the national prefix for Russia and both
				// `8 800 555 35 35` and `800 555 35 35` are valid numbers.
				if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["matchesEntirely"])(this.nationalNumber, this.metadata.nationalNumberPattern()) && !Object(_util__WEBPACK_IMPORTED_MODULE_3__["matchesEntirely"])(potential_national_number, this.metadata.nationalNumberPattern())) {
					return;
				}
			}

			this.nationalPrefix = this.nationalNumber.slice(0, this.nationalNumber.length - potential_national_number.length);
			this.nationalNumber = potential_national_number;

			return this.nationalPrefix;
		}
	}, {
		key: 'isPossibleNumber',
		value: function isPossibleNumber(number) {
			var validation_result = Object(_getNumberType___WEBPACK_IMPORTED_MODULE_6__["checkNumberLengthForType"])(number, undefined, this.metadata);
			switch (validation_result) {
				case 'IS_POSSIBLE':
					return true;
				// case 'IS_POSSIBLE_LOCAL_ONLY':
				// 	return !this.isInternational()
				default:
					return false;
			}
		}
	}, {
		key: 'chooseAnotherFormat',
		value: function chooseAnotherFormat() {
			// When there are multiple available formats, the formatter uses the first
			// format where a formatting template could be created.
			for (var _iterator2 = this.matching_formats, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref2 = _i2.value;
				}

				var format = _ref2;

				// If this format is currently being used
				// and is still possible, then stick to it.
				if (this.chosenFormat === format) {
					return;
				}

				// If this `format` is suitable for "as you type",
				// then extract the template from this format
				// and use it to format the phone number being input.

				if (!this.isFormatApplicable(format)) {
					continue;
				}

				if (!this.createFormattingTemplate(format)) {
					continue;
				}

				this.chosenFormat = format;

				// With a new formatting template, the matched position
				// using the old template needs to be reset.
				this.last_match_position = -1;

				return true;
			}

			// No format matches the phone number,
			// therefore set `country` to `undefined`
			// (or to the default country).
			this.resetCountry();

			// No format matches the national phone number entered
			this.resetFormat();
		}
	}, {
		key: 'isFormatApplicable',
		value: function isFormatApplicable(format) {
			// If national prefix is mandatory for this phone number format
			// and the user didn't input the national prefix
			// then this phone number format isn't suitable.
			if (!this.isInternational() && !this.nationalPrefix && format.nationalPrefixIsMandatoryWhenFormatting()) {
				return false;
			}
			// If this format doesn't use national prefix
			// but the user did input national prefix
			// then this phone number format isn't suitable.
			if (this.nationalPrefix && !format.usesNationalPrefix() && !format.nationalPrefixIsOptionalWhenFormatting()) {
				return false;
			}
			return true;
		}
	}, {
		key: 'createFormattingTemplate',
		value: function createFormattingTemplate(format) {
			// The formatter doesn't format numbers when numberPattern contains '|', e.g.
			// (20|3)\d{4}. In those cases we quickly return.
			// (Though there's no such format in current metadata)
			/* istanbul ignore if */
			if (SUPPORT_LEGACY_FORMATTING_PATTERNS && format.pattern().indexOf('|') >= 0) {
				return;
			}

			// Get formatting template for this phone number format
			var template = this.getTemplateForNumberFormatPattern(format);

			// If the national number entered is too long
			// for any phone number format, then abort.
			if (!template) {
				return;
			}

			// This one is for national number only
			this.partially_populated_template = template;

			// For convenience, the public `.template` property
			// contains the whole international number
			// if the phone number being input is international:
			// 'x' for the '+' sign, 'x'es for the country phone code,
			// a spacebar and then the template for the formatted national number.
			if (this.isInternational()) {
				this.template = DIGIT_PLACEHOLDER + repeat(DIGIT_PLACEHOLDER, this.countryCallingCode.length) + ' ' + template;
			}
			// For local numbers, replace national prefix
			// with a digit placeholder.
			else {
					this.template = template.replace(/\d/g, DIGIT_PLACEHOLDER);
				}

			// This one is for the full phone number
			return this.template;
		}

		// Generates formatting template for a phone number format

	}, {
		key: 'getTemplateForNumberFormatPattern',
		value: function getTemplateForNumberFormatPattern(format) {
			// A very smart trick by the guys at Google
			var number_pattern = format.pattern();

			/* istanbul ignore else */
			if (SUPPORT_LEGACY_FORMATTING_PATTERNS) {
				number_pattern = number_pattern
				// Replace anything in the form of [..] with \d
				.replace(CREATE_CHARACTER_CLASS_PATTERN(), '\\d')
				// Replace any standalone digit (not the one in `{}`) with \d
				.replace(CREATE_STANDALONE_DIGIT_PATTERN(), '\\d');
			}

			// This match will always succeed,
			// because the "longest dummy phone number"
			// has enough length to accomodate any possible
			// national phone number format pattern.
			var dummy_phone_number_matching_format_pattern = LONGEST_DUMMY_PHONE_NUMBER.match(number_pattern)[0];

			// If the national number entered is too long
			// for any phone number format, then abort.
			if (this.nationalNumber.length > dummy_phone_number_matching_format_pattern.length) {
				return;
			}

			// Prepare the phone number format
			var number_format = this.getFormatFormat(format);

			// Get a formatting template which can be used to efficiently format
			// a partial number where digits are added one by one.

			// Below `strict_pattern` is used for the
			// regular expression (with `^` and `$`).
			// This wasn't originally in Google's `libphonenumber`
			// and I guess they don't really need it
			// because they're not using "templates" to format phone numbers
			// but I added `strict_pattern` after encountering
			// South Korean phone number formatting bug.
			//
			// Non-strict regular expression bug demonstration:
			//
			// this.nationalNumber : `111111111` (9 digits)
			//
			// number_pattern : (\d{2})(\d{3,4})(\d{4})
			// number_format : `$1 $2 $3`
			// dummy_phone_number_matching_format_pattern : `9999999999` (10 digits)
			//
			// '9999999999'.replace(new RegExp(/(\d{2})(\d{3,4})(\d{4})/g), '$1 $2 $3') = "99 9999 9999"
			//
			// template : xx xxxx xxxx
			//
			// But the correct template in this case is `xx xxx xxxx`.
			// The template was generated incorrectly because of the
			// `{3,4}` variability in the `number_pattern`.
			//
			// The fix is, if `this.nationalNumber` has already sufficient length
			// to satisfy the `number_pattern` completely then `this.nationalNumber` is used
			// instead of `dummy_phone_number_matching_format_pattern`.

			var strict_pattern = new RegExp('^' + number_pattern + '$');
			var national_number_dummy_digits = this.nationalNumber.replace(/\d/g, DUMMY_DIGIT);

			// If `this.nationalNumber` has already sufficient length
			// to satisfy the `number_pattern` completely then use it
			// instead of `dummy_phone_number_matching_format_pattern`.
			if (strict_pattern.test(national_number_dummy_digits)) {
				dummy_phone_number_matching_format_pattern = national_number_dummy_digits;
			}

			// Generate formatting template for this phone number format
			return dummy_phone_number_matching_format_pattern
			// Format the dummy phone number according to the format
			.replace(new RegExp(number_pattern), number_format)
			// Replace each dummy digit with a DIGIT_PLACEHOLDER
			.replace(new RegExp(DUMMY_DIGIT, 'g'), DIGIT_PLACEHOLDER);
		}
	}, {
		key: 'formatNextNationalNumberDigits',
		value: function formatNextNationalNumberDigits(digits) {
			// Using `.split('')` to iterate through a string here
			// to avoid requiring `Symbol.iterator` polyfill.
			// `.split('')` is generally not safe for Unicode,
			// but in this particular case for `digits` it is safe.
			// for (const digit of digits)
			for (var _iterator3 = digits.split(''), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
				var _ref3;

				if (_isArray3) {
					if (_i3 >= _iterator3.length) break;
					_ref3 = _iterator3[_i3++];
				} else {
					_i3 = _iterator3.next();
					if (_i3.done) break;
					_ref3 = _i3.value;
				}

				var digit = _ref3;

				// If there is room for more digits in current `template`,
				// then set the next digit in the `template`,
				// and return the formatted digits so far.

				// If more digits are entered than the current format could handle
				if (this.partially_populated_template.slice(this.last_match_position + 1).search(DIGIT_PLACEHOLDER_MATCHER) === -1) {
					// Reset the current format,
					// so that the new format will be chosen
					// in a subsequent `this.chooseAnotherFormat()` call
					// later in code.
					this.chosenFormat = undefined;
					this.template = undefined;
					this.partially_populated_template = undefined;
					return;
				}

				this.last_match_position = this.partially_populated_template.search(DIGIT_PLACEHOLDER_MATCHER);
				this.partially_populated_template = this.partially_populated_template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
			}

			// Return the formatted phone number so far.
			return cut_stripping_dangling_braces(this.partially_populated_template, this.last_match_position + 1);

			// The old way which was good for `input-format` but is not so good
			// for `react-phone-number-input`'s default input (`InputBasic`).
			// return close_dangling_braces(this.partially_populated_template, this.last_match_position + 1)
			// 	.replace(DIGIT_PLACEHOLDER_MATCHER_GLOBAL, ' ')
		}
	}, {
		key: 'isInternational',
		value: function isInternational() {
			return this.parsedInput && this.parsedInput[0] === '+';
		}
	}, {
		key: 'getFormatFormat',
		value: function getFormatFormat(format) {
			if (this.isInternational()) {
				return Object(_format___WEBPACK_IMPORTED_MODULE_5__["changeInternationalFormatStyle"])(format.internationalFormat());
			}

			// If national prefix formatting rule is set
			// for this phone number format
			if (format.nationalPrefixFormattingRule()) {
				// If the user did input the national prefix
				// (or if the national prefix formatting rule does not require national prefix)
				// then maybe make it part of the phone number template
				if (this.nationalPrefix || !format.usesNationalPrefix()) {
					// Make the national prefix part of the phone number template
					return format.format().replace(_format___WEBPACK_IMPORTED_MODULE_5__["FIRST_GROUP_PATTERN"], format.nationalPrefixFormattingRule());
				}
			}
			// Special handling for NANPA countries for AsYouType formatter.
			// Copied from Google's `libphonenumber`:
			// https://github.com/googlei18n/libphonenumber/blob/66986dbbe443ee8450e2b54dcd44ac384b3bbee8/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L535-L573
			else if (this.countryCallingCode === '1' && this.nationalPrefix === '1') {
					return '1 ' + format.format();
				}

			return format.format();
		}

		// Determines the country of the phone number
		// entered so far based on the country phone code
		// and the national phone number.

	}, {
		key: 'determineTheCountry',
		value: function determineTheCountry() {
			this.country = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["find_country_code"])(this.countryCallingCode, this.nationalNumber, this.metadata);
		}

		/**
   * Returns an instance of `PhoneNumber` class.
   * Will return `undefined` if no national (significant) number
   * digits have been entered so far, or if no `defaultCountry` has been
   * set and the user enters a phone number not in international format.
   */

	}, {
		key: 'getNumber',
		value: function getNumber() {
			if (!this.countryCallingCode || !this.nationalNumber) {
				return undefined;
			}
			var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__["default"](this.country || this.countryCallingCode, this.nationalNumber, this.metadata.metadata);
			if (this.carrierCode) {
				phoneNumber.carrierCode = this.carrierCode;
			}
			// Phone number extensions are not supported by "As You Type" formatter.
			return phoneNumber;
		}
	}, {
		key: 'getNationalNumber',
		value: function getNationalNumber() {
			return this.nationalNumber;
		}
	}, {
		key: 'getTemplate',
		value: function getTemplate() {
			if (!this.template) {
				return;
			}

			var index = -1;

			var i = 0;
			while (i < this.parsedInput.length) {
				index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
				i++;
			}

			return cut_stripping_dangling_braces(this.template, index + 1);
		}
	}]);

	return AsYouType;
}();

/* harmony default export */ __webpack_exports__["default"] = (AsYouType);


function strip_dangling_braces(string) {
	var dangling_braces = [];
	var i = 0;
	while (i < string.length) {
		if (string[i] === '(') {
			dangling_braces.push(i);
		} else if (string[i] === ')') {
			dangling_braces.pop();
		}
		i++;
	}

	var start = 0;
	var cleared_string = '';
	dangling_braces.push(string.length);
	for (var _iterator4 = dangling_braces, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
		var _ref4;

		if (_isArray4) {
			if (_i4 >= _iterator4.length) break;
			_ref4 = _iterator4[_i4++];
		} else {
			_i4 = _iterator4.next();
			if (_i4.done) break;
			_ref4 = _i4.value;
		}

		var index = _ref4;

		cleared_string += string.slice(start, index);
		start = index + 1;
	}

	return cleared_string;
}

function cut_stripping_dangling_braces(string, cut_before_index) {
	if (string[cut_before_index] === ')') {
		cut_before_index++;
	}
	return strip_dangling_braces(string.slice(0, cut_before_index));
}

function close_dangling_braces(template, cut_before) {
	var retained_template = template.slice(0, cut_before);

	var opening_braces = count_occurences('(', retained_template);
	var closing_braces = count_occurences(')', retained_template);

	var dangling_braces = opening_braces - closing_braces;
	while (dangling_braces > 0 && cut_before < template.length) {
		if (template[cut_before] === ')') {
			dangling_braces--;
		}
		cut_before++;
	}

	return template.slice(0, cut_before);
}

// Counts all occurences of a symbol in a string.
// Unicode-unsafe (because using `.split()`).
function count_occurences(symbol, string) {
	var count = 0;

	// Using `.split('')` to iterate through a string here
	// to avoid requiring `Symbol.iterator` polyfill.
	// `.split('')` is generally not safe for Unicode,
	// but in this particular case for counting brackets it is safe.
	// for (const character of string)
	for (var _iterator5 = string.split(''), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
		var _ref5;

		if (_isArray5) {
			if (_i5 >= _iterator5.length) break;
			_ref5 = _iterator5[_i5++];
		} else {
			_i5 = _iterator5.next();
			if (_i5.done) break;
			_ref5 = _i5.value;
		}

		var character = _ref5;

		if (character === symbol) {
			count++;
		}
	}

	return count;
}

// Repeats a string (or a symbol) N times.
// http://stackoverflow.com/questions/202605/repeat-string-javascript
function repeat(string, times) {
	if (times < 1) {
		return '';
	}

	var result = '';

	while (times > 1) {
		if (times & 1) {
			result += string;
		}

		times >>= 1;
		string += string;
	}

	return result + string;
}
//# sourceMappingURL=AsYouType.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatIncompletePhoneNumber; });
/* harmony import */ var _AsYouType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);


/**
 * Formats a (possibly incomplete) phone number.
 * The phone number can be either in E.164 format
 * or in a form of national number digits.
 * @param {string} value - A possibly incomplete phone number. Either in E.164 format or in a form of national number digits.
 * @param {string?} country - Two-letter ("ISO 3166-1 alpha-2") country code.
 * @return {string} Formatted (possibly incomplete) phone number.
 */
function formatIncompletePhoneNumber(value, country, metadata) {
  if (!metadata) {
    metadata = country;
    country = undefined;
  }
  return new _AsYouType__WEBPACK_IMPORTED_MODULE_0__["default"](country, metadata).input(value);
}
//# sourceMappingURL=formatIncompletePhoneNumber.js.map

/***/ })
/******/ ]);