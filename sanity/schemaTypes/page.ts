import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'profileImage',
            title: 'Фото профиля (круглое)',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Портретное фото для страницы "Обо мне" (будет отображаться в круге)'
        }),
        defineField({
            name: 'content',
            title: 'Page Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                    }
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'contactInfo',
            title: 'Контактная информация',
            type: 'object',
            fields: [
                { name: 'email', type: 'string', title: 'Email' },
                { name: 'phone', type: 'string', title: 'Телефон' },
                { name: 'location', type: 'string', title: 'Локация' },
                {
                    name: 'socials',
                    type: 'array',
                    title: 'Социальные сети',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'platform', type: 'string', title: 'Платформа' },
                            { name: 'url', type: 'url', title: 'Ссылка' }
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'cta',
            title: 'Призыв к действию (CTA)',
            type: 'object',
            fields: [
                { name: 'text', type: 'string', title: 'Текст кнопки' },
                { name: 'url', type: 'url', title: 'Ссылка' }
            ]
        }),
        defineField({
            name: 'faq',
            title: 'FAQ (Часто задаваемые вопросы)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'question', type: 'string', title: 'Вопрос' },
                    { name: 'answer', type: 'text', title: 'Ответ' }
                ],
                preview: {
                    select: {
                        title: 'question',
                        subtitle: 'answer'
                    }
                }
            }]
        }),
        defineField({
            name: 'featuredProjects',
            title: 'Избранные проекты',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{ type: 'project' }]
            }],
            validation: Rule => Rule.max(4)
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current'
        }
    }
})
