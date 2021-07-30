import { categoria } from '../interfaces/categoria.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');


export async function getCategoriaAll(req:Request, res: Response)  {
   const categoria = await conexion_mssql.executeQuery('SELECT * FROM  inventario.dbo.Categoria');
   return res.json(categoria.data[0]);
}

export async function createCategoria(req: Request, res: Response) {
      await conexion_mssql.executeQuery("INSERT INTO inventario.dbo.Categoria VALUES ('" + req.body.categoria+ "')");
 
   return res.json({ 
      message: 'CATEGORIA creado'
    });
}

export async function getCategoria(req: Request, res: Response)  {
   const id = req.params.id;   
   const categoria = await conexion_mssql.executeQuery(
       'SELECT * FROM inventario.dbo.Categoria WHERE ID_Categoria = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }])  
  // console.log(equipo.data[0]);
   return res.json(categoria.data[0]);
}
   
export async function deleteCategoria(req: Request, res: Response)  {
   const id = req.params.id;
   console.log(id);
   try { 
      const categoria = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.Categoria WHERE ID_Categoria = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 

      console.log(categoria.values)
      return res.json({
         message: 'CATEGORIA deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    

export async function updateCategoria(req: Request, res: Response): Promise<Response> {
   const id = req.params.id;
   
   console.log(req.body)
   const categoria = await conexion_mssql.executeQuery( 
             "UPDATE inventario.dbo.Categoria SET [Categoria]  = '" + req.body.categoria  + "'" +
                                                " WHERE ID_Categoria = @id", 
                                                   [{
                                                      name: 'id',
                                                      type: 'Int',
                                                      value: id
                                                   }]) 

   return res.json({
      message: 'CATEGORIA update'
   });
}
