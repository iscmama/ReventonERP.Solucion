using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReventonERP.Data.Procesos
{
    [Table("Bancos")]
    public class Bancos
    {
        [Key]
        public int idBancos { get; set; }
        public string numero { get; set; }
        public DateTime fechaPago { get; set; }
        public string proveedor { get; set; }
        public string referencia { get; set; }
        public DateTime fechaFactura { get; set; }
        public decimal depositos { get; set; }
        public decimal cargos { get; set; }
        public decimal saldo { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public Nullable<DateTime> fechaModificacion { get; set; }
        public Nullable<int> idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
    }
}