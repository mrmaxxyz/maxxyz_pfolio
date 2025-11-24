import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'keywords', type: 'array', of: [{ type: 'string' }], title: 'Keywords' },
                { name: 'ogImage', type: 'image', title: 'Open Graph Image' },
            ]
        }),
        defineField({
            name: 'navigation',
            title: 'Navigation',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'link', type: 'string', title: 'Link' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'watermark',
            title: 'Watermark',
            type: 'image',
        }),
        defineField({
            name: 'headingColor',
            title: 'Цвет заголовков',
            type: 'string',
            options: {
                list: [
                    { title: 'Основной (Primary)', value: 'primary' },
                    { title: 'Акцентный (Accent)', value: 'accent' },
                    { title: 'Обычный текст (Foreground)', value: 'foreground' },
                ],
            },
            initialValue: 'foreground',
        }),
    ],
})
