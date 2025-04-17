import Companion from "../models/Companion";
import Patient from "../models/Patient";
import * as Yup from "yup";

class CompanionsController {
    async index(req, res) {

    }
    // Método para buscar um Acompanhante
    async show(req, res) {
        try {
            // Recebendo id e patient_id da URL
            const { id, patient_id } = req.params;

            // Relizando busca por companion
            const companion = await Companion.findOne({
                // Incluindo o patient para melhor informação
                include: [
                    {
                        model: Patient,
                        attributes: ["id", "name"],
                        required: true
                    }
                ],
                where: {
                    id,
                    patient_id
                },
                // Excluindo patient_id 
                attributes: ["id", "name", "phone", "cpf"],
                order: [["id", "ASC"]], // Ordenando os ID de forma crescente
            });
            // Retornando mensagem de erro em caso de falha
            if (!companion) {
                return res.status(404).json({ error: "Companion not found" })
            }
            // Retornando companion em caso de sucesso
            return res.status(200).json({
                success: true,
                data: companion
            });

        } catch (error) {
            // Capturando um possível erro na busca
            console.error("Error when searching for companion:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async create(req, res) {
        // Construindo um Schema com base no Model do Database
        const schema = Yup.object().shape({
            name: Yup.string().required("name is required").max(100),
            cpf: Yup.string().required("cpf is required").length(11),
            phone: Yup.string().required("adress is required").length(11),
            kinship: Yup.mixed()
                .oneOf(["PAI", "MÃE", "FILHO(A)", "IRMÃ(O)", "TIA(O)", "PRIMO(A)", "SOBRINHO(A)", "OUTRO"]).required("Kinship is required"),
            patient_id: Yup.number()
        });

        try {
            const existingCpf = await Companion.findOne({ where: { cpf: req.body.cpf } });
            if (existingCpf) {
                return res.status(409).json({ error: "CPF already registered." });
            }
            // Validando o schema - abortEarly (Irá continuar caso haja um erro e informará ao final)
            await schema.validate(req.body, { abortEarly: false });

            const companion = await Companion.create(req.body);

            res.status(201).json({
                success: true,
                data: companion,
            })
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

    }
    async destroy(req, res) {
        try {
            // Recebendo id e patient_id da URL
            const { id, patient_id } = req.params;
            // Verificando se as variáveis são válidas
            if (isNaN(id) || isNaN(patient_id)) {
                return res.status(400).json({ error: "Params Invalid" })
            }
            // Procurando o companion solicitado
            const companion = await Companion.findOne({
                where: {
                    id,
                    patient_id,
                }
            });
            // Retornando erro em caso de falha
            if (!companion) {
                return res.status(404).json({ error: "Companion not found" })
            }
            // Deletando customer em caso de sucesso
            await companion.destroy();
            // Retornando 204 sem corpo
            return res.status(204).send();
        } catch (error) {
            // Capturando um possível erro na busca
            console.error("Error when searching for companion:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new CompanionsController();