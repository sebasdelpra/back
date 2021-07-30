"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
const query = (query, variables = []) => {
    return new Promise((resolve, reject) => {
        conexion_mssql_1.default.query(query, variables, (error, result) => {
            if (error) {
                console.log({ estado: "error", mensaje: "error en conexion a base datos", data: error });
                reject({ estado: "error", mensaje: "error en conexion a base datos", data: error });
            }
            else {
                console.log({ estado: "success",
                    mensaje: "usuario creado",
                    data: result
                });
                return resolve({ estado: "success",
                    mensaje: "usuario creado",
                    data: result
                });
            }
        });
    });
};
exports.default = query;
