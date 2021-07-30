
export interface inventario { 
    ID_Inventario?:     number;
    ID_Categoria:       number;
    Producto:           string;
    ID_Marca:           number;
    Modelo:             string;
    IdentificadorUnico: string;
    NumFactura:         string;
    ID_Proveedor:       number;
    FyH_Alta:           Date;
    FyH_Baja:           Date;
    ID_AreaResponsable: number;
    ID_Responsable:     number;
    Responsable:        string;
    Tabla:              string;
    ID_Tabla:           number    
} 