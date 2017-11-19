using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReventonERP.Web.Models
{
    public class ActualizarFechasModel
    {
        public int[] ids { get; set; }
        public string fechaPago { get; set; }
        public int usuario { get; set; }
    }
}