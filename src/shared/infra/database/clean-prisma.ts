import { AppError } from '@shared/errors/AppError'
import { prisma } from '@shared/infra/database/connection'

export async function cleanPrisma(): Promise<void> {
  await prisma.$transaction([

  ]).catch(err => {
    throw new AppError(`${err}`, 500)
  })
}
