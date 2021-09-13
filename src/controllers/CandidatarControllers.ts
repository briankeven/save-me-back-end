import { Request, Response, NextFunction } from 'express';
import {v4 as uuid} from 'uuid';

import db from '../database/connection';


class CandidatarController {

    /*async index(request: Request, response: Response, next: NextFunction){
        const {duvida_id, user_id} = request.body

        try {
            const duvida = await db('duvidas_candidatos')
                .where('duvidas_candidatos.duvidas.user_id', '=', String(user_id))
                .join('users', 'duvidas_candidatos.canditatar.user_id', '=', 'user.id')
                .select([
                    'id',
                    ''
                ])
            
            return response.json(duvida)

        } catch (error) {
            next(error)
        }
    }*/

    async create(request: Request, response: Response, next: NextFunction){
        const {text, duvida_id, user_id} = request.body

        try {
            const duvida = await db('duvidas_candidatos')
                .where('duvidas_candidatos.duvida.id', '=', String(duvida_id))
                .where('duvidas_candidato.candidatar.user_id', '=', String(user_id))
                .first();

            if(duvida)
                return response.status(400).json({ error: "Voce ja se candidatou a esta duvida"});

            const id = uuid();

            const canditar = await db('candidatar')
                .insert({id, text, user_id})
            
            const canditar_id = canditar[0];

            const dc_id = uuid();

            await db('duvidas_candidatos')
                .insert({dc_id, duvida_id, canditar_id})

        } catch (error) {
            next(error)
        }
    }

}
export default CandidatarController;