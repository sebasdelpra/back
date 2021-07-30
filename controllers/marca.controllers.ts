import { marca } from '../interfaces/marca.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');

export async function getMarcaAll(req:Request, res: Response)  {
   const marca = await conexion_mssql.executeQuery('SELECT * FROM inventario.dbo.Marca ');
   return res.json(marca.data[0]);
}
 
export async function createMarca(req: Request, res: Response) {
   const Marca : marca = req.body;   
   
   try {         
      await conexion_mssql.executeQuery("START TRANSACTION");
      await conexion_mssql.executeQuery("INSERT INTO inventario.dbo.Marca VALUES ('" + req.body.Marca+ "')");
      await conexion_mssql.executeQuery("COMMIT");
      return res.json({estado: 'MARCA creada'})
   }
   catch(error){
            const rollback = await conexion_mssql.executeQuery("rollback");
            res.json({estado:"error", data:error, rollabck:rollback});
         }
}

export async function getMarca(req: Request, res: Response) {
   const id = req.params.id;   
   const marca = await conexion_mssql.executeQuery(
       'SELECT * FROM inventario.dbo.Marca WHERE ID_Marca = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }])    
   return res.json(marca.data[0]);
} 

export async function deleteMarca(req: Request, res: Response) {
   const id = req.params.id;
   try { 
      const marca = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.Marca WHERE ID_Marca = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 

      console.log(marca.values)
      return res.json({
         message: 'MARCA deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    
 
export async function updateMarca(req: Request, res: Response) {
   const id = req.params.id;   
   //console.log(req.body)
   const marca = await conexion_mssql.executeQuery( 
             "UPDATE inventario.dbo.Marca SET [Marca]  = '" + req.body.Marca  + "'" +
                                        " WHERE ID_Marca = @id", 
                                          [{
                                             name: 'id',
                                             type: 'Int',
                                             value: id
                                          }]) 

   return res.json({
      message: 'MARCA update'
   });
}