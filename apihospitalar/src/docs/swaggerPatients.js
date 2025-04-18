/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Endpoints para gerenciamento de pacientes
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retorna os dados de um paciente específico
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do paciente
 *       404:
 *         description: Paciente não encontrado
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthDate
 *             properties:
 *               name:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /patients/{id}:
 *   patch:
 *     summary: Atualiza os dados de um paciente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do paciente a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       404:
 *         description: Paciente não encontrado
 */

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Remove um paciente do sistema
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do paciente a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente removido com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
