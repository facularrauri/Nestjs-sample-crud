import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { roles } from '../../role/roles.enum'

@Injectable()
export class InmutableAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { user } = request

    const isAdmin = user.roles.some((r) => r.english === roles.ADMIN)

    return !isAdmin
  }
}
