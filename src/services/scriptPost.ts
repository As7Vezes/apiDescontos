import axios from "axios";
import { executarScriptPython } from "../pythonShell";

// Função para executar o script Python e enviar os dados para a rota POST
async function executarScriptEEnviarDados() {
    try {
      // Executar o script Python e obter os dados
      let dadosRecebidos = await executarScriptPython();
  
      // Enviar os dados para a rota POST
      await axios.post('/receberDados', dadosRecebidos);
    } catch (error) {
      console.error('Erro ao executar o script e enviar os dados:', error);
      throw error; // Lançar o erro para ser tratado posteriormente
    }
  }
  
export { executarScriptEEnviarDados }