module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'ec2-3-235-182-65.compute-1.amazonaws.com:27017',
    SECRET_TOKEN: 'starkteampinart'
}