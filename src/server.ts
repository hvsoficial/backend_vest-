import express from 'express'
import cors from 'cors'
import { join } from 'path'
import 'express-async-errors'

import routes from './routes'
import errorHandler from './errors/handler'
import './database/connection'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
app.use(errorHandler)

const PORT = process.env.PORT || 3338;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});