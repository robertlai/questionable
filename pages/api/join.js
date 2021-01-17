export default function join(req, res) {
    const code = req.query.code;
    res.redirect('/join/' + code);
}
