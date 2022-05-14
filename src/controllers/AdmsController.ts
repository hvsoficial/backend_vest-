import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import Adm from '../models/Adm';
import admViews from '../view/adms_view';
import * as Yup from 'yup';

export default{
    async index(request: Request, response: Response){
        const admsRepository = getRepository(Adm);

        const adms = await admsRepository.find();

        return response.json(admViews.renderMany(adms));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const admsRepository = getRepository(Adm);

        const adm = await admsRepository.findOneOrFail(id);

        return response.json(admViews.render(adm));
    },

    async create(request: Request, response: Response){
        const{
          
             name,
             senha,
             email,
     
         } = request.body;
     
         const admsRepository = getRepository(Adm);

         const data = {
            name,
            senha,
            email,
        }

        const schema =Yup.object().shape({
            name: Yup.string().required(),
            senha: Yup.string().required(),
            email: Yup.string().required(),


        });

        await schema.validate(data, {
            abortEarly: false,
        });
     
         const adms = admsRepository.create(data);
     
         await admsRepository.save(adms);
     
         return response.status(201).json(adms);
    }
};