module.exports = {
  siteMetadata: {
    title: `Cape Town Load Sched`,
    description: `Check when your power is going to be off without solving a soduko first.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cape Town LoadSched`,
        short_name: `LoadSched`,
        start_url: `/`,
        background_color: `#111111`,
        theme_color: `#0099cc`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
