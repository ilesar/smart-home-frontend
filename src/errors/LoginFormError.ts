export default class LoginFormError extends Error {
  public formattedErrors: {
    email: string,
    password: string,
  };
}
