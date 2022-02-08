export const environmentDevelopment = {
    production: false,
    name: "development",
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Study_Key",
    baseUrls: {
        mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
            'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/studyroom-development'
    }
}