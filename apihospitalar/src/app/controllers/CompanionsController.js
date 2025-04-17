import Companion from "../models/Companion";
import Patient from "../models/Patient";

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

    }
    async update(req, res) {

    }
    async destroy(req, res) {
        try {
            const { id, patient_id } = req.params;

            if(isNaN(id) || isNaN(patient_id)){
                return res.status(400).json({ error: "Params Invalid"})
            }

            const companion = await Companion.findOne({
                where: {
                    id,
                    patient_id,
                }
            });

            if (!companion) {
                return res.status(404).json({ error: "Companion not found" })
            }
            await companion.destroy();

            return res.status(204).send();
        } catch (error) {
            // Capturando um possível erro na busca
            console.error("Error when searching for companion:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new CompanionsController();