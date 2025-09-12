#!/usr/bin/env node
import { PurgeCSS } from 'purgecss'
import fg from 'fast-glob'
import fs from 'node:fs'

const content = await fg([
    'themes/radio-weesper-theme/layouts/**/*.html',
    'content/**/*.md',
    'static/js/**/*.js'
], { dot: true, cwd: process.cwd() })

const purgeCSSResult = await new PurgeCSS().purge({
    content,
    css: ['static/css/style.css'],
    defaultExtractor: content => content.match(/[^<>'"\s.`{}()\[\]]+/g) || []
})

const result = purgeCSSResult[0]
const allSelectors = new Set(result.rejected || [])

console.log('Unused selectors:')
if (!allSelectors.size) {
    console.log('None ✅')
    process.exit(0)
}
for (const s of allSelectors) console.log(' -', s)

// Optionally write to file
fs.writeFileSync('static/css/unused-selectors.txt', Array.from(allSelectors).join('\n'))
