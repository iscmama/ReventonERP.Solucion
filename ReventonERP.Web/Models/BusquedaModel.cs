using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReventonERP.Web.Models
{
    public class BusquedaModel
    {
        public string numeroCheque { get; set; }
        public string proveedor { get; set; }
        public string numeroFactura { get; set; }
        public string referenciaDepositos { get; set; }
        public int opcionFechaPago { get; set; }
        public int opcionFechaFactura { get; set; }
    }
}