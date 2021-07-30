import  { Request, Response } from 'express';

export function indexUsuario(req:Request, res:Response)  {
       return res.json('welcome usuario')
}

export function indexInventario(req:Request, res:Response)  {
       return res.json('welcome Inventario')
}

export function indexEntrada(req:Request, res:Response)  {
       return res.json('welcome Entrada')
}

export function indexCategoria(req:Request, res:Response)  {
       return res.json('welcome Categoria')
}

export function indexMarca(req:Request, res:Response)  {
       return res.json('welcome Marca')
}
 