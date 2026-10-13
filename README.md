# Florida Food Festival Website

This repository contains the Jekyll-based website for the Florida Food Festival, hosted on GitHub Pages.

## About the Festival

The Florida Food Festival is an annual celebration of Florida's diverse culinary scene, featuring local chefs, producers, and food artisans from across the state.

## Website Structure

This website is built with Jekyll and deployed on GitHub Pages. The site features:

- Responsive design optimized for all devices
- SEO optimization with proper metadata
- Event schedule and information
- Vendor profiles
- Ticket purchasing options
- Newsletter signup
- Location and contact information

## Development Setup

### Prerequisites

- Ruby version 2.7.0 or higher
- RubyGems
- GCC and Make

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/florida-food-festival.git
   cd florida-food-festival
   ```

2. Install Jekyll and Bundler
   ```
   gem install jekyll bundler
   ```

3. Install dependencies
   ```
   bundle install
   ```

4. Run the development server
   ```
   bundle exec jekyll serve
   ```

5. Visit `http://localhost:4000` in your browser

## Food Festival Directory

Festival pages live in `_festivals/` (one Markdown file per festival) and publish to `/festivals/<slug>/`. The directory at `/festivals/` is filtered and sorted in the browser by `assets/js/festivals.js`.

Key front matter fields:

- `rank` / `tier` (1 Signature – 4 Hometown): default "Biggest first" order
- `start_date` / `end_date` (ISO) and `date_status` (`estimated` or `confirmed`): drive sorting, the "est." badge and the FoodEvent JSON-LD
- `months`, `region`, `categories`, `admission` (`free` | `ticketed` | `park`): power the filters
- `featured_until: YYYY-MM-DD` (+ optional `featured_message`) puts the festival in the paid "Featured festival" slot at the top of the home page and pins it to the top of the guide, labeled Sponsored, through that date. Rebuild after it ends; the page also hides expired placements on its own.
- `claimed: true` (+ optional `claimed_by: "Organization name"`) shows the "Verified by organizer" badge and replaces every Claim button on the page with "✓ Event is claimed"
- An active `sponsor` replaces the Sponsor buttons with "Event is sponsored"; they come back automatically when the sponsorship ends (with the festival, or at `sponsor.until` if earlier)
- `sponsor: { name, url, message }` adds a labeled "Presented by" bar with `rel="sponsored"` links
- `email`, `sponsorship_email`, `contact_url`, `email_source`: organizer contacts. The email shows on the festival page unless `email_personal: true` (a named person's address), which keeps it on the outreach list only.

The "Claim this page" and "Sponsor this page" links on every festival page are generated mailto links (`_includes/festival-mailto.html`) to `contact.listings_email`, with subjects built from `claim_subject_prefix` / `sponsor_subject_prefix` plus the festival title.

`/outreach/` is an internal, noindexed list of every festival's email, website and page link, with copy-all-emails and CSV export. It is not linked anywhere and is excluded from the sitemap, but anyone with the URL can open it.

Sponsor, claim, add and correction requests go through `_includes/inquiry-form.html`. Set `contact.form_endpoint` in `_config.yml` to a form backend (e.g. Formspree) to collect submissions; when it's blank, the form opens a prefilled email to `contact.inquiry_email`.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles the build and deployment process.

## Custom Domain

This site uses a custom domain: floridafoodfestival.com. The CNAME file is included in the repository, and DNS settings should be configured with your domain registrar.

## Folder Structure

- `_includes/`: Reusable components
- `_layouts/`: Page templates
- `_posts/`: Blog posts
- `_vendors/`: Vendor profiles (custom collection)
- `_events/`: Event details (custom collection)
- `assets/`: Static files (CSS, JS, images)
- `pages/`: Main website pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions about the website, please contact webmaster@floridafoodfestival.com.

# Jekyll Includes Structure

Create an `_includes` folder with the following component files:

```
_includes/
  ├── hero.html
  ├── about.html
  ├── schedule.html
  ├── vendors.html
  ├── location.html
  ├── tickets.html
  ├── newsletter.html
  ├── head.html
  ├── header.html
  ├── footer.html
```

Each component will contain the HTML for just that section, allowing you to:
1. Work on each component individually
2. Include only the components you want on any given page
3. Reuse components across multiple pages

# Blog/Events Structure in Jekyll

For your food festival events blog, you'll need to set up:

1. A `_posts` directory to store your event post files
2. An event post layout template
3. A blog index page to list all events
4. Configuration in your _config.yml

Here's the recommended directory structure:

```
floridafoodfestival/
├── _config.yml
├── _layouts/
│   ├── default.html
│   ├── post.html (for blog posts/events)
├── _posts/
│   ├── 2025-05-01-celebrate-cinco-de-mayo.md
│   ├── 2025-04-15-seafood-extravaganza.md
│   ├── 2025-06-10-summer-wine-tasting.md
├── _includes/
│   ├── header.html
│   ├── footer.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── events/
│   │   │   ├── cinco-de-mayo.jpg
│   │   │   ├── seafood-extravaganza.jpg
├── index.html
├── events/
│   └── index.html (blog listing page)
├── Gemfile
└── README.md
```

In Jekyll, blog posts are files within the _posts folder that follow the naming convention: `YEAR-MONTH-DAY-title.md`

# Jekyll Data Files Structure

Jekyll allows you to store structured data in YAML, JSON, or CSV files in a `_data` directory.

Create a `_data` folder with the following files:

```
_data/
  ├── features.yml      # Features for the About section
  ├── schedule.yml      # Schedule data for all days
  ├── featured_vendors.yml  # Featured vendors data
  ├── ticket_types.yml  # Ticket options and pricing
  ├── navigation.yml    # Site navigation structure
```

Here's an example of how the `features.yml` file would be structured:

```yaml
- title: Tasting Pavilions
  description: Sample cuisine from over 100 vendors representing Florida's diverse regions
  icon: utensils

- title: Chef Demonstrations  
  description: Watch top Florida chefs share their techniques and favorite recipes
  icon: chef-hat

- title: Workshops & Classes
  description: Learn culinary skills from experts in hands-on sessions
  icon: chalkboard-teacher

- title: Local Producers
  description: Meet the farmers, fishermen, and artisans behind Florida's finest ingredients
  icon: store
```

And here's an example of how the `schedule.yml` file would be structured:

```yaml
- label: Day 1 - June 15
  events:
    - time: 10:00 AM - 11:30 AM
      title: Opening Ceremony
      description: Join us for the grand opening of the 2025 Florida Food Festival
      location: Main Stage
    
    - time: 12:00 PM - 1:30 PM
      title: Seafood Showcase
      description: Florida's top seafood chefs demonstrate their signature dishes
      location: Culinary Pavilion
      
    # more events...

- label: Day 2 - June 16
  events:
    # Day 2 events...

- label: Day 3 - June 17
  events:
    # Day 3 events...
```

The data in these files can be accessed in your includes using `site.data.filename`

