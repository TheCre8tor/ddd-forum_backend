import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/errors/usecase_error";

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
      });
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, { message: `The username ${username} was already taken` });
    }
  }
}
