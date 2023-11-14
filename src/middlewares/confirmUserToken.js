const jwt = require('jsonwebtoken')
const secretKey = require('../keys/hashKey')
const knex = require('../connection/dbConnection')

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'Usuário não autorizado!' })
    }

    try {
        const token = authorization.split(' ')[1]

        const verifyToken = jwt.verify(token, secretKey)

        if (!verifyToken) {
            return res.status(400).json({ message: '' })
        }

        const findUser = await knex('usuarios').where({ id: verifyToken.id }).first()

        if (!findUser) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }

        const { password: _, ...userNotPass } = findUser

        req.user = userNotPass

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }

}

module.exports = verifyToken