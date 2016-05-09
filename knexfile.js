module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/social_media'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
