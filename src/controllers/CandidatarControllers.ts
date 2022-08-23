import { Request, Response, NextFunction } from 'express';
import {v4 as uuid} from 'uuid';

import db from '../database/connection';


class CandidatarController {

    async index(request: Request, response: Response, next: NextFunction){
        const {duvida_id} = request.params;


        try {
            const candidatos = await db('contatos')
                .where({duvida_id})
                .join('users', 'contatos.user_id', '=', 'users.id')
                .select(
                    'users.id as user_id',
                    'name',
                    'photo'
                )
            return response.json(candidatos)

        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction){
        const {duvida_id, email} = request.body
        const trx = await db.transaction();

        try {

            const user = await db('users')
                .where('users.email', '=', String(email))
                .select('id')
                .first()
            
            const user_id = user.id

            const id = uuid();

            const contatos = await db('contatos')
                .where({user_id})
                .where({duvida_id})
                .select('id')
                .first()
            if(contatos)
                return response.status(400).json({ error: "Já entrou em contato uma vez!"});
            await trx('contatos')
                .insert({id, duvida_id, user_id})
            
            await trx.commit();
            return response.status(201).send();

        } catch (error) {
            next(error)
        }
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {id} = request.params;

        try {

            await db('contatos').where({id}).delete()

            return response.status(201).send();

        } catch (error) {
            next(error)
        }
    }
}
export default CandidatarController;