import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function fetchPortfolioContent(): Promise<Record<string, string>> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn("WARN: Notion API Keys missing. Falling back to defaults.");
    return {};
  }

  try {
    // Use the search API to retrieve pages within the database.
    // This is compatible with the Notion SDK v5 for standard in-app databases.
    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object',
      },
    });

    const contentMap: Record<string, string> = {};

    for (const result of response.results) {
      // Only process pages that belong to our target database
      if (
        result.object !== 'page' ||
        !('parent' in result) ||
        (result as any).parent?.database_id?.replace(/-/g, '') !== databaseId.replace(/-/g, '')
      ) {
        continue;
      }

      const page = result as any;
      const keyProp = page.properties?.Key;
      const valueProp = page.properties?.Value;

      const key =
        keyProp?.title?.[0]?.plain_text ||
        keyProp?.rich_text?.[0]?.plain_text;

      const value =
        valueProp?.rich_text?.[0]?.plain_text ||
        valueProp?.title?.[0]?.plain_text;

      if (key && value) {
        contentMap[key] = value;
      }
    }

    return contentMap;
  } catch (error) {
    console.error("Notion API Error:", error);
    return {};
  }
}
