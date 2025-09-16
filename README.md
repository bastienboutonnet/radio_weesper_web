# radio_weesper_web


## Content archetypes

Hugo archetypes are provided for posts and artists to streamline content creation:

- Post: `archetypes/post.md`
- Artist: `archetypes/artist.md`

Create new content with:

```bash
hugo new post/<slug>.md
hugo new artist/<slug>.md
```

Fields

- Post: `title`, `show_name`, `date`, `showtime`, `showendtime`, `description`, `image`, `tags`, `artists`, `is_resident`
- Artist: `title`, `artist_name`, `is_resident`, `image`

Place images under `static/images/` and reference them like `/images/your-file.png`.
