import type { Config } from "@react-router/dev/config";
import fs from "node:fs";
import path from "node:path";

export default {
  ssr: true,
  
  async prerender() {
    const routes = ["/", "/works", "/profile", "/contact", "/blog"];
    
    try {
      const filePath = path.join(process.cwd(), "app/data/blog.json");
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const blogPosts = JSON.parse(fileContent);
        
        blogPosts.forEach((post: any) => {
          routes.push(`/blog/${post.id}`);
        });
      }
    } catch (error) {
      console.warn("ブログ記事のURL生成をスキップしました");
    }
    
    return routes;
  },
} satisfies Config;