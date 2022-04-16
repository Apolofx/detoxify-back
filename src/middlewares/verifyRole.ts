import { Request, Response, NextFunction } from "express";
import { USER_ROLE_LEVELS, USER_ROLE_NAMES } from "@config";

type UserRoleName = keyof typeof USER_ROLE_NAMES;
interface AuthPayload extends Express.AuthInfo {
  id: string;
  role: UserRoleName;
}
interface AuthRequest extends Request {
  authInfo: AuthPayload;
}
interface Options {
  use_id_level_security: boolean;
}

/**
 * Adds role and user level security to routes. By default, role REGULAR
 * only has access to resources belonging to the user requesting it.
 * @param required_role minimum required role to access this resource
 * @param options
 * @returns Express Middleware
 */
function verifyRole(
  required_role: UserRoleName,
  options: Options = {
    use_id_level_security: true,
  }
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authInfo } = req as AuthRequest;
    const { use_id_level_security } = options;
    const { id: queriedId } = req.params;

    //if required_role does not complies with requests minimum role permission return forbidden
    if (USER_ROLE_LEVELS[authInfo.role] < USER_ROLE_LEVELS[required_role])
      return res.sendStatus(403);
    //if the queried id does not match the user's id return forbidden
    if (
      authInfo.role === USER_ROLE_NAMES.REGULAR &&
      use_id_level_security &&
      Number(queriedId) !== Number(authInfo.id)
    )
      return res.sendStatus(403);
    next();
  };
}

export { verifyRole };
