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
exports.updateProveedor = exports.deleteProveedor = exports.getProveedor = exports.createProveedor = exports.getProveedorAll = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
//const { rest } = require('../database');
function getProveedorAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const proveedor = yield conexion_mssql_1.default.executeQuery("SELECT * FROM inventario.dbo.Proveedor ");
        return res.json(proveedor.data[0]);
    });
}
exports.getProveedorAll = getProveedorAll;
;
function createProveedor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield conexion_mssql_1.default.executeQuery("INSERT INTO inventario.dbo.Proveedor VALUES ('" + req.body.Proveedor + "'," +
            "'" + req.body.Telefono + "'," +
            "'" + req.body.Direccion + "'," +
            "'" + req.body.SitioWeb + "'," +
            "'" + req.body.Correo + "'," +
            "'" + req.body.Contacto + "')");
        return res.json({
            message: 'PROVEEDOR creada'
        });
    });
}
exports.createProveedor = createProveedor;
function getProveedor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const proveedor = yield conexion_mssql_1.default.executeQuery('SELECT * FROM inventario.dbo.Proveedor WHERE ID_Proveedor = @id', [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        console.log(proveedor.data[0]);
        return res.json(proveedor.data[0]);
    });
}
exports.getProveedor = getProveedor;
function deleteProveedor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const proveedor = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.Proveedor WHERE ID_Proveedor = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            return res.json({
                message: 'PROVEEDOR deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteProveedor = deleteProveedor;
function updateProveedor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const proveedor = yield conexion_mssql_1.default.executeQuery("UPDATE inventario.dbo.Proveedor SET  [Proveedor] = '" + req.body.Proveedor + "'," +
            "  [Telefono]  = '" + req.body.Telefono + "'," +
            "  [Direccion] = '" + req.body.Direccion + "'," +
            "  [SitioWeb]  = '" + req.body.SitioWeb + "'," +
            "  [SitioWeb]  = '" + req.body.Correo + "'," +
            "  [Correo]    = '" + req.body.Contacto + "' " +
            " WHERE ID_Proveedor = @id", [{
                name: 'id',
                type: 'Int',
                value: id
            }]);
        return res.json({
            message: 'PROVEEDOR update'
        });
    });
}
exports.updateProveedor = updateProveedor;
