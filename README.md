# Material-Gatsby-Resume

This is a resume bootstrap using react-gatsby-netlify

Goals:

- [ ] I want to be able to customize my online portfolio without touching my code.
- [ ] I want my portfolio to look modern and be responsive.
- [ ] I want my portfolio to be customizable at a technical level should I feel like it.
- [ ] As a stretch goal, I would like to be able to print out my portfolio as a resume

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
   git clone https://github.com/dunky11/react-saas-template
   ```

2. Install dependencies, this can take a minute

   ```
   cd react-saas-template
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

## Build With

- [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
- [Reach-Router](https://github.com/reach/router) - Routing of the app
- [Pace](https://github.com/HubSpot/pace) - Loading bar at the top
- [Emoji-Mart](https://github.com/missive/emoji-mart) - Picker for the emojis
- [Recharts](https://github.com/recharts/recharts) - Charting library I used for the statistics
- [Aos](https://github.com/michalsnik/aos) - Animations based on viewport
- [React-Cropper](https://github.com/roadmanfong/react-cropper) - Cropper for the image uploads

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dunky11/react-saas-template/blob/master/LICENSE) file for details.
