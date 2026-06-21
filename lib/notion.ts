import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function fetchPortfolioContent(): Promise<Record<string, string>> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn("WARN: Notion API Keys missing. Falling back to defaults.");
    return {};
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const contentMap: Record<string, string> = {};

    response.results.forEach((page: any) => {
      const keyProperty = page.properties.Key;
      const valueProperty = page.properties.Value;

      if (keyProperty?.title?.[0]?.plain_text && valueProperty?.rich_text?.[0]?.plain_text) {
        contentMap[keyProperty.title[0].plain_text] = valueProperty.rich_text[0].plain_text;
      }
    });

    return contentMap;
  } catch (error) {
    console.error("Notion API Error:", error);
    return {};
  }
}
