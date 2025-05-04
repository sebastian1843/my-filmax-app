import { PrismaClient } from "@/app/generated/prisma";

// Declaramos prisma como 'let' o 'const' en lugar de 'var' para evitar el error
let prisma: PrismaClient | undefined;

if (process.env.NODE_ENV !== "production") {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
