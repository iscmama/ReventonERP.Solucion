using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReventonERP.Data.Seguridad
{
    [Table("Usuarios")]
    public class Usuarios
    {
        [Key]
        public int idUsuario { get; set; }
        public int idRol { get; set; }
        public string correo { get; set; }
        public string contrasena { get; set; }
        public string nombres { get; set; }
        public string apPaterno { get; set; }
        public string apMaterno { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public Nullable<DateTime> fechaModificacion { get; set; }
        public Nullable<int> idUsuarioModificacion { get; set; }
        public int estatus { get; set; }
    }
}