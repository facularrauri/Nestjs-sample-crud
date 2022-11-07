import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { roles } from '../../role/roles.enum'

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) return false

    if (request.params.id === user.sub) return true

    const isAdmin = () =>
      user.roles.some((role) => role.english === roles.ADMIN)

    if (isAdmin) return true

    return false
  }
}
