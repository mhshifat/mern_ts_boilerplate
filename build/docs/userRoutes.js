"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "/users": {
        get: {
            tags: ["USER"],
            summary: "Returns all users",
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
                                            $ref: "#/components/schemas/UserSwaggerSchema"
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
        },
        post: {
            tags: ["USER"],
            summary: "Register or create a new user and returns user details",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RegisterBodySchema"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        $ref: "#/components/schemas/AuthSwaggerSchema"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            }
                        }
                    }
                },
                409: {
                    description: "Entity Conflict",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            }
                        }
                    }
                },
                422: {
                    description: "Invalid Inputs",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Errors"
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
