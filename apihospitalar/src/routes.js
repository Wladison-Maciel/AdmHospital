import { Router } from "express";
import patients from "./app/controllers/PatientsController.js"
const routes = new Router(); 

// Rotas dos Pacientes
routes.get("/patients" , patients.index );
routes.get("/patients/:id" , patients.show );
routes.post("/patients" , patients.create );
routes.patch("/patients/:id" , patients.update );
routes.delete("/patients/:id" , patients.destroy );

export default routes;