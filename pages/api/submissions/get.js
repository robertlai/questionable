import { connectToDatabase } from '../../../util/mongodb';

export default async function get(req, res) {
    const { db } = await connectToDatabase();

    const submissions = await db
        .collection('submissions')
        .find({ roomCode: req.query.roomCode })
        .sort({ roomCode: 1 })
        .toArray();

    const formattedSubmissions = [];
    for (let i = 0; i < submissions.length; i++) {
        formattedSubmissions.push({
            text: submissions[i].text,
            createdAt: submissions[i].createdAt,
        });
    }

    res.status(200).json({
        submissions: formattedSubmissions,
    });
}
