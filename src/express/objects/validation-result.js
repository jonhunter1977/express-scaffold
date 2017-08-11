'use strict';

module.exports = class ValidationResult {
    constructor(result, errorMessage) {
        this.result = result;
        this.message = errorMessage;
    }
};
