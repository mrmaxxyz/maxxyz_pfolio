'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ruKZLocale } from '@sanity/locale-ru-kz'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './lib/sanity'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
        structureTool({
            structure: (S, context) => {
                return S.list()
                    .title('Content')
                    .items([
                        // Minimum required configuration
                        orderableDocumentListDeskItem({ type: 'project', S, context }),

                        // List out the rest of the document types, but filter out the config type
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['project'].includes(listItem.getId() as string)
                        ),
                    ])
            },
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        ruKZLocale(),
    ],
    file: {
        // Disable direct upload progress tracking to prevent "progress" field errors
        directUploads: true,
    },
})
