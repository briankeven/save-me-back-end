import { Request, Response, NextFunction } from 'express';
import {v4 as uuid} from 'uuid';

import db from '../database/connection';


class DuvidasController {
    async index(request: Request, response: Response, next: NextFunction){

        try{

            const duvidas = await db('duvidas')
                .join('users', 'duvidas.user_id', '=', 'users.id')
                .select([
                    'duvidas.id as duvida_id',
                    'title',
                    'description',
                    'subject',
                    'format',
                
                    'users.id as user_id',
                    'users.name',
                    'users.email',
                    'users.photo',
                    'users.city',
                    'users.country',
                    'users.like',
                    'users.whats'
                ]);
            
            return response.json(duvidas);
        }catch(error){
            next(error);
        }
    }

    async search(request: Request, response: Response, next: NextFunction){
    
        const {subject, format} = request.query;


        try{

            const duvidas = await db('duvidas')
                .where({subject})
                .where({format})
                .join('users', 'duvidas.user_id', '=', 'users.id')
                .select(
                    'duvidas.id as duvida_id',
                    'title',
                    'description',
                    'subject',
                    'format',
                
                    'users.id as user_id',
                    'users.name',
                    'users.email',
                    'users.photo',
                    'users.city',
                    'users.country',
                    'users.like',
                    'users.whats'
                );
            if(duvidas.length === 0)
                return response.status(400).json({ error: "Busca nao encontrada"});
            return response.json(duvidas);

        }catch(error){
            next(error);
        }
        
    }       
    
    async userDuvidas(request: Request, response: Response, next: NextFunction){
    
        const {email} = request.params;
        
        try{
            const user = await db('users')
                .where('users.email', '=', String(email))
                .select('id')
                .first()
            
            
            const duvidas = await db('duvidas')
                .where('duvidas.user_id', '=', user.id)
                .select(
                    'duvidas.id as duvida_id',
                    'title',
                    'description',
                    'subject',
                    'format',
                    'updated_at'
                
                );     
            
            return response.json(duvidas);

        }catch(error){
            next(error);
        }
        
    }  

    async create(request: Request, response: Response, next: NextFunction){
        const {title, description, subject, format, status, email}=request.body;

        try {
            
            const user = await db('users')
                .where('users.email', '=', String(email))
                .select('id')
                .first()
            const user_id = user.id;
            const id = uuid();
            await db('duvidas')
                .insert({id,title, description, subject, format, status, user_id})
            
            return response.status(201).send();
            
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {id, title, description, subject, format, status}=request.body;
        
        try {

            await db('duvidas')
                .where({id})
                .update({title, description, subject, format, status});
            
            return response.status(201).send();
        } catch (error) {
            next(error)
        }
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {id}=request.params;

        try {
            await db('contatos').where({duvida_id:id}).delete()

            await db('duvidas')
                .where({id})
                .delete();
            
            return response.status(201).send();
        } catch (error) {
            next(error)
        }
    }

}

export default DuvidasController;