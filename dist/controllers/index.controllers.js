"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexMarca = exports.indexCategoria = exports.indexEntrada = exports.indexInventario = exports.indexUsuario = void 0;
function indexUsuario(req, res) {
    return res.json('welcome usuario');
}
exports.indexUsuario = indexUsuario;
function indexInventario(req, res) {
    return res.json('welcome Inventario');
}
exports.indexInventario = indexInventario;
function indexEntrada(req, res) {
    return res.json('welcome Entrada');
}
exports.indexEntrada = indexEntrada;
function indexCategoria(req, res) {
    return res.json('welcome Categoria');
}
exports.indexCategoria = indexCategoria;
function indexMarca(req, res) {
    return res.json('welcome Marca');
}
exports.indexMarca = indexMarca;
