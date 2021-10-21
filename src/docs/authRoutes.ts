export default {
  "/auth": {
    get: {
      tags: ["AUTH"],
      summary: "Refresh auth token and returns logged in user details",
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
      tags: ["AUTH"],
      summary: "Login a user and returns logged in user details",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginBodySchema"
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
        404: {
          description: "Not Found",
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
    },
    delete: {
      tags: ["AUTH"],
      summary: "Logout a user",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "string",
                    example: null
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Unauthenticated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
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
