// import { Request, Response } from 'express'
// import { getRepository } from 'typeorm'
// import { Initiative } from '../entity/Initiative'

// export const getInitiatives = async (req: Request, res: Response): Promise<Response> => {
//     const initiatives = await getRepository(Initiative).find()
//     return res.json(initiatives)
// }

// export const createInitiative = async (req: Request, res: Response): Promise<Response> => {
//     const initiative = req.body
//     const initiativeSchema = getRepository(Initiative).create(initiative)
//     const initiativeCreated = await getRepository(Initiative).save(initiativeSchema)
//     return res.json(initiativeCreated)
// }

// export const getInitiativesByUserId = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params
//     const initiatives = await getRepository(Initiative).find({
//         where:
//             { user: id },
//     })
//     return res.json(initiatives)
// }