"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function catchAsyncController(fn) {
    return function (req, res, next) {
        return fn(req, res, next).catch(function (err) {
            var errContainsColon = err.message ? err.message.split(":") : [];
            return res
                .status(err.name === "CastError"
                ? 400
                : (errContainsColon === null || errContainsColon === void 0 ? void 0 : errContainsColon.length)
                    ? errContainsColon[0]
                    : 500)
                .json({
                error: err.name === "CastError"
                    ? "Please provide a valid ID"
                    : (errContainsColon === null || errContainsColon === void 0 ? void 0 : errContainsColon.length) === 2
                        ? errContainsColon[1]
                        : "Something went wrong, please try again later"
            });
        });
    };
}
exports.default = catchAsyncController;
