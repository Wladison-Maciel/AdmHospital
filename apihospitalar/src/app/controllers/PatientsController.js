import Patient from "../models/Patient";
class PatientesController{
    // async index(req, res){

    // }

    // Método para buscar um único Patient
    async show(req, res) {
        try {
          const { id } = req.params; // Recebendo ID da URL

          // Verificando se o ID passado é válido
          if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
          }
      
          // Relizando busca do Patient
          const patient = await Patient.findOne({
            where: { id }, // Buscar onde o ID seja igual no PostgreeSQL
            // Removendo "has_companio" da exibição
            attributes: ['id', 'name', 'cpf', 'adress', 'phone', 'diagnosis', 'status', 'birth_date']
          });

          // Se não houver o Patient buscado
          if (!patient) {
            return res.status(404).json({ error: "Paciente não encontrado" });
          }

          // Resposta em caso de sucesso seguindo padrões REST
          return res.status(200).json({
            success: true,
            data: patient
          });
        } catch (error) {
          // Capturando um possível erro na busca
          console.error("Erro ao buscar paciente:", error.message);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
      }
      
      
    // async create(req,res){
        
    // }
    // async update(req,res){
        
    // }
    // async destroy(req,res){
        
    // }
}

export default new PatientesController();