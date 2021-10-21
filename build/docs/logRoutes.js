"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "/logs": {
        get: {
            tags: ["LOG"],
            summary: "Returns all logs",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    logs: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/LogSwaggerSchema"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            }
                        }
                    }
                }
            }
        }
    }
};
