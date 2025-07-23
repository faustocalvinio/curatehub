const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const github = require("@actions/github");

async function generateFile(link, title, description, imageURL) {
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
         __dirname,
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

module.exports = { generateFile };
