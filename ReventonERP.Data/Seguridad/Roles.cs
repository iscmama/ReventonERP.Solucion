using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReventonERP.Data.Seguridad
{
    [Table("Roles")]
    public class Roles
    {
        [Key]
        public int idRol { get; set; }
        public string rol { get; set; }
        public DateTime fechaAlta { get; set; }
        public int idUsuarioAlta { get; set; }
        public int estatus { get; set; }
    }
}