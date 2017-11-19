using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ReventonERP.Web.Models
{
    public class ReporteBancosModel
    {
        [Required]
        public string factura { get; set; }
        [Required]
        public string fechaFactura { get; set; }
        [Required]
        public string noCheque { get; set; }
        public string fechaPago { get; set; }
        [Required]
        public string proveedor { get; set; }
        public decimal t0 { get; set; }
        public decimal excentos { get; set; }
        public decimal compras { get; set; }
        public decimal gastos { get; set; }
        public decimal ivaCompras { get; set; }
        public decimal ivaGastos { get; set; }
        public decimal retensionISR { get; set; }
        public decimal retensionIVA { get; set; }
        public decimal total { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public Nullable<DateTime> fechaModificacion { get; set; }
        public Nullable<int> idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
        public string uuid { get; set; }
    }
}