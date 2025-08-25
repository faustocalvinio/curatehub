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

if (import.meta.url === `file://${process.argv[1]}`) {
   const [, , issue_url, file_name, body, labelsRaw] = process.argv;
   generateFile(issue_url, file_name, body, labelsRaw);
}
