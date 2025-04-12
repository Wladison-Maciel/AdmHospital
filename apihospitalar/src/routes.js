import { Router } from "express";
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
routes.get("/patient/:patiendId/companion", companion.index);
routes.get("/patient/:patiendId/companion/:id", companion.show);
routes.create("/patient/:patiendId/companion", companion.create);
routes.get("/patient/:patiendId/companion/:id", companion.update);
routes.get("/patient/:patiendId/companion/:id", companion.destroy);

export default routes;