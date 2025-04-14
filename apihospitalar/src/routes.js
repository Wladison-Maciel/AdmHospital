import { Router } from "express";
import { showCompanionParamsSchema } from './app/schemas/CompanionSchema.js';
import { validate } from './app/middlewares/validate.js';
import patients from "./app/controllers/PatientsController.js"
import companion from "./app/controllers/CompanionsController.js"
const routes = new Router(); 

// Rotas dos Pacientes
routes.get("/patients" , patients.index );
routes.get("/patients/:id" , patients.show );
routes.post("/patients" , patients.create );
routes.patch("/patients/:id" , patients.update );
routes.delete("/patients/:id" , patients.destroy );

// Rotas do Acompanhante
routes.get("/patient/:patient_id/companion", companion.index);
routes.get("/patient/:patient_id/companion/:id",validate(showCompanionParamsSchema, 'params'), companion.show);
routes.post("/patient/:patient_id/companion", companion.create);
routes.patch("/patient/:patient_id/companion/:id", companion.update);
routes.delete("/patient/:patient_id/companion/:id", companion.destroy);

export default routes;