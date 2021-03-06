import { TTL_MS } from '../../util/constants';
import { connectToDatabase } from '../../util/mongodb';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default async function host(req, res) {
    const { db } = await connectToDatabase();

    let code = "";

    for (var attemptNum = 0; attemptNum < 3; attemptNum++) {
        code = "";
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * ALPHABET.length);
            code = code + ALPHABET[index];
        }

        try {
            const existingRoom = await db
                .collection('rooms')
                .findOne({
                    code: code,
                    createdAt: { $gt: Date.now() - TTL_MS },
                });

            if (existingRoom) {
                continue;
            }

            const result = await db
                .collection('rooms')
                .updateOne(
                    { code: code },
                    { $set: {
                        code: code,
                        title: req.body.title,
                        createdAt: Date.now(),
                    }},
                    { upsert: true },
                );

            break;
        } catch (e) {
            console.log(e);
        }
    }

    if (attemptNum === 2) {
        return res.status(500).json({ message: 'Failed to create room' });
    }

    return res.redirect('/host/' + code);
}
