import { Request, Response, NextFunction } from 'express';
import {v4 as uuid} from 'uuid';

import db from '../database/connection';


class DuvidasController {
    async index(request: Request, response: Response, next: NextFunction){

        try{

            const duvidas = await db('duvidas')
                .join('users', 'duvidas.user_id', '=', 'users.id')
                .select([
                     'duvidas.*', 'users.*'
                ]);
            
            if(duvidas.length === 0)
                return response.status(400).json({ error: "Nenhuma duvidas no sistema"});
            
            return response.json(duvidas);
        }catch(error){
            next(error);
        }
    }

    async search(request: Request, response: Response, next: NextFunction){
    
        const {subject, format} = request.query;


        try{

            const duvidas = await db('duvidas')
                .where('duvidas.subject', '=',String(subject))
                .where('duvidas.format', '=', String(format))
                .join('users', 'duvidas.user_id', '=', 'users.id')
                .select(
                    ['duvidas.*', 'users.*']
                );
            return response.json(duvidas);

        }catch(error){
            next(error);
        }
        
    }       
    
    async userDuvidas(request: Request, response: Response, next: NextFunction){
    
        const {user_id} = request.query;

        try{

            const duvidas = await db('duvidas')
                .where('duvidas.user_id', '=',String(user_id))
                .select(
                    'duvidas.*'
                );
            return response.json(duvidas);

        }catch(error){
            next(error);
        }
        
    }  

    async create(request: Request, response: Response, next: NextFunction){
        const {title, description, subject, format, status, user_id}=request.body;

        try {
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
        const {id}=request.query;

        try {

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

/*

'id',
                    'title',
                    'description',
                    'subject',
                    'format',
                    'status',
                    'users.id',
                    'users.name',
                    'users.photo',
                    'users.whats'

*/