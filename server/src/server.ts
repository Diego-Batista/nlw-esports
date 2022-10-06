import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursToMinutes } from './utils/convert-hour-string-to-minutes'
import { converteMinutesStringHours } from './utils/convert-minutes-hours-to-string'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id
    const body = req.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlayung: body.yearsPlayung,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursToMinutes(body.hourStart),
            hoursEnd: convertHoursToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,

        }
    })

    return res.status(201).json(ad)
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlayung: true,
            hourStart: true,
            hoursEnd: true,  
        },
        where: {
            gameId
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: converteMinutesStringHours(ad.hourStart),
            hoursEnd: converteMinutesStringHours(ad.hoursEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    }) 

    return res.json({
        discord: ad.discord,
    })
})

app.listen(3333)