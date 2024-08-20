<p align="center" dir="auto">
<img width="200" style="max-width: 100%;" src="./public/logo/logo.svg" alt="Logo">
</p>

# Free Click & Drop Page Builder

[Play around with the page builder](https://www.builder-demo.myissue.dk)

This app was born out of my desire to create a minimalist page builder with an elegant and intuitive design.

To star the repository, simply click on the **Star** button located at the top-right corner of the GitHub page. Thank you in advance for your support! 🙌

## Demo

Introducing the **Free Vue Click & Drop Page Builder**
create and enhance digital experiences with Vue on any backend.

[Play around with the page builder](https://www.builder-demo.myissue.dk)

## Features

Includes:

- **Page Builder**: Click & Drop Page Builder.
- **Customizable Design**: Tailor the look to match your brand.

The Page Builder is packed with features:

- **Click & Drop**: Easily rearrange elements on your page.
- **Reordering**: Change the order of your content without hassle.
- **True Visual Editing**: See your changes in real-time as you make them.
- **Media Library**: Access and manage your media files effortlessly.
- **Unsplash**: Unsplash Integration.
- **Responsive Editing**: Ensure your site looks great on all devices.
- **Text Editing**: Customize your text with ease.
- **Font Customization**: Choose the perfect fonts to match your style.
- **Undo & Redo**: Experiment confidently with the ability to revert changes.
- **YouTube Videos**: Integrate video content smoothly.

Empower users to create the perfect content with the Page Builder.

## Technical Details

- **Tech**: Vue 3, JavaScript, Pinia, Tailwind CSS, HTML.
- **Features**: Click & Drop Page Builder.

## Getting started & installation

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Required Software Installation

Please note that these instructions assume you have PHP, Composer, and Node.js installed

## Documentation

I have separated all the logic for manipulating the HTML elements into its own Designer class, which can be found at the path: `src/composables/PageBuilder.js`.

Customizing the page builder is made simple since all the logic resides in the Designer Class.

## Unsplash

Please note that if you want to use Unsplash, simply create an .env file in your root folder and enter your Unsplash API key and value.

Example: VITE_UNSPLASH_KEY="your-unsplash-api-key-here"

[Get your unsplash api key here](https://unsplash.com/developers).

## Use with Backend

The Page builder's capabilities become infinite when integrated with a backend framework like Laravel or Express.js.

If you are familiar with Laravel, you can integrate the page builder with my open-source Laravel Admin Panel available at:
[Demo & repo](https://github.com/qaiswardag/myissue-admin).

By utilizing a backend Framework, the HTML components, currently stored in a JSON file at `public/components.json`, can be easily stored in the database, resulting in better management of HTML components.

## Contributing

Thank you for considering contributing to this project!
