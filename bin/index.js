"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AcmeClientError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = AcmeClientError;
class BadCreateOrderError extends AcmeClientError {
}
exports.BadCreateOrderError = BadCreateOrderError;
class BadCreateCsrError extends AcmeClientError {
}
exports.BadCreateCsrError = BadCreateCsrError;
var NameIdentifierType;
(function (NameIdentifierType) {
    NameIdentifierType["DNS"] = "dns";
})(NameIdentifierType = exports.NameIdentifierType || (exports.NameIdentifierType = {}));
;
;
var ChallengeType;
(function (ChallengeType) {
    ChallengeType["HTTP_01"] = "http-01";
    ChallengeType["DNS_01"] = "dns-01";
})(ChallengeType = exports.ChallengeType || (exports.ChallengeType = {}));
var AuthorizationStatus;
(function (AuthorizationStatus) {
    AuthorizationStatus["PENDING"] = "pending";
    AuthorizationStatus["VALID"] = "valid";
})(AuthorizationStatus = exports.AuthorizationStatus || (exports.AuthorizationStatus = {}));
exports.validateNameIdentifier = function (nameIdentifier) {
    if (nameIdentifier.type !== 'dns') {
        throw new BadCreateOrderError('Identifier type invalid');
    }
    if (!nameIdentifier.value) {
        throw new BadCreateOrderError('Identifier value cannot be empty');
    }
};
exports.validateCreateOrderOptions = function (createOrderOptions) {
    if (!Array.isArray(createOrderOptions.identifiers)) {
        throw new BadCreateOrderError('identifiers must be a valid array');
    }
    createOrderOptions.identifiers.forEach(function (identifier) {
        exports.validateNameIdentifier(identifier);
    });
};
exports.validateCsrOptions = function (csrOptions) {
    if (!csrOptions.commonName) {
        throw new BadCreateCsrError('Param commonName cannot be empty');
    }
    if (!csrOptions.altNames) {
        if (Array.isArray(csrOptions.altNames)) {
            throw new BadCreateCsrError('Param commonName should be an valid array');
        }
    }
};
;
