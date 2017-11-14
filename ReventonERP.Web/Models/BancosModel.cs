using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ReventonERP.Web.Models
{
    public class BancosModel
    {
        public int idBancos { get; set; }
        public int tipo { get; set; }
        public string numeroCheque { get; set; }
        public string fechaPago { get; set; }
        public string proveedor { get; set; }
        public string numeroFactura { get; set; }
        public string fechaFactura { get; set; }
        public string referenciaDepositos { get; set; }
        public decimal depositos { get; set; }
        public decimal cargos { get; set; }
        public int orden { get; set; }
        public string fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public string fechaModificacion { get; set; }
        public int idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
        public decimal saldo { get; set; }
    }
}