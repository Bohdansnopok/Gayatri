-- CreateTable
CREATE TABLE "GayatriCart" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mililitres" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GayatriCart_pkey" PRIMARY KEY ("id")
);
