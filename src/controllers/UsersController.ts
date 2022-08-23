import { Request, Response, NextFunction } from 'express';

import db from '../database/connection';



class UsersControlller {
    
    async index (request: Request, response: Response, next: NextFunction) {
        const {email} = request.params;
        
        try {

            const users = await db('users')
                .where('users.email', '=',String(email))
                .select(
                    'users.id as user_id',
                    'name',
                    'email',
                    'photo',
                    'like',
                    'country',
                    'city',
                    'whats'
                )
                .first();
            
            return response.json(users);

        } catch (error) {
            next(error)
        }
    }
    
    async create(request: Request, response:Response, next:NextFunction){
        const {id, name, email, image} = request.body;
        
        try{

            const eml = await db('users')
                .where({email})
                .first();
            
            if(eml)
                return response.status(201).send({ error: 'Este e-mail já cadastrado'});

           
            await db('users')
                .insert({id, name, email, photo:image})

            return response.status(201).send();
        }catch(error){
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {name, email, image, city, country, whats} = request.body;

        try{ 
            
            await db('users')
                .where({email})
                .update({name, email, photo:image, city, country, whats});
            
            
            return response.status(201).send();
        }catch(error){
            next(error);
        }
    }

    async like(request: Request, response: Response, next: NextFunction){
        const {id, duvida_id} = request.body;
        

        try{
            const numero = await db('users')
                .where({id})
                .select('like')
            
            const like = numero[0].like + 1;

            await db('users')
                .where({id})
                .update({like})
            
            await db('contatos').where({duvida_id}).delete()

            await db('duvidas')
                .where({id:duvida_id})
                .delete();
        
            return response.status(201).send();
        }catch(error){
            next(error);
        }
    }
}

export default UsersControlller;