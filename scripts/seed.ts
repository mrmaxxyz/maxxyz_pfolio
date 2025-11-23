import { createClient } from 'next-sanity'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_ACCESS_TOKEN, // Pick up token from CLI
})

async function seed() {
    console.log('Seeding data...')

    // 1. Create Settings
    const settings = {
        _id: 'settings',
        _type: 'settings',
        siteTitle: 'Maxxyz Portfolio',
        seo: {
            description: 'Professional photography portfolio showcasing tactile maximalism.',
            keywords: ['photography', 'portfolio', 'art', 'maximalism']
        },
        navigation: [
            { _key: '1', label: 'Portfolio', link: '/' },
            { _key: '2', label: 'About', link: '/about' },
            { _key: '3', label: 'Contact', link: '/contact' }
        ]
    }

    await client.createOrReplace(settings)
    console.log('Settings created.')

    // 2. Create Categories
    const categories = [
        { _id: 'cat-wedding', _type: 'category', title: 'Wedding', slug: { current: 'wedding' } },
        { _id: 'cat-portrait', _type: 'category', title: 'Portrait', slug: { current: 'portrait' } },
        { _id: 'cat-nature', _type: 'category', title: 'Nature', slug: { current: 'nature' } },
    ]

    for (const cat of categories) {
        await client.createOrReplace(cat)
    }
    console.log('Categories created.')

    // 3. Create Projects
    // Note: We are not uploading real images here to save time/bandwidth, 
    // but we will create the documents. The frontend handles missing images gracefully.
    const projects = [
        {
            _type: 'project',
            title: 'Neon Nights',
            slug: { current: 'neon-nights' },
            category: { _type: 'reference', _ref: 'cat-portrait' },
            publishedAt: new Date().toISOString(),
            parameters: { layout: 'bento', backgroundColor: '#1a1a1a' },
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Exploring the vibrant city lights through a 50mm lens.' }],
                    markDefs: [],
                    style: 'normal'
                }
            ]
        },
        {
            _type: 'project',
            title: 'Ethereal Woods',
            slug: { current: 'ethereal-woods' },
            category: { _type: 'reference', _ref: 'cat-nature' },
            publishedAt: new Date().toISOString(),
            parameters: { layout: 'masonry', backgroundColor: '#f4f4f0' },
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'A journey into the misty morning forests.' }],
                    markDefs: [],
                    style: 'normal'
                }
            ]
        },
        {
            _type: 'project',
            title: 'Urban Decay',
            slug: { current: 'urban-decay' },
            category: { _type: 'reference', _ref: 'cat-nature' },
            publishedAt: new Date().toISOString(),
            parameters: { layout: 'bento', backgroundColor: '#000000' },
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'The beauty of abandoned structures.' }],
                    markDefs: [],
                    style: 'normal'
                }
            ]
        },
        {
            _type: 'project',
            title: 'Golden Hour',
            slug: { current: 'golden-hour' },
            category: { _type: 'reference', _ref: 'cat-wedding' },
            publishedAt: new Date().toISOString(),
            parameters: { layout: 'bento', backgroundColor: '#fff' },
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Love captured in the perfect light.' }],
                    markDefs: [],
                    style: 'normal'
                }
            ]
        }
    ]

    for (const proj of projects) {
        await client.create(proj)
    }
    console.log('Projects created.')
    console.log('Done!')
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
