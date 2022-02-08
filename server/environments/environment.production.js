export const environmentProduction = {
    production: true,
    name: "production",
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "Study_Key",
    baseUrls: {
        mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
            "mongodb+srv://vivallo04:A6fRjbX4EPwTnwrb@studyroom-devlopment.44bw8.mongodb.net/studyroom-production?retryWrites=true&w=majority"
    }
}