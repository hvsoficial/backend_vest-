import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import fs from 'fs'
import { join } from 'path'
import Estabelecimentos from '../models/Estabelecimento'
import Image from '../models/Image'
import estabelecimentos_view from '../view/estabelecimentos_view'

export default {
	async create(request: Request, response: Response) {
		const { name, cnpj, telephone, latitude, longitude, road, complement, number, cep, about, instructions, opening_hours, zap, open_on_weekends } = request.body
		const requestImages = request.files as Express.Multer.File[]

		const images = requestImages.map(image => ({ ...image, path: image.filename }))

		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const data = {
			name, cnpj, telephone, latitude, longitude, road, complement, number, cep, about, instructions, opening_hours, zap: zap === 'true',
			open_on_weekends: open_on_weekends === 'true', images
		}

		const schema = Yup.object().shape({
			name: Yup.string().required('O campo "name" é obrigatório.'),
			cnpj: Yup.string(),
			telephone: Yup.string().required('O campo "telefone" é obrigatório.'),
			latitude: Yup.number().required('O campo "latitude" é obrigatório.'),
			longitude: Yup.number().required('O campo "longitude" é obrigatório.'),
			road: Yup.string(),//.required('O campo "Rua" é obrigatório.'),
			complement: Yup.string(),
			number: Yup.string(),//.required('O campo "Numero" é obrigatório.'),
			cep: Yup.string(),//.required('O campo "CEP" é obrigatório.'),
			about: Yup.string().required('O campo "about" é obrigatório.').max(300, 'O campo "about" aceita até 300 caracteres.'),
			instructions: Yup.string().required('O campo "instructions" é obrigatório.'),
			opening_hours: Yup.string().required('O campo "opening_hours" é obrigatório.'),
			zap: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			open_on_weekends: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string()
				})).required('O campo "Images" é obrigatório.')
		})
		//console.log(data)

		await schema.validate(data, { abortEarly: false })

		const estabelecimento = estabelecimentosRepository.create(data)

		await estabelecimentosRepository.save(estabelecimento)

		return response.status(201).json(estabelecimento)
	},

	async show(request: Request, response: Response) {
		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const estabelecimentos = await estabelecimentosRepository.find({ relations: ['images'] })

		return response.json(estabelecimentos_view.renderMany(estabelecimentos))
	},

	async index(request: Request, response: Response) {
		const { id } = request.params
		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const estabelecimento = await estabelecimentosRepository.findOneOrFail(id, { relations: ['images'] })

		return response.json(estabelecimentos_view.render(estabelecimento))
	},

	async indexname(request: Request, response: Response) {
		const { name } = request.params
		const estabelecimentos = await getRepository(Estabelecimentos)
			.createQueryBuilder("estabelecimentos")
			.where("estabelecimentos.name like:name", { name: `%${name}%` })
			.getMany();

		return response.json(estabelecimentos_view.renderSearchMany(estabelecimentos))
	},

	async remove(request: Request, response: Response) {
		const { id } = request.params
		const estabelecimentosRepository = getRepository(Estabelecimentos)
		const imagesRepository = getRepository(Image)
		const estabelecimento_id = id

		const imagens = await getRepository(Image)
			.createQueryBuilder("images")
			.where("images.estabelecimento_id like:name", { name: `%${estabelecimento_id}%` })
			.getMany();

		const img = imagens.map(imagens => (
			fs.unlinkSync(join(__dirname, '..', '..', 'uploads', imagens.path))))

		const estabelecimento = await estabelecimentosRepository.delete(id)
		const images = await imagesRepository.delete(estabelecimento_id)



		return response.json({ estabelecimento, images, img })
	}
}