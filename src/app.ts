import express, {Application, Request, Response} from "express";

import cors from "cors";

const app: Application = express();

// middlewares
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// root route

app.get("/", (req: Request, res: Response) => {
  res.send("working successfully");
});

export default app;
