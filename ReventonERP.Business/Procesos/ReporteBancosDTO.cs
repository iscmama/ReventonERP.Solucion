using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReventonERP.Business.Procesos
{
    public class ReporteBancosDTO
    {
        public int idReporteBancos { get; set; }
        public string factura { get; set; }
        public DateTime fechaFactura { get; set; }
        public string noCheque { get; set; }
        public DateTime fechaPago { get; set; }
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
    }
}