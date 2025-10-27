import fs from "fs";
import path from "path";

function parseBody(body) {
   const lines = body
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
   const data = {};
   for (const line of lines) {
      const [key, ...rest] = line.split(":");
      if (key && rest.length) data[key.trim()] = rest.join(":").trim();
   }
   return data;
}

function generateFile(issue_url, file_name, body, labelsRaw) {
   console.log("Labels raw (tipo):", typeof labelsRaw);
   console.log("Labels raw (valor):", labelsRaw);

   let labels = [];
   try {
      if (Array.isArray(labelsRaw)) {
         labels = labelsRaw;
      } else if (typeof labelsRaw === "string") {
         try {
            labels = JSON.parse(labelsRaw);
         } catch {
            const matches = [
               ...labelsRaw.matchAll(/name:\s*([a-zA-Z0-9_-]+)/g),
            ];
            labels = matches.map((m) => ({ name: m[1] }));
         }
      }
   } catch (err) {
      console.log("Error al procesar labelsRaw:", err);
      labels = [];
   }

   console.log("Labels procesadas:", labels);

   const labelNames = labels.map((l) => (typeof l === "string" ? l : l.name));
   console.log("Nombres de etiquetas:", labelNames);

   // Verificar que tenga el label "content"
   if (!labelNames.includes("content")) {
      console.warn('⚠️ Issue does not have the required label: "content".');
      return;
   }

   // Obtener categorías válidas (carpetas en content/)
   const contentDir = path.join(process.cwd(), "content");
   const validCategories = fs.readdirSync(contentDir).filter((item) => {
      return fs.statSync(path.join(contentDir, item)).isDirectory();
   });

   console.log("Categorías válidas:", validCategories);

   // Buscar un label que coincida con una categoría válida
   const category = labelNames.find((label) =>
      validCategories.includes(label)
   );

   if (!category) {
      console.warn(
         `⚠️ No valid category label found. Available categories: ${validCategories.join(", ")}`
      );
      return;
   }

   console.log(`📁 Using category: ${category}`);

   const data = parseBody(body);

   const content = `---
title: '${data.title || ""}'
description: '${data.description || ""}'
link: '${data.link || ""}'
imageURL: '${data.imageURL || ""}'
generatedAt: '${new Date().toISOString()}'
---`;

   const filePath = path.join(
      process.cwd(),
      "content",
      category,
      file_name.endsWith(".md") ? file_name : `${file_name}.md`
   );

   fs.mkdirSync(path.dirname(filePath), { recursive: true });
   fs.writeFileSync(filePath, content);
   console.log(`✅ File created: ${filePath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
   const [, , issue_url, file_name, body, labelsRaw] = process.argv;
   generateFile(issue_url, file_name, body, labelsRaw);
}
