import { salida } from '../interfaces/salida.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');

export async function getSalidaAll(req:Request, res: Response)  {
   const salida = await conexion_mssql.executeQuery("SELECT * FROM inventario.dbo.Salida ");
   return res.json(salida.data[0]);
};

export async function createSalida(req: Request, res: Response) {
   await conexion_mssql.executeQuery("INSERT INTO inventario.dbo.Salida VALUES ( " + req.body.ID_Inventario  + " ," +
                                                                     "'" + req.body.FyH_Entrega    + "'," +
                                                                     " " + req.body.ID_Destino     + " ," +
                                                                     " " + req.body.IDPersona      + " ," +
                                                                     "'" + req.body.Motivo         + "'," +
                                                                     " " + req.body.ID_Autorizador + " ," +
                                                                     " " + req.body.Autorizador    + " ," +
                                                                     "'" + req.body.Observacion    + "')");
   return res.json({ 
      message: 'SALIDA creada'
    });
}

export async function getSalida(req: Request, res: Response)  {
   const id = req.params.id;
   const salida = await conexion_mssql.executeQuery('SELECT * FROM inventario.dbo.Salida WHERE ID_Salida = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }])  
   console.log(salida.data[0]);
   return res.json(salida.data[0]);
}

export async function deleteSalida(req: Request, res: Response)  {
   const id = req.params.id;
   try { 
      const salida = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.Salida WHERE ID_Salida = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 
      return res.json({
         message: 'SALIDA deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    

export async function updateSalida(req: Request, res: Response) {
   const id = req.params.id;
   const salida = await conexion_mssql.executeQuery( 
             "UPDATE inventario.dbo.Salida SET [ID_Inventario]  =  " + req.body.ID_Inventario  + " ," +
                                            "  [FyH_Entrega]    = '" + req.body.FyH_Entrega    + "'," +
                                            "  [ID_Destino]     =  " + req.body.ID_Destino     + " ," +
                                            "  [IDPersona]      =  " + req.body.IDPersona      + " ," +
                                            "  [Motivo]         = '" + req.body.Motivo         + "'," +
                                            "  [ID_Autorizador] =  " + req.body.ID_Autorizador + " ," +
                                            "  [Autorizador]    =  " + req.body.Autorizador    + " ," +
                                            "  [Observacion]    = '" + req.body.Observacion    + "' " +
                                            " WHERE ID_Salida  = @id", 
                                            [{
                                                name: 'id',
                                                type: 'Int',
                                                value: id
                                            }]) 
   return res.json({
      message: 'SALIDA update'
   });
}
