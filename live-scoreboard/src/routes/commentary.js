import {Router} from "express";
import {desc, eq} from "drizzle-orm";
import {db} from "../db/db.js";
import {commentary} from "../db/schema.js";
import {matchIdParamSchema} from "../validation/matches.js";
import {createCommentarySchema, listCommentaryQuerySchema} from "../validation/commentary.js";

export const commentaryRouter = Router({mergeParams: true})

const MAX_LIMIT = 100

commentaryRouter.get('/', async (req, res) => {
    const parsedParams = matchIdParamSchema.safeParse(req.params)

    if(!parsedParams.success){
        return res.status(400).json({
            error:"Invalid params.",
            details:parsedParams.error.issues
        })
    }

    const parsedQuery = listCommentaryQuerySchema.safeParse(req.query)

    if(!parsedQuery.success){
        return res.status(400).json({
            error:"Invalid query.",
            details:parsedQuery.error.issues
        })
    }

    const {limit = 10} = parsedQuery.data
    const safeLimit = Math.min(limit,MAX_LIMIT)

    try {
        const data = await db
            .select()
            .from(commentary)
            .where(eq(commentary.matchId, parsedParams.data.id))
            .orderBy(desc(commentary.createdAt))
            .limit(safeLimit)

        res.status(200).json({data})
    }catch (err){
        res.status(500).json({
            error:"Failed to list commentary",
            details:JSON.stringify(err)
        })
    }
})

commentaryRouter.post('/', async (req, res) => {
    const parsedParams = matchIdParamSchema.safeParse(req.params)

    if(!parsedParams.success){
        return res.status(400).json({
            error:"Invalid params.",
            details:parsedParams.error.issues
        })
    }

    const parsedBody = createCommentarySchema.safeParse(req.body)

    if(!parsedBody.success){
        return res.status(400).json({
            error:"Invalid payload.",
            details:parsedBody.error.issues
        })
    }

    try {
        const [result] = await db
            .insert(commentary)
            .values({
                ...parsedBody.data,
                matchId: parsedParams.data.id,
            })
            .returning()
        if(res.app.locals.broadcastCommentary){
            res.app.locals.broadcastCommentary(result.matchId,result)
        }
        res.status(201).json({data: result})
    }catch (err){
        res.status(500).json({
            error:"Failed to create commentary",
            details:JSON.stringify(err)
        })
    }
})
