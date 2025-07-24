import fs from "fs";
import path from "path";
import * as github from "@actions/github";

// Extrae los datos del cuerpo del issue (formato YAML simple)
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

// Genera y guarda el archivo
function generateFile(issue_url, file_name, body, labelsRaw) {
   console.log("Labels raw (tipo):", typeof labelsRaw);
   console.log("Labels raw (valor):", labelsRaw);

   let labels = [];
   try {
      // Si labelsRaw ya es un array (por GitHub Actions), úsalo directamente
      if (Array.isArray(labelsRaw)) {
         labels = labelsRaw;
      } else if (typeof labelsRaw === "string") {
         // Intenta parsear como JSON
         labels = JSON.parse(labelsRaw.replace(/'/g, '"'));
      }
   } catch (err) {
      console.log("Error al parsear labelsRaw:", err);
      labels = [];
   }

   console.log("Labels procesadas:", labels);

   const labelNames = labels.map((l) => (typeof l === "string" ? l : l.name));
   console.log("Nombres de etiquetas:", labelNames);

   if (labelNames.includes("content") && labelNames.includes("javascript")) {
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
         "content/javascript",
         file_name.endsWith(".md") ? file_name : `${file_name}.md`
      );

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
      console.log(`✅ File created: ${filePath}`);
   } else {
      console.warn(
         '⚠️ Issue does not have the required labels: "content" and "javascript".'
      );
   }
}

// Ejecutar si se llama desde la CLI (compatible con ESModules)
if (import.meta.url === `file://${process.argv[1]}`) {
   const [, , issue_url, file_name, body, labelsRaw] = process.argv;
   generateFile(issue_url, file_name, body, labelsRaw);
}
