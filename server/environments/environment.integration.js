export const environmentIntegration = {
    production: false,
    name: "integration",
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "Study_Key",
    baseUrls: {
        mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
            "mongodb+srv://vivallo04:A6fRjbX4EPwTnwrb@studyroom-devlopment.44bw8.mongodb.net/studyroom-integration?retryWrites=true&w=majority"
    }
}