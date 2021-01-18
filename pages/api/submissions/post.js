import { connectToDatabase } from '../../../util/mongodb';

export default async function post(req, res) {
    const { db } = await connectToDatabase();

    const result = await db
        .collection('submissions')
        .insertOne({
            roomCode: req.body.roomCode,
            text: req.body.text,
            createdAt: Date.now(),
        });

    res.status(200).json({ success: true });
}
