#!/usr/bin/env node
import { PurgeCSS } from 'purgecss'
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'

// Simple CLI flags
const writePurged = process.argv.includes('--write') || process.argv.includes('-w')
const outDir = 'static/css'
const entryScss = 'assets/scss/main.scss'

// 1) Collect content sources (templates, content, JS)
const content = await fg([
    'themes/radio-weesper-theme/layouts/**/*.html',
    'content/**/*.md',
    'static/js/**/*.js'
], { dot: true, cwd: process.cwd() })

// 2) Compile SCSS to CSS (mirror Hugo’s entry)
let compiled
try {
    compiled = sass.compile(entryScss, { style: 'expanded' })
} catch (err) {
    console.error('SCSS compile failed:', err.message)
    process.exit(1)
}

// 3) Optional safelist (dynamic classes toggled by JS or conditionals)
let safelist = []
try {
    const safelistPath = path.resolve('scripts/purge-safelist.json')
    if (fs.existsSync(safelistPath)) {
        safelist = JSON.parse(fs.readFileSync(safelistPath, 'utf8'))
    } else {
        // Default minimal safelist
        safelist = ['open', 'active', 'live']
    }
} catch (e) {
    // Fallback to default
    safelist = ['open', 'active', 'live']
}

// 4) Run PurgeCSS against compiled CSS
const purgeCSSResult = await new PurgeCSS().purge({
    content,
    css: [{ raw: compiled.css, extension: 'css' }],
    safelist,
    defaultExtractor: (content) => content.match(/[^<>'"\s.`{}()\[\]]+/g) || []
})

const result = purgeCSSResult[0]
const unused = new Set(result.rejected || [])
const used = new Set(result.selectors || [])

console.log('Unused selectors:')
if (!unused.size) {
    console.log('None ✅')
} else {
    for (const s of unused) console.log(' -', s)
}

// 5) Write reports and optional purged CSS output
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'unused-selectors.txt'), Array.from(unused).join('\n'))
fs.writeFileSync(path.join(outDir, 'used-selectors.txt'), Array.from(used).join('\n'))

if (writePurged) {
    // When requested, emit a purged CSS for inspection/diffing
    const purgedCss = result.css
    fs.writeFileSync(path.join(outDir, 'style.purged.css'), purgedCss)
    console.log(`\nWrote purged CSS -> ${path.join(outDir, 'style.purged.css')}`)
}
