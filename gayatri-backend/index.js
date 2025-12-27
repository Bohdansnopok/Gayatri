import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/cartAdd", async (req, res) => {
  const { image, name, mililitres, count, price } = req.body;
  const existing = await prisma.user.findUnique({ where: { name } });
  if (existing) {
    return res.status(400).json({error: "Товар вже додано в кошик"})
  }

  const product = await prisma.user.create({
    data: {image, name, mililitres, count, price}
  })

  res.json({ message: "Товар додано в кошик", user })
});