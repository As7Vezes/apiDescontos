import { Request, Response } from "express";

class AllProductsMercadoLivre {
     public mercadoLivreAllProducts (req: Request, res: Response, dadosRecebidos: any) {
    
        if (dadosRecebidos) {
            res.send(dadosRecebidos);
        } else {
            res.send("Nenhum dado foi recebido ainda.");
        }
    }
}

export const allProductsMercadoLivre = new AllProductsMercadoLivre()