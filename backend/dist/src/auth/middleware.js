"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = void 0;
function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}
exports.loggedIn = loggedIn;
