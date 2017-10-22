using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReventonERP.Business.Procesos
{
    public class BancosDTO
    {
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