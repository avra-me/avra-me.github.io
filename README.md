# Avra.Me Portfolio Showcase
This is a custom resume using React, Gatsby and Netlify CMS

Goals:

- [x] I want to be able to customize my online portfolio without touching my code.
- [x] I want my portfolio to look modern and be responsive.
- [x] I want my portfolio to be customizable at a technical level should I feel like it.
- [ ] As a stretch goal, I would like to be able to print out my portfolio as a resume
- [ ] Todo: Properly release this thing (requires a code cleanup)

#### Node.js 12+ (versions below could work, but are not tested)

- Linux:

  ```
  sudo apt install nodejs npm
  ```

- Windows or macOS:

  https://nodejs.org/en/

### Installing

1. Clone the repository

   ```
   git clone https://github.com/avra-me/avra-me.github.io
   ```

2. Install dependencies, this can take a minute

   ```
   cd <name of dir>
   npm install
   ```

3. Start the local server

   ```
   npm start
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

### What to do next?

If you are new to React, you should watch a [basic React tutorial](https://www.youtube.com/results?search_query=react+tutorial) first.

If you already know React, then most of the information you need is in the [Material-UI documentation](https://material-ui.com/getting-started/usage/).

You can go into [src/theme.js](/src/theme.js) and change the primary and secondary color codes at the top of the script to the values you like and some magic will happen.

## Deployment

If you are happy with the state of your website you can run:

```
npm run build
```

It will create a folder named build with your compiled project inside. After that copy its content into your webroot and you are ready to go.

## Built on top of

- [Gatsby](gatsbyjs.org/) - Generating a static site from dynamic content
- [Netlify CMS](netlifycms.org/) - A Version controlled content management system, enables content changes without touching the code
- [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
- [Reach-Router](https://github.com/reach/router) - Client side routing
- [Framer-Motion](https://www.framer.com/api/motion/) - Animations based on viewport

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/avra-me/avra-me.github.io/blob/master/LICENSE) file for details.
