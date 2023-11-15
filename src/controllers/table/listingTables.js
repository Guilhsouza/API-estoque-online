const knex = require('../../connection/dbConnection')

const listingTables = async (req, res) => {
    const usernameSchema = `${req.user.name}${req.user.id}`

    try {
        const tablesForUser = await knex.select('table_name')
            .from('master_table')
            .withSchema(usernameSchema)
            .where('user_id', req.user.id).returning('table_name')

        return res.status(200).json({ message: `Tabelas do usuário ${req.user.name}`, tabelas: tablesForUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

module.exports = listingTables