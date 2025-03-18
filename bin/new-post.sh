#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const title = process.argv[2];

if (!title) {
  console.error('Usage: new-post.sh <title>');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/\s+/g, '-');
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;

const folderName = `${date}-${slug}`;
const folderPath = path.join('blog', folderName);
const filePath = path.join(folderPath, 'index.md');

const frontMatter = `---
date: ${date}
title: ${title}
authors: [kam]
tags: []
image: ./hero-image.webp
---

![Description of the image](./hero-image.webp)

This is the first paragraph of the blog post. It shows up in the blog feed.
<!-- truncate -->

And here the post continues.


`;

fs.mkdirSync(folderPath, { recursive: true });
fs.writeFileSync(filePath, `${frontMatter}\n\nWrite your blog post here.`);

console.log(`Blog post created at: ${filePath}`);