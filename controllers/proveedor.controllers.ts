import { proveedor } from '../interfaces/proveedor.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';

import { Router, Request, Response } from 'express';

//const { rest } = require('../database');

export async function getProveedorAll(req:Request, res: Response)  {
   const proveedor = await conexion_mssql.executeQuery("SELECT * FROM inventario.dbo.Proveedor ");
   return res.json(proveedor.data[0]);
};

export async function createProveedor(req: Request, res: Response) {
   await conexion_mssql.executeQuery("INSERT INTO inventario.dbo.Proveedor VALUES ('" + req.body.Proveedor + "'," +
                                                                        "'" + req.body.Telefono  + "'," +
                                                                        "'" + req.body.Direccion + "'," +
                                                                        "'" + req.body.SitioWeb  + "'," +
                                                                        "'" + req.body.Correo    + "'," +
                                                                        "'" + req.body.Contacto  + "')");
   return res.json({ 
      message: 'PROVEEDOR creada'
    });
}

export async function getProveedor(req: Request, res: Response)  {
   const id = req.params.id;
    
   const proveedor = await conexion_mssql.executeQuery('SELECT * FROM inventario.dbo.Proveedor WHERE ID_Proveedor = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }])  
   console.log(proveedor.data[0]);
   return res.json(proveedor.data[0]);
}


export async function deleteProveedor(req: Request, res: Response)  {
   const id = req.params.id;
   try { 
      const proveedor = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.Proveedor WHERE ID_Proveedor = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 
      return res.json({
         message: 'PROVEEDOR deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    

export async function updateProveedor(req: Request, res: Response) {
   const id = req.params.id;
   const proveedor = await conexion_mssql.executeQuery( 
             "UPDATE inventario.dbo.Proveedor SET  [Proveedor] = '" + req.body.Proveedor + "'," +
                                                "  [Telefono]  = '" + req.body.Telefono  + "'," +
                                                "  [Direccion] = '" + req.body.Direccion + "'," +
                                                "  [SitioWeb]  = '" + req.body.SitioWeb  + "'," +
                                                "  [SitioWeb]  = '" + req.body.Correo    + "'," +
                                                "  [Correo]    = '" + req.body.Contacto  + "' " +
                                                " WHERE ID_Proveedor = @id", 
                                                [{
                                                   name: 'id',
                                                   type: 'Int',
                                                   value: id
                                                }]) 
   return res.json({
      message: 'PROVEEDOR update'
   });
}
