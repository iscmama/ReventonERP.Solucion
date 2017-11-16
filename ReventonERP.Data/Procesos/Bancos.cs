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
        public int tipo { get; set; }
        public string numeroCheque { get; set; }
        public DateTime fechaPago { get; set; }
        public string proveedor { get; set; }
        public string numeroFactura { get; set; }
        public Nullable<DateTime> fechaFactura { get; set; }
        public string referenciaDepositos { get; set; }
        public decimal depositos { get; set; }
        public decimal cargos { get; set; }
        public Nullable<int> orden { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public Nullable<DateTime> fechaModificacion { get; set; }
        public Nullable<int> idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
    }
}