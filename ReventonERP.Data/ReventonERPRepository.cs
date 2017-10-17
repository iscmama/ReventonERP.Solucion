using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using ReventonERP.Data.Seguridad;

namespace ReventonERP.Data
{
    public class ReventonERPRepository : IDisposable
    {
        private ReventonERPContext _context;
        private UserManager<IdentityUser> _userManager;

        public ReventonERPRepository()
        {
            _context = new ReventonERPContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context));
        }
        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
        public async Task<Usuarios> LoginUsuarioAsync(string correo, string contrasena)
        {
            try
            {
                return await (from u in _context.Usuarios
                              where (u.correo == correo) && (u.contrasena == contrasena) && (u.estatus == 1)
                              select u).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Roles> GetRolAsync(int idRol)
        {
            try
            {
                return await (from r in _context.Roles
                              where (r.idRol == idRol) && (r.estatus == 1)
                              select r).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
