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
exports.updateCategoria = exports.deleteCategoria = exports.getCategoria = exports.createCategoria = exports.getCategoriaAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getCategoriaAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoria = yield conexion_mssql_1.default.executeQuery('SELECT * FROM  inventario.dbo.Categoria');
        return res.json(categoria.data[0]);
    });
}
exports.getCategoriaAll = getCategoriaAll;
function createCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield conexion_mssql_1.default.executeQuery("INSERT INTO inventario.dbo.Categoria VALUES ('" + req.body.categoria + "')");
        return res.json({
            message: 'CATEGORIA creado'
        });
    });
}
exports.createCategoria = createCategoria;
function getCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const categoria = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Categoria WHERE ID_Categoria = @id', [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        // console.log(equipo.data[0]);
        return res.json(categoria.data[0]);
    });
}
exports.getCategoria = getCategoria;
function deleteCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id);
        try {
            const categoria = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.Categoria WHERE ID_Categoria = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            console.log(categoria.values);
            return res.json({
                message: 'CATEGORIA deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteCategoria = deleteCategoria;
function updateCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(req.body);
        const categoria = yield conexion_mssql_1.default.executeQuery("UPDATE inventario.dbo.Categoria SET [Categoria]  = '" + req.body.categoria + "'" +
            " WHERE ID_Categoria = @id", [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json({
            message: 'CATEGORIA update'
        });
    });
}
exports.updateCategoria = updateCategoria;
