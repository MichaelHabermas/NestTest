import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type PrismaPost<T> = Prisma.Prisma__CustomerClient<
  T,
  never,
  DefaultArgs
>;
export type PrismaGet<T> = Prisma.Prisma__CustomerClient<
  T | null,
  null,
  DefaultArgs
>;
