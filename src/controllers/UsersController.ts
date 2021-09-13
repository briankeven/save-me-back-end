import { Request, Response, NextFunction } from 'express';
import {v4 as uuid} from 'uuid';

import db from '../database/connection';

class UsersControlller {
    
    async index (request: Request, response: Response, next: NextFunction) {
        const {user_id} = request.query;

        try {

            const users = await db('users')
                .where('users.id', String(user_id))
                .select(
                    'users.*'
                );

            return response.json(users);

        } catch (error) {
            next(error)
        }
    }
    
    async create(request: Request, response: Response, next: NextFunction){
        const {name, email, image} = request.body;
        const photo = image;
       
        try{

            const eml = await db('users')
                .where({email})
                .first();
            
            if(eml)
                return response.status(400).send({ error: 'Este e-mail já cadastrado'});

            const id = uuid();

            await db('users')
                .insert({id, name, email, photo})

            return response.status(201).send();
        }catch(error){
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {id, name, email, image, city, country, whats} = request.body;
        const photo = image;


        try{ 
            
            await db('users')
                .where({id})
                .update({name, email, photo, city, country, whats});
            
            return response.status(201).send();
        }catch(error){
            next(error);
        }
    }
}

export default UsersControlller;