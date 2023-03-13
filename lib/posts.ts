import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostList = {
  id: string,
  title: string,
  date: string,
}[];

export type PostData = {
  id: string,
  title: string,
  date: string,
  contentHtml: string,
};

export function getPostList(): PostList {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const { title, date } = matterResult.data;
    if (typeof title !== 'string') throw new Error('title missing in ' + fullPath);
    if (typeof date !== 'string') throw new Error('date missing in ' + fullPath);

    // Combine the data with the id
    return {
      id: fileName.replace(/\.md$/, ''),
      title,
      date,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const { title, date } = matterResult.data;
  if (typeof title !== 'string') throw new Error('title missing in ' + fullPath);
  if (typeof date !== 'string') throw new Error('date missing in ' + fullPath);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    title,
    date,
    contentHtml,
  };
}
