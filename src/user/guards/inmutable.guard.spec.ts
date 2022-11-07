import { InmutableAdminGuard } from './inmutable.guard'

describe('InmutableGuard', () => {
  it('should be defined', () => {
    expect(new InmutableAdminGuard()).toBeDefined()
  })
})
