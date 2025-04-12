import * as Yup from "yup";
import Patient from "../models/Patient";
import { Op } from "sequelize";
import Companion from "../models/Companion";
class PatientsController {
    async index(req, res) {
        const {
            name,
            cpf,
            birth_date,
            adress,
            phone,
            diagnosis,
            status,
            has_companion,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query;
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 25;
        const offset = (page - 1) * limit;
    
        let where = {};
        let order = [];
    
        // Filtros de texto
        if (name) {
            where.name = { [Op.iLike]: `%${name}%` };
        }
        if (cpf) {
            where.cpf = { [Op.iLike]: `%${cpf}%` };
        }
        if (adress) {
            where.adress = { [Op.iLike]: `%${adress}%` };
        }
        if (phone) {
            where.phone = { [Op.iLike]: `%${phone}%` };
        }
        if (diagnosis) {
            where.diagnosis = { [Op.iLike]: `%${diagnosis}%` };
        }
    
        // Filtro de data de nascimento
        if (birth_date) {
            where.birth_date = birth_date; // formato YYYY-MM-DD já é válido
        }
    
        // Filtro booleano
        if (has_companion !== undefined) {
            if (has_companion === "true" || has_companion === "false") {
                where.has_companion = has_companion === "true";
            }
        }
    
        // Status múltiplos
        if (status) {
            where.status = {
                [Op.in]: status.split(",").map(s => s.toUpperCase()),
            };
        }
    
        // Datas de criação
        if (createdBefore || createdAfter) {
            where.createdAt = {};
            if (createdAfter) where.createdAt[Op.gte] = parseISO(createdAfter);
            if (createdBefore) where.createdAt[Op.lte] = parseISO(createdBefore);
        }
    
        // Datas de atualização
        if (updatedBefore || updatedAfter) {
            where.updatedAt = {};
            if (updatedAfter) where.updatedAt[Op.gte] = parseISO(updatedAfter);
            if (updatedBefore) where.updatedAt[Op.lte] = parseISO(updatedBefore);
        }
    
        // Ordenação
        if (sort) {
            order = sort.split(",").map(item => {
                const [field, direction] = item.split(":");
                return [field, direction?.toUpperCase() === "DESC" ? "DESC" : "ASC"];
            });
        }
    
        try {
            const { rows, count } = await Patient.findAndCountAll({
                where,
                order,
                limit,
                offset,
            });
    
            return res.status(200).json({
                success: true,
                data: rows,
                meta: {
                    total: count,
                    page,
                    totalPages: Math.ceil(count / limit)
                }
            });
    
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error.message);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    // Método para buscar um único Patient
    async show(req, res) {
        try {
            const { id } = req.params; // Recebendo ID da URL

            // Verificando se o ID passado é válido
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID invalid" });
            }

            // Relizando busca do Patient
            const patient = await Patient.findOne({
                include: [
                    {
                        model: Companion,
                        attributes: ["id","name"],
                        required: false,
                    }
                ],
                where: { id }, // Buscar onde o ID seja igual no PostgreeSQL
                // Removendo "has_companion" da exibição
                attributes: ['id', 'name', 'cpf', 'adress', 'phone', 'diagnosis', 'status', 'birth_date']
            });

            // Se não houver o Patient buscado
            if (!patient) {
                return res.status(404).json({ error: "Pacient not found" });
            }

            // Resposta em caso de sucesso seguindo padrões REST
            return res.status(200).json({
                success: true,
                data: patient
            });
        } catch (error) {
            // Capturando um possível erro na busca
            console.error("Error when searching for patient:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async create(req, res) {
        // Construindo um Schema com base no Model do Database
        const schema = Yup.object().shape({
            name: Yup.string().required("name is required").max(100),
            cpf: Yup.string().required("cpf is required").length(11),
            adress: Yup.string().required("adress is required").max(150),
            phone: Yup.string().required("phone is required").length(11),
            diagnosis: Yup.string().required("diagnosis is required").max(250),
            status: Yup.mixed()
                .oneOf(["LEVE", "ALERTA", "GRAVE"]).required("Status is required"),
            birth_date: Yup.string()
                .required("birth_date is required")
                .matches(/^\d{4}-\d{2}-\d{2}$/, "Format birth_date YYYY-MM-DD")
                .test("is-valid-date", "Date invalid", (value) => {
                    return !isNaN(Date.parse(value));
                }),
            has_companion: Yup.boolean().required("has_companion is required (true or false)")
        });
        try {
            // Verificando se há um cpf igual já cadastrado
            const existingCpf = await Patient.findOne({ where: { cpf: req.body.cpf } });
            if (existingCpf) {
                return res.status(409).json({ error: "CPF already registered." });
            }
            // Validando o schema - abortEarly (Irá continuar caso haja um erro e informará ao final)
            await schema.validate(req.body, { abortEarly: false });
            // Criando um Patient com o json do body
            const patient = await Patient.create(req.body)
            // Retornando a resposta em caso de sucesso
            res.status(201).json({
                success: true,
                data: patient
            });
        } catch (error) {
            // Caso a validação falhar
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({
                    error: "Erro Validation",
                    message: error.errors
                });
            }
            // Qualquer outro erro interno
            console.error("Error creating patient:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params; // Pegando o ID da URL
            // Verificando se o ID é válido
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID invalid" });
            }
            // Fazendo a busca pelo patient
            const patient = await Patient.findByPk(id);
            // Verificando se o há um patient com o ID procurado
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }
            // Verificando se no body há ao menos um campo para fazer a requisição
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: "No data provided for update" });
            }
            // Criando um schema para a validação da atualização
            const schema = Yup.object().shape({
                name: Yup.string().max(100),
                cpf: Yup.string().length(11),
                adress: Yup.string().max(150),
                phone: Yup.string().length(11),
                diagnosis: Yup.string().max(250),
                status: Yup.mixed().oneOf(["LEVE", "ALERTA", "GRAVE"]),
                birth_date: Yup.date(),
                has_companion: Yup.boolean(),
            });
            // Válidando o schema
            await schema.validate(req.body, { abortEarly: false });

            // Verifica se id está presente no body e remove
            if ('id' in req.body) {
                delete req.body.id;
            }
            // Atualizando o patient com os dados fornecidis
            await patient.update(req.body);
            // Retornando resposta em caso de sucesso
            return res.status(200).json({
                success: true,
                message: "Patient successfully updated",
                data: patient,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({
                    error: "Validation error",
                    messages: error.errors,
                });
            }

            console.error("Error updating patient:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params; // Recebendo ID da URL
            // Verificando se o ID passado é válido
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID invalid" });
            }
            // Procurando o patient pelo id
            const patient = await Patient.findByPk(id);
            // Se ele não existir
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" })
            }
            // Excluindo o patient encontrado
            await patient.destroy();
            // Respondendo sem corpo da requisição
            return res.status(204).send();

        } catch (error) {
            // Capturando um possível erro na busca
            console.error("Error when searching for patient:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new PatientsController();