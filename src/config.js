module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://ec2-100-25-48-238.compute-1.amazonaws.com:27017/pinart-feed_multimedia-db',
    SECRET_TOKEN: 'starkteampinart'
}