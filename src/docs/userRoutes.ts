export default {
  "/users": {
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
        }
      }
    }
  }
};
