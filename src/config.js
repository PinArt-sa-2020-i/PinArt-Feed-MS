module.exports = {
    port: process.env.PORT || 3003,
    db: process.env.MONGODB || 'mongodb://localhost:27017/pinart-feed_multimedia-db',
    SECRET_TOKEN: 'starkteampinart'
}