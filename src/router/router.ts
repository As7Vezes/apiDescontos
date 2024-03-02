import { Router } from "express";
import { Request, Response } from "express";
import { executarScriptEEnviarDados } from "../services/scriptPost";

const router: Router = Router();

let dadosRecebidos: any = null;

import { getDatabase, ref, set, get } from "firebase/database";

async function salvarDadosNoFirebase(dados: any, res: Response) {
  try {
    const database = getDatabase();
    const produtosRef = ref(database, "produtos");

    await set(produtosRef, dados);
    console.log("Dados salvos com sucesso no Firebase Realtime Database");
    
    res.redirect("/mostrarDados");
  } catch (error) {
    console.error("Erro ao salvar dados no Firebase Realtime Database:", error);
    throw error;
  }
}

async function executarScriptERedirecionar(req: Request, res: Response) {
  try {
    console.log("executando o script");
    dadosRecebidos = await executarScriptEEnviarDados();
    res.redirect("/mostrarDados");
  } catch (error) {
    console.log("Erro ao processar os dados:", error);
    res.status(500).send("Erro ao processar os dados.");
  }
}

router.post("/receberDados", async (req: Request, res: Response) => {
  try {
    const dadosRecebidos = req.body;
    await salvarDadosNoFirebase(dadosRecebidos, res);
  } catch (error) {
    console.error("Erro ao salvar dados no Firebase:", error);
    res.status(500).send("Erro ao salvar dados no Firebase.");
  }
});

router.get("/", async (req, res) => {
  if (!dadosRecebidos) {
    await executarScriptERedirecionar(req, res);
  } else {
    res.redirect("/mostrarDados");
  }
});

router.get("/mostrarDados", async (req: Request, res: Response) => {
  try {
    if (dadosRecebidos) {
      res.send(dadosRecebidos);
    } else {
      res.send("Nenhum dado foi encontrado no Firebase.");
    }
  } catch (error) {
    console.log("Erro ao mostrar os dados:", error);
    res.status(500).send("Erro ao mostrar os dados.");
  }
});

export { router };
