const hosting = process.env.NODE_ENV === 'production' ? process.env.DB_HOST_LIVE : process.env.DB_HOST

const productionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${hosting}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const developmentUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${hosting}`

export const dbUrl = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl
