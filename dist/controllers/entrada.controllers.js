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
exports.updateEntrada = exports.deleteEntrada = exports.getEntrada = exports.createEntrada = exports.getEntradaAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getEntradaAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entrada = yield conexion_mssql_1.default.executeQuery("SELECT * FROM inventario.dbo.Entrada ");
        return res.json(entrada.data[0]);
    });
}
exports.getEntradaAll = getEntradaAll;
;
function createEntrada(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield conexion_mssql_1.default.executeQuery("INSERT INTO inventario.dbo.Entrada VALUES ( " + req.body.ID_Inventario + " ," +
            "'" + req.body.Motivo_Ingreso + "'," +
            "'" + req.body.FyH_Entrada + "'," +
            "'" + req.body.Observacion + "')");
        return res.json({
            message: 'ENTRADA creada'
        });
    });
}
exports.createEntrada = createEntrada;
function getEntrada(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const entrada = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Entrada WHERE ID_Entrada = @id', [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json(entrada.data[0]);
    });
}
exports.getEntrada = getEntrada;
function deleteEntrada(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const salida = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.Entrada WHERE ID_Entrada = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            return res.json({
                message: 'ENTRADA deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteEntrada = deleteEntrada;
function updateEntrada(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const entrada = yield conexion_mssql_1.default.executeQuery("UPDATE inventario.dbo.Entrada SET [ID_Inventario]  =  " + req.body.ID_Inventario + " ," +
            "  [Motivo_Ingreso] = '" + req.body.Motivo_Ingreso + "'," +
            "  [FyH_Entrada]    = '" + req.body.FyH_Entrada + "'," +
            "  [Observacion]    = '" + req.body.Observacion + "' " +
            " WHERE ID_Entrada  = @id", [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json({
            message: 'ENTRADA update'
        });
    });
}
exports.updateEntrada = updateEntrada;
