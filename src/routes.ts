import { Router } from 'express'
import multer from 'multer'

import EstabelecimentosController from './controllers/EstabelecimentosController'
import multerConfig from './config/multer'
import AdmsController from './controllers/AdmsController'
const routes = Router()
const upload = multer(multerConfig)

routes.post('/estabelecimentos', upload.array('images'), EstabelecimentosController.create)
routes.get('/estabelecimentos', EstabelecimentosController.show)
routes.get('/estabelecimentos/:id', EstabelecimentosController.index)
routes.delete('/estabelecimentos/:id', EstabelecimentosController.remove)
routes.post('/adms', AdmsController.create)
routes.get('/adms', AdmsController.index)
routes.get('/adms/:id', AdmsController.show)

export default routes