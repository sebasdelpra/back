import { inventario } from '../interfaces/inventario.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');
 
export async function getInventarioAll(req:Request, res: Response) {
   try { 
      const inventario = await conexion_mssql.request().query('SELECT * FROM inventario.dbo.inventario');
      return res.json(inventario.recordsets[0]);
   }
catch(error){
         const rollback = await conexion_mssql.request().query("rollback");
         res.json({estado:"error", data:error, rollabck:rollback});
      }
}


export async function createInventario(req: Request, res: Response) {
   const newInventario : inventario = req.body;   
   
   try {         
      await conexion_mssql.request().query("START TRANSACTION");
      await conexion_mssql.request().query("INSERT INTO inventario.dbo.inventario VALUES("+
                                                                              req.body.ID_Categoria + " ," +
                                                                        "'" + req.body.Producto               + "'," +
                                                                              req.body.ID_Marca     + " ," +
                                                                        "'" + req.body.Modelo                 + "'," +
                                                                        "'" + req.body.IdentificadorUnico     + "'," +
                                                                        "'" + req.body.NumFactura             + "'," +
                                                                              req.body.ID_Proveedor + " ," +
                                                                        "'" + req.body.FyH_Alta               + "'," +
                                                                        "'" + req.body.FyH_Baja               + "'," +
                                                                              req.body.ID_AreaResponsable     + " ," +
                                                                              req.body.ID_Responsable         + " ," +
                                                                        "'" + req.body.Responsable            + "'," +
                                                                        "'" + req.body.Tabla                  + "'," +
                                                                              req.body.ID_Tabla               +  ")");
                                                                        
      await conexion_mssql.request().query("COMMIT");
      return res.json({estado: 'INVENTARIO CREADO'})
   }
   catch(error){
            const rollback = await conexion_mssql.request().query("rollback");
            res.json({estado:"error", data:error, rollabck:rollback});
   }
}

export async function getInventario(req: Request, res: Response) {
   const id = req.params.apuestaId;
   try {   
         const inventario = await conexion_mssql.request().query('SELECT * FROM inventario.dbo.inventario WHERE ID_Inventario = @id',
         [{
            name: 'id',
            type: 'Int',
            value: id
         }])        
         return res.json(inventario.recordsets[0]);
                                                                           }
catch(error){         
         res.json({estado:"error", data:error});
      }
}


export async function deleteInventario(req: Request, res: Response) {
   const id = req.params.apuestaId;
   try { 
       await conexion_mssql.request().query("START TRANSACTION");
       const invetario = await conexion_mssql.request().query('DELETE FROM inventario.dbo.inventario WHERE ID_Inventario = @id',
       [{
         name: 'id',
         type: 'Int',
         value: id
      }])        
      await conexion_mssql.request().query("COMMIT");
      return res.json({
             message: 'INVENTARIO deleted'
      })
   }
   catch(error){
      const rollback = await conexion_mssql.request().query("rollback");
      res.json({estado:"error", data:error, rollabck:rollback});
   }
}
 
export async function updateInventario(req: Request, res: Response) {
   const id = req.params.id;
   const inventario : inventario = req.body;
   console.log (req.body);
   console.log (id);
   try { 
     // await rest.query("START TRANSACTION");      
      const xx = await conexion_mssql.request().query(
                 "UPDATE inventario.dbo.inventario  SET " +
                                 " [ID_Categoria]       = " + req.body.ID_Categoria       + " ," +
                                 " [Producto]           ='" + req.body.Producto           + "'," +
                                 " [ID_Marca]           = " + req.body.ID_Marca           + " ," +
                                 " [Modelo]             ='" + req.body.Modelo             + "'," +
                                 " [IdentificadorUnico] ='" + req.body.IdentificadorUnico + "'," +
                                 " [NumFactura]         ='" + req.body.NumFactura         + "'," +
                                 " [ID_Proveedor]       = " + req.body.ID_Proveedor       + " ," +
                                 " [FyH_Alta]           ='" + req.body.FyH_Alta           + "'," +
                                 " [FyH_Baja]           ='" + req.body.FyH_Baja           + "'," +
                                 " [ID_AreaResponsable] = " + req.body.ID_AreaResponsable + " ," +
                                 " [ID_Responsable]     = " + req.body.ID_Responsable     + " ," +
                                 " [Responsable]        ='" + req.body.Responsable        + "'," +
                                 " [Tabla]              ='" + req.body.Tabla              + "'," +
                                 " [ID_Tabla]           = " + req.body.ID_Tabla           + "  " + 
                           " WHERE ID_Inventario = @id ", 
                           [{
                           name: 'id',
                           type: 'Int',
                           value: id
                           }]) 

     // await rest.query("COMMIT");
      return res.json({
         message: 'INVENTARIO modificado'
      });
}
catch(error){
   const rollback = await conexion_mssql.request().query("rollback");
   res.json({estado:"error", data:error, rollabck:rollback});
   }
}