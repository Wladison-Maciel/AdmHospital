import { Router } from "express";
import { showCompanionParamsSchema } from './app/schemas/CompanionSchema.js';
import { validate } from './app/middlewares/validate.js';
import patients from "./app/controllers/PatientsController.js";
import companion from "./app/controllers/CompanionsController.js";
import users from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js";
import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();

// Rotas públicas
routes.post("/sessions", SessionsController.store);
routes.post("/users", users.create);

routes.use(authMiddleware);

// Rotas dos Pacientes
routes.get("/patients", patients.index);
routes.get("/patients/:id", patients.show);
routes.post("/patients", patients.create);
routes.patch("/patients/:id", patients.update);
routes.delete("/patients/:id", patients.destroy);

// Rotas do Acompanhante
routes.get("/patients/:patient_id/companion/:id", validate(showCompanionParamsSchema, 'params'), companion.show);
routes.post("/patients/:patient_id/companion", companion.create);
routes.patch("/patients/:patient_id/companion/:id", companion.update);
routes.delete("/patients/:patient_id/companion/:id", companion.destroy);

// Rotas dos Users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;