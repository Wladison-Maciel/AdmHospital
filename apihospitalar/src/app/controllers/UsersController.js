import User from "../models/User";
import { Op } from "sequelize";
import { parseISO } from 'date-fns'
import * as Yup from 'yup';


class UsersController {
    async index(req, res) {
        // Extrai os parâmetros de consulta (query) da requisição
        const {
            name,           // Nome do cliente
            email,          // Email do cliente
            createdBefore,  // Data limite de criação (antes desta data)
            createdAfter,   // Data mínima de criação (após esta data)
            updatedBefore,  // Data limite de atualização (antes desta data)
            updatedAfter,   // Data mínima de atualização (após esta data)
            sort            // Ordenação dos resultados
        } = req.query;

        // Define a página atual e o limite de itens por página
        const page = req.query.page || 1; // Se não for passado, assume 1
        const limit = req.params.limit || 25; // Se não for passado, assume 25

        let where = {}; // Objeto onde serão armazenadas as condições da consulta
        let order = []; // Array para armazenar critérios de ordenação

        // Filtros opcionais
        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name, // Filtra nomes semelhantes (case insensitive, útil para PostgreSQL)
                }
            }
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email, // Filtra emails semelhantes (case insensitive)
                }
            }
        }
        // Filtros por data de criação
        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore), // Filtra registros criados antes da data especificada
                }
            }
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter), // Filtra registros criados depois da data especificada
                }
            }
        }

        // Filtros por data de atualização
        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore), // Filtra registros atualizados antes da data especificada
                }
            }
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter), // Filtra registros atualizados depois da data especificada
                }
            }
        }

        // Ordenação dos resultados (exemplo: "name:asc,email:desc")
        if (sort) {
            order = sort.split(",").map(item => item.split(":")); // Transforma a string de ordenação em um array
        }

        // Busca os registros no banco de dados com base nos filtros e ordenação
        const data = await User.findAll({
            attributes: { exclude: ["password", "password_hash"] },
            where, // Aplica os filtros
            order: [["id", "ASC"]],
            limit, // Define o limite de registros por página
            offset: limit * page - limit, // Calcula o deslocamento para a paginação
        });
        return res.status(200).json(data); // Retorna os resultados da consulta como JSON
    }
    async show(req, res) {
        const id = parseInt(req.params.id, 10); // Recebendo id passado na URL a transformando em INT
        const data = await User.findOne({ // Procurando somente um customer
            where: { // Fazendo a busca por meio de Operadores
                id: {
                    [Op.eq]: id // Verificando se o id corresponde ao da URL
                },
            },
        });
        const status = data ? 200 : 404; // Verifica o status code, mantendo os principios de API Rest
        return res.status(status).json(data)
    }
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(8),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password ? field.required().oneOf([Yup.ref("password")]) : field

            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro em validar Schema" });
        }

        const { id, name, email, createdAt, updatedAt } = await User.create(req.body);
        return res.status(201).json({ id, name, email, createdAt, updatedAt })
    }
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8).when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password ? field.required().oneOf([Yup.ref("password")]) : field

            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro em validar Schema" });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "Registro não encontrado" })
        }

        const { oldPassword } = req.body;

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({error: "User password not match"})
        }

        const { id, name, email, createdAt, updatedAt } = await user.update(req.body);
        return res.status(201).json({ id, name, email, createdAt, updatedAt })
    }
    async destroy(req, res) {
        const user = await User.findByPk(req.params.id);

        if(!user){
            return res.status(404).json({error:"Registro não encontrado"})
        }

        await user.destroy();

        res.status(200).json({message:"Registro excluído com sucesso"})
    }
}

export default new UsersController();
