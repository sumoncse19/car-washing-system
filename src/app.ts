import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`Server health is good and running well`);
});
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
