const NotFoundError = (req, res, next) => res.status(404).send("THIS ROOT DOES`t EXIST")

export default NotFoundError;