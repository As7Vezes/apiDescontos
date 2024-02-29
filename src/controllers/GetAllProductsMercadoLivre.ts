import { Request, Response } from "express";

class GetAllProductsMercadoLivre {

    public mercadoLivregetAllProducts (req: Request, res: Response, dadosRecebidos: any) {
        try {
            console.log("Dados recebidos com sucesso meu fi:", dadosRecebidos);
            if(dadosRecebidos){
                console.log("parça os dados foram recebido sim")
                res.status(302).set('Location', '/mostrarDados').send();
            }
        } catch (error) {
            console.error("Erro ao receber dados:", error);
            res.status(500).send("Erro ao receber dados");
        }
    }

}

export const getallProducts = new GetAllProductsMercadoLivre()
