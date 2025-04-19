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