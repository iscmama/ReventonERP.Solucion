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
        [Required]
        public string numero { get; set; }
        public string fechaPago { get; set; }
        public string proveedor { get; set; }
        public string referencia { get; set; }
        public string fechaFactura { get; set; }
        public decimal depositos { get; set; }
        public decimal cargos { get; set; }
        public decimal saldo { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        [Required]
        public Nullable<DateTime> fechaModificacion { get; set; }
        [Required]
        public Nullable<int> idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
    }
}