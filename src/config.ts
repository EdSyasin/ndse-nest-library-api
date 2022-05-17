require('dotenv').config()

export default {
	mongoHost: process.env.MONGO_HOST || 'localhost',
	mongoPort: process.env.MONGO_PORT || '27017',
	mongoDb: process.env.MONGO_DB || 'library',
	mongoUser: process.env.MONGO_USER || 'user',
	mongoPass: process.env.MONGO_PASSWORD || 'password',
}
