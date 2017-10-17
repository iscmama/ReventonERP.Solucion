using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReventonERP.Business.Seguridad
{
    public class RolesDTO
    {
        public int idRol { get; set; }
        public string rol { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public int estatus { get; set; }
    }
}