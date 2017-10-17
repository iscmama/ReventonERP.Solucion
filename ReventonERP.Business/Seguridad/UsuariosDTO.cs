using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReventonERP.Business.Seguridad
{
    public class UsuariosDTO
    {
        public int idUsuario { get; set; }
        public int idRol { get; set; }
        public string correo { get; set; }
        public string nombreCompleto { get; set; }
        
        public DateTime fechaAlta { get; set; }
        public int estatus { get; set; }
        public string rol { get; set; }
    }
}