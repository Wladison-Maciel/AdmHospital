/**
 * @swagger
 * components:
 *   schemas:
 *     Companion:
 *       type: object
 *       required:
 *         - name
 *         - relationship
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do acompanhante
 *         relationship:
 *           type: string
 *           description: Relacionamento do acompanhante com o paciente
 *         phone:
 *           type: string
 *           description: Número de telefone do acompanhante
 */

/**
 * @swagger
 * /patients/{patient_id}/companion/{id}:
 *   get:
 *     summary: Retorna um acompanhante específico de um paciente
 *     tags: [Companion]
 *     parameters:
 *       - name: patient_id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do acompanhante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acompanhante encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Companion'
 *       404:
 *         description: Acompanhante ou paciente não encontrado
 */
 
/**
 * @swagger
 * /patients/{patient_id}/companion:
 *   post:
 *     summary: Cria um novo acompanhante para um paciente
 *     tags: [Companion]
 *     parameters:
 *       - name: patient_id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Companion'
 *     responses:
 *       201:
 *         description: Acompanhante criado com sucesso
 *       400:
 *         description: Erro ao validar os dados
 */
 
/**
 * @swagger
 * /patients/{patient_id}/companion/{id}:
 *   patch:
 *     summary: Atualiza as informações de um acompanhante de um paciente
 *     tags: [Companion]
 *     parameters:
 *       - name: patient_id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do acompanhante
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Companion'
 *     responses:
 *       200:
 *         description: Acompanhante atualizado com sucesso
 *       400:
 *         description: Erro ao validar os dados
 *       404:
 *         description: Acompanhante ou paciente não encontrado
 */
 
/**
 * @swagger
 * /patients/{patient_id}/companion/{id}:
 *   delete:
 *     summary: Exclui um acompanhante de um paciente
 *     tags: [Companion]
 *     parameters:
 *       - name: patient_id
 *         in: path
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do acompanhante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acompanhante excluído com sucesso
 *       404:
 *         description: Acompanhante ou paciente não encontrado
 */
