import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import category from './category'
import settings from './settings'
import page from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, category, settings, page],
}
