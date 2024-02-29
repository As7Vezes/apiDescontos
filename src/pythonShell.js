import fs from 'fs';
import { PythonShell } from 'python-shell';
import path from 'path';

function executarScriptPython() {

    let opcoes = {
        mode: 'text',
    };

    return new Promise((resolve, reject) => {
        PythonShell.run('mercadoLivreAllOfers.py', opcoes, (erro, resultado) => {
            if (erro) {
                reject(erro);
            } else {
                console.log('Resultado obtido com sucesso:', resultado);
                resolve(resultado);
            }
            return resultado
        });
    });
}

export { executarScriptPython };
