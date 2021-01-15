export default function host(req, res) {
    const title = req.body.title;
    res.redirect("/");
}
