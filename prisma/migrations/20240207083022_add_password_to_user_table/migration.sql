/*
  Warnings:

  - Made the column `image` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
UPDATE "User" SET password = uuid_generate_v4();