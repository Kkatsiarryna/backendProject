"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const addresses_repository_1 = require("../repositiries/addresses-repository");
exports.addressesRouter = (0, express_1.Router)();
exports.addressesRouter.get('/', (req, res) => {
    const addresses = addresses_repository_1.addressesRepository.getAddresses();
    res.send(addresses);
});
exports.addressesRouter.get('/:id', (req, res) => {
    let address = addresses_repository_1.addressesRepository.getAddressesById(+req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
