import { connectToDatabase } from '../../../util/mongodb';

export default async function get(req, res) {
    const { db } = await connectToDatabase();

    const submissions = await db
        .collection('submissions')
        .find({ roomCode: req.query.roomCode })
        .sort({ roomCode: 1 })
        .toArray();

    const formattedSubmissions = submissions.map((submission) => ({
        createdAt: submission.createdAt,
        text: submission.text,
    }));

    return res.status(200).json({ submissions: formattedSubmissions });
}
