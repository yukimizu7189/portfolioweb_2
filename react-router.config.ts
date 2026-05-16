import fs from "node:fs";
import path from "node:path";
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    const routes = ["/", "/works", "/profile", "/contact", "/blog"];

    try {
      const blogDir = path.join(process.cwd(), "app/data/blog");
      if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir);
        files.forEach((file) => {
          const slug = file.replace(/\.(md|json)$/, "");
          routes.push(`/blog/${slug}`);
        });
      }

    } catch (error) {
      console.warn("ブログ記事のURL生成をスキップしました");
    }

    return routes;
  },
} satisfies Config;