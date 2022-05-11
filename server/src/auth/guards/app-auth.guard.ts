import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class AppAuhGuard extends AuthGuard("jwt"){
  getRequest(context: ExecutionContext): any {

    // return super.canActivate(context);
    return true
  }
}