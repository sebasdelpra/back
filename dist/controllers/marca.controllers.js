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
exports.updateMarca = exports.deleteMarca = exports.getMarca = exports.createMarca = exports.getMarcaAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getMarcaAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const marca = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Marca ');
        return res.json(marca.data[0]);
    });
}
exports.getMarcaAll = getMarcaAll;
function createMarca(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Marca = req.body;
        try {
            yield conexion_mssql_1.default.executeQuery("START TRANSACTION");
            yield conexion_mssql_1.default.executeQuery("INSERT INTO inventario.dbo.Marca VALUES ('" + req.body.Marca + "')");
            yield conexion_mssql_1.default.executeQuery("COMMIT");
            return res.json({ estado: 'MARCA creada' });
        }
        catch (error) {
            const rollback = yield conexion_mssql_1.default.executeQuery("rollback");
            res.json({ estado: "error", data: error, rollabck: rollback });
        }
    });
}
exports.createMarca = createMarca;
function getMarca(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const marca = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Marca WHERE ID_Marca = @id', [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json(marca.data[0]);
    });
}
exports.getMarca = getMarca;
function deleteMarca(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const marca = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.Marca WHERE ID_Marca = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            console.log(marca.values);
            return res.json({
                message: 'MARCA deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteMarca = deleteMarca;
function updateMarca(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        //console.log(req.body)
        const marca = yield conexion_mssql_1.default.executeQuery("UPDATE inventario.dbo.Marca SET [Marca]  = '" + req.body.Marca + "'" +
            " WHERE ID_Marca = @id", [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json({
            message: 'MARCA update'
        });
    });
}
exports.updateMarca = updateMarca;
