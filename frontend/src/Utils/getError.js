export const getError = (err) =>
    err.response && err.response.message ? err.response.message : err.message;
