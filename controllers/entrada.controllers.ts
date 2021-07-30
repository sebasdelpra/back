import { entrada } from '../interfaces/entrada.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');
export async function getEntradaAll(req:Request, res: Response)  {
   const entrada = await conexion_mssql.executeQuery("SELECT * FROM inventario.dbo.Entrada ");
   return res.json(entrada.data[0]);
};

export async function createEntrada(req: Request, res: Response) {
   await conexion_mssql.executeQuery("INSERT INTO inventario.dbo.Entrada VALUES ( " + req.body.ID_Inventario  + " ," +                                                                     
                                                                      "'" + req.body.Motivo_Ingreso + "'," +
                                                                      "'" + req.body.FyH_Entrada    + "'," +                                                                      
                                                                      "'" + req.body.Observacion    + "')");
   return res.json({ 
      message: 'ENTRADA creada'
    });
}

export async function getEntrada(req: Request, res: Response)  {
   const id = req.params.id;
   const entrada = await conexion_mssql.executeQuery('SELECT * FROM inventario.dbo.Entrada WHERE ID_Entrada = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }])  
   return res.json(entrada.data[0]);
}

export async function deleteEntrada(req: Request, res: Response)  {
   const id = req.params.id;
   try { 
      const salida = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.Entrada WHERE ID_Entrada = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 
      return res.json({
         message: 'ENTRADA deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    

export async function updateEntrada(req: Request, res: Response) {
   const id = req.params.id;
   const entrada = await conexion_mssql.executeQuery( 
             "UPDATE inventario.dbo.Entrada SET [ID_Inventario]  =  " + req.body.ID_Inventario  + " ," +
                                             "  [Motivo_Ingreso] = '" + req.body.Motivo_Ingreso + "'," +
                                             "  [FyH_Entrada]    = '" + req.body.FyH_Entrada    + "'," +                                           
                                             "  [Observacion]    = '" + req.body.Observacion    + "' " +
                                             " WHERE ID_Entrada  = @id", 
                                            [{
                                                name: 'id',
                                                type: 'Int',
                                                value: id
                                            }]) 
   return res.json({
      message: 'ENTRADA update'
   });
}
