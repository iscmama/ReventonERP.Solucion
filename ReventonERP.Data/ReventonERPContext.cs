using ReventonERP.Data.Procesos;
using ReventonERP.Data.Seguridad;
using System.Data.Entity;

namespace ReventonERP.Data
{
    public class ReventonERPContext : DbContext
    {
        public ReventonERPContext() : base("name=ReventonERPDB") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ReventonERPContext>(null);
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Bancos> Bancos { get; set; }
        public virtual DbSet<ReporteBancos> ReporteBancos { get; set; }
    }
}