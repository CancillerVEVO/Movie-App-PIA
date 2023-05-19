class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.data = errors;
    this.name = "ValidationError";
  }
}

export function getApiError(error) {
  if (error.response) {
    const data = error.response.data;

    console.log(data);

    if (data.message) {
      const message = data.message;

      if (typeof message === "string") {
        return new Error(message);
      }
    }

    if (data.errors) {
      const errors = data.errors;

      if (errors instanceof Array) {
        return new ValidationError(
          "Ha ocurrido un error de validacion",
          errors
        );
      }
    }
  }

  if (e instanceof Error) return new Error(e.message);

  return new Error("Ha ocurrido un error inesperado.");
}
