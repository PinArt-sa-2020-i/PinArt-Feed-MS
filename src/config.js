module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'ec2-34-204-194-146.compute-1.amazonaws.com:27017',
    SECRET_TOKEN: 'starkteampinart'
}