import * as Yup from "yup";
import Patient from "../models/Patient";
class PatientesController {
    // async index(req, res){

    // }

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
                where: { id }, // Buscar onde o ID seja igual no PostgreeSQL
                // Removendo "has_companio" da exibição
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
    // async update(req,res){

    // }
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

export default new PatientesController();