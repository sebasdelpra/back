"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventario = exports.deleteInventario = exports.getInventario = exports.createInventario = exports.getInventarioAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getInventarioAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventario = yield conexion_mssql_1.default.request().query('SELECT * FROM inventario.dbo.inventario');
            return res.json(inventario.recordsets[0]);
        }
        catch (error) {
            const rollback = yield conexion_mssql_1.default.request().query("rollback");
            res.json({ estado: "error", data: error, rollabck: rollback });
        }
    });
}
exports.getInventarioAll = getInventarioAll;
function createInventario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newInventario = req.body;
        try {
            yield conexion_mssql_1.default.request().query("START TRANSACTION");
            yield conexion_mssql_1.default.request().query("INSERT INTO inventario.dbo.inventario VALUES(" +
                req.body.ID_Categoria + " ," +
                "'" + req.body.Producto + "'," +
                req.body.ID_Marca + " ," +
                "'" + req.body.Modelo + "'," +
                "'" + req.body.IdentificadorUnico + "'," +
                "'" + req.body.NumFactura + "'," +
                req.body.ID_Proveedor + " ," +
                "'" + req.body.FyH_Alta + "'," +
                "'" + req.body.FyH_Baja + "'," +
                req.body.ID_AreaResponsable + " ," +
                req.body.ID_Responsable + " ," +
                "'" + req.body.Responsable + "'," +
                "'" + req.body.Tabla + "'," +
                req.body.ID_Tabla + ")");
            yield conexion_mssql_1.default.request().query("COMMIT");
            return res.json({ estado: 'INVENTARIO CREADO' });
        }
        catch (error) {
            const rollback = yield conexion_mssql_1.default.request().query("rollback");
            res.json({ estado: "error", data: error, rollabck: rollback });
        }
    });
}
exports.createInventario = createInventario;
function getInventario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.apuestaId;
        try {
            const inventario = yield conexion_mssql_1.default.request().query('SELECT * FROM inventario.dbo.inventario WHERE ID_Inventario = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            return res.json(inventario.recordsets[0]);
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.getInventario = getInventario;
function deleteInventario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.apuestaId;
        try {
            yield conexion_mssql_1.default.request().query("START TRANSACTION");
            const invetario = yield conexion_mssql_1.default.request().query('DELETE FROM inventario.dbo.inventario WHERE ID_Inventario = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            yield conexion_mssql_1.default.request().query("COMMIT");
            return res.json({
                message: 'INVENTARIO deleted'
            });
        }
        catch (error) {
            const rollback = yield conexion_mssql_1.default.request().query("rollback");
            res.json({ estado: "error", data: error, rollabck: rollback });
        }
    });
}
exports.deleteInventario = deleteInventario;
function updateInventario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const inventario = req.body;
        console.log(req.body);
        console.log(id);
        try {
            // await rest.query("START TRANSACTION");      
            const xx = yield conexion_mssql_1.default.request().query("UPDATE inventario.dbo.inventario  SET " +
                " [ID_Categoria]       = " + req.body.ID_Categoria + " ," +
                " [Producto]           ='" + req.body.Producto + "'," +
                " [ID_Marca]           = " + req.body.ID_Marca + " ," +
                " [Modelo]             ='" + req.body.Modelo + "'," +
                " [IdentificadorUnico] ='" + req.body.IdentificadorUnico + "'," +
                " [NumFactura]         ='" + req.body.NumFactura + "'," +
                " [ID_Proveedor]       = " + req.body.ID_Proveedor + " ," +
                " [FyH_Alta]           ='" + req.body.FyH_Alta + "'," +
                " [FyH_Baja]           ='" + req.body.FyH_Baja + "'," +
                " [ID_AreaResponsable] = " + req.body.ID_AreaResponsable + " ," +
                " [ID_Responsable]     = " + req.body.ID_Responsable + " ," +
                " [Responsable]        ='" + req.body.Responsable + "'," +
                " [Tabla]              ='" + req.body.Tabla + "'," +
                " [ID_Tabla]           = " + req.body.ID_Tabla + "  " +
                " WHERE ID_Inventario = @id ", [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            // await rest.query("COMMIT");
            return res.json({
                message: 'INVENTARIO modificado'
            });
        }
        catch (error) {
            const rollback = yield conexion_mssql_1.default.request().query("rollback");
            res.json({ estado: "error", data: error, rollabck: rollback });
        }
    });
}
exports.updateInventario = updateInventario;
