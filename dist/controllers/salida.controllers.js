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
exports.updateSalida = exports.deleteSalida = exports.getSalida = exports.createSalida = exports.getSalidaAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getSalidaAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const salida = yield conexion_mssql_1.default.executeQuery("SELECT * FROM inventario.dbo.Salida ");
        return res.json(salida.data[0]);
    });
}
exports.getSalidaAll = getSalidaAll;
;
function createSalida(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield conexion_mssql_1.default.executeQuery("INSERT INTO inventario.dbo.Salida VALUES ( " + req.body.ID_Inventario + " ," +
            "'" + req.body.FyH_Entrega + "'," +
            " " + req.body.ID_Destino + " ," +
            " " + req.body.IDPersona + " ," +
            "'" + req.body.Motivo + "'," +
            " " + req.body.ID_Autorizador + " ," +
            " " + req.body.Autorizador + " ," +
            "'" + req.body.Observacion + "')");
        return res.json({
            message: 'SALIDA creada'
        });
    });
}
exports.createSalida = createSalida;
function getSalida(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const salida = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Salida WHERE ID_Salida = @id', [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        console.log(salida.data[0]);
        return res.json(salida.data[0]);
    });
}
exports.getSalida = getSalida;
function deleteSalida(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const salida = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.Salida WHERE ID_Salida = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            return res.json({
                message: 'SALIDA deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteSalida = deleteSalida;
function updateSalida(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const salida = yield conexion_mssql_1.default.executeQuery("UPDATE inventario.dbo.Salida SET [ID_Inventario]  =  " + req.body.ID_Inventario + " ," +
            "  [FyH_Entrega]    = '" + req.body.FyH_Entrega + "'," +
            "  [ID_Destino]     =  " + req.body.ID_Destino + " ," +
            "  [IDPersona]      =  " + req.body.IDPersona + " ," +
            "  [Motivo]         = '" + req.body.Motivo + "'," +
            "  [ID_Autorizador] =  " + req.body.ID_Autorizador + " ," +
            "  [Autorizador]    =  " + req.body.Autorizador + " ," +
            "  [Observacion]    = '" + req.body.Observacion + "' " +
            " WHERE ID_Salida  = @id", [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json({
            message: 'SALIDA update'
        });
    });
}
exports.updateSalida = updateSalida;
