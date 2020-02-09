export const config = {
  secrets: {
    jwt: 'somesecret'
  },
  dbUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-y1ufw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
}
