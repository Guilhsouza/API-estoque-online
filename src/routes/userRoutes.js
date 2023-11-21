const { Router } = require('express')

const createUser = require('../controllers/user/createUser')
const login = require('../controllers/user/login')
const getUser = require('../controllers/user/getUser')

const createTable = require('../controllers/table/createTable')
const insertProducts = require('../controllers/table/insertProducts')
const updateProdutcs = require('../controllers/table/updateProducts')
const listingTables = require('../controllers/table/listingTables')
const deleteProduct = require('../controllers/table/deleteProducts')
const deleteTable = require('../controllers/table/deleteTable')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const createUserValidate = require('../schemas/createUserSchema')
const loginValidate = require('../schemas/loginSchema')
const createTableSchema = require('../schemas/createTableSchema')
const addProductsSchema = require('../schemas/addProductsSchema')
const updateProductsSchema = require('../schemas/updateProductsSchema')

const routes = Router()

routes.post('/user', validateBodyReq(createUserValidate), createUser)
routes.post('/user/login', validateBodyReq(loginValidate), login)
routes.get('/user/:id', getUser)

routes.use(verifyToken)

routes.post('/table', validateBodyReq(createTableSchema), createTable)
routes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
routes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
routes.get('/table', listingTables)
routes.delete('/table/:tableName/:product_id', deleteProduct)
routes.delete('/table/:tableName', deleteTable)

module.exports = routes


