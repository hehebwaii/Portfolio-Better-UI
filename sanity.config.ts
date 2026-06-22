import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "@/sanity/env";
import { portfolioSchema } from "@/sanity/schema";

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio CMS",
  basePath: "/studio",
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio CMS")
          .items([
            // Force the portfolio document as a singleton (no list, no create)
            S.listItem()
              .title("Portfolio")
              .id("portfolio")
              .child(
                S.document()
                  .schemaType("portfolio")
                  .documentId("portfolio")
                  .title("Portfolio Content")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: portfolioSchema,
  },
});
