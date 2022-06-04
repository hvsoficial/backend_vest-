import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import userViews from '../view/user_view';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return response.json(userViews.renderMany(users));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id);

        return response.json(userViews.render(user));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            telephone,
            senha,
            email,

        } = request.body;

        const usersRepository = getRepository(User);

        const data = {
            name,
            telephone,
            senha,
            email,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            telephone: Yup.string().required(),
            senha: Yup.string().required(),
            email: Yup.string().required(),


        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const users = usersRepository.create(data);

        await usersRepository.save(users);

        return response.status(201).json(users);
    }
};