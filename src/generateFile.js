import fs from "fs";
import path from "path";
import * as core from "@actions/core";
import * as github from "@actions/github";

export async function generateFile(link, title, description, imageURL) {
   const issueLabels = github.context.payload.issue.labels.map(
      (label) => label.name
   );

   if (issueLabels.includes("content") && issueLabels.includes("javascript")) {
      const content = `---
title: '${title}'
description: '${description}'
link: '${link}'
imageURL: '${imageURL}'
---
`;

      const filePath = path.join(
         path.dirname(new URL(import.meta.url).pathname),
         `../generated-issues/${title.replace(/\s+/g, "-").toLowerCase()}.md`
      );

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);

      core.info(`File created: ${filePath}`);
   } else {
      core.warning(
         'Issue does not have the required labels: "content" and "javascript".'
      );
   }
}
