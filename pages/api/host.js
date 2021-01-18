import { connectToDatabase } from '../../util/mongodb';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TTL_MS = 1000 * 60 * 60 * 24 * 30;

export default async function host(req, res) {
    const { db } = await connectToDatabase();

    let code = "";
    let attemptNum = 0;

    for (attemptNum = 0; attemptNum < 3; attemptNum++) {
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

            if (!existingRoom) {
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
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (attemptNum === 2) {
        res.status(500).json({ message: 'Failed to create room' });
    }

    res.redirect('/host/' + code);
}
