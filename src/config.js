module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://mongo:27017/pinart-feed_multimedia-db',
    SECRET_TOKEN: 'starkteampinart'
}