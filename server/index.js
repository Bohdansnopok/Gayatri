// server.js - Додамо детальне логування
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Важливо: Використовуємо абсолютний шлях
const uploadsDir = path.join(process.cwd(), 'uploads');
console.log(`📂 Uploads directory: ${uploadsDir}`);

// Перевіряємо чи існує папка uploads
if (!fs.existsSync(uploadsDir)) {
  console.log(`📁 Creating uploads directory: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`📁 Destination: ${uploadsDir}`);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    console.log(`📄 File will be saved as: ${uniqueName}`);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const getCategoryPath = (category) => {
  const mockDir = path.join(process.cwd(), 'mock');
  if (!fs.existsSync(mockDir)) {
    console.log(`📁 Creating mock directory: ${mockDir}`);
    fs.mkdirSync(mockDir, { recursive: true });
  }
  
  const filePath = path.join(mockDir, `${category.toLowerCase()}Cosmetic.json`);
  console.log(`📄 Category file path: ${filePath}`);
  return filePath;
};

app.get("/:category", (req, res) => {
  try {
    const { category } = req.params;
    console.log(`📥 GET /${category}`);
    
    const filePath = getCategoryPath(category);
    
    if (!fs.existsSync(filePath)) {
      console.log(`📄 File does not exist, creating empty array for ${category}`);
      fs.writeFileSync(filePath, "[]", "utf-8");
      return res.json([]);
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`📊 Found ${data.length} products in ${category}`);
    res.json(data);
  } catch (error) {
    console.error("❌ Error reading file:", error);
    res.status(500).json({ error: "Failed to read data" });
  }
});

app.post("/:category", upload.single('image'), (req, res) => {
  console.log("=".repeat(50));
  console.log(`📨 POST /${req.params.category}`);
  console.log(`📦 Body:`, req.body);
  console.log(`📁 File:`, req.file);
  console.log(`📂 Upload directory exists:`, fs.existsSync(uploadsDir));
  
  try {
    const { category } = req.params;
    
    if (!req.body.name || !req.body.price) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ 
        error: "Name and price are required",
        received: req.body
      });
    }

    // Перевіряємо чи файл був завантажений
    if (!req.file) {
      console.warn("⚠️ No file uploaded");
    } else {
      console.log(`✅ File uploaded: ${req.file.filename}`);
      console.log(`📁 File saved to: ${req.file.path}`);
      console.log(`📏 File size: ${req.file.size} bytes`);
    }

    // Перевіряємо чи файл дійсно існує
    if (req.file && !fs.existsSync(req.file.path)) {
      console.error("❌ Uploaded file does not exist on disk!");
    }

    // Формуємо URL для зображення
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    console.log(`🖼️ Image URL: ${imageUrl}`);

    const product = {
      id: uuid(),
      name: String(req.body.name),
      price: Number(req.body.price),
      category: category.toLowerCase(),
      image: imageUrl,
    };

    console.log(`🆕 Product object:`, product);

    const filePath = getCategoryPath(category);
    
    // Перевіряємо чи існує батьківська директорія
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    let data = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      try {
        data = JSON.parse(fileContent);
      } catch (parseError) {
        console.error(`❌ Error parsing JSON from ${filePath}:`, parseError);
        data = [];
      }
    } else {
      console.log(`📁 Creating new file: ${filePath}`);
    }

    data.push(product);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Product saved to ${filePath}`);
    
    res.status(201).json(product);
    
  } catch (error) {
    console.error("❌ Error in POST:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message,
      stack: error.stack
    });
  }
});

app.delete("/:category/:id", (req, res) => {
  try {
    const { category, id } = req.params;
    console.log(`🗑️ DELETE /${category}/${id}`);
    
    const filePath = getCategoryPath(category);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Category not found" });
    }

    let data = [];
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      data = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Failed to read data" });
    }

    const productIndex = data.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const deletedProduct = data.splice(productIndex, 1)[0];

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Product ${id} deleted from ${category} successfully`);
    res.json(deletedProduct);
    
  } catch (error) {
    console.error("Error in DELETE:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
});

// Додаємо статичний доступ до uploads папки
app.use('/uploads', express.static(uploadsDir));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📂 Uploads folder: ${uploadsDir}`);
  console.log(`📁 Current working directory: ${process.cwd()}`);
  console.log("=".repeat(50));
});