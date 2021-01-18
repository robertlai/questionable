import { TTL_MS } from '../../util/constants';
import { connectToDatabase } from '../../util/mongodb';

export default async function join(req, res) {
    const { db } = await connectToDatabase();

    const room = await db
        .collection('rooms')
        .findOne({
            code: req.query.code,
            createdAt: { $gt: Date.now() - TTL_MS },
        });

    if (!room) {
        return res.redirect('/404');
    }

    return res.redirect('/join/' + room.code);
}
