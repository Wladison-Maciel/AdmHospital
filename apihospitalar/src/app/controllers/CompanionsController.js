import { Op } from "sequelize";
import Companion from "../models/Companion";
import Patient from "../models/Patient";

class CompanionsController {
    async index(req, res) {

    }
    async show(req, res) {
        try {
            const { id, patient_id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID companion invalid" });
            }

            if (isNaN(patient_id)) {
                return res.status(404).json({ error: "ID patient invalid" })
            }

            const companion = await Companion.findOne({
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
                attributes: ["id", "name", "phone", "cpf"],
                order: [["id", "ASC"]],
            });

            if (!companion) {
                return res.status(404).json({ error: "Companion not found" })
            }

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

    }
}

export default new CompanionsController();