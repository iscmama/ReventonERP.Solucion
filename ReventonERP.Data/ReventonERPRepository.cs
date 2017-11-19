using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using ReventonERP.Data.Seguridad;
using ReventonERP.Data.Procesos;

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
        public async Task<int> AddReporteBancoAsync(ReporteBancos newReporteBanco)
        {
            try
            {
                var reporte = _context.ReporteBancos.Add(newReporteBanco);
                int result = await _context.SaveChangesAsync();
                return reporte.idReporteBancos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> AddBancoAsync(Bancos newBanco)
        {
            try
            {
                var banco = _context.Bancos.Add(newBanco);
                int result = await _context.SaveChangesAsync();
                return banco.idBancos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> RemoveReporteBancoAsync(ReporteBancos newReporteBanco)
        {
            try
            {
                var reporte = _context.ReporteBancos.Remove(newReporteBanco);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Bancos>> GetBancosAllAsync()
        {
            try
            {
                return await (from b in _context.Bancos
                              where b.estatus == 1
                              orderby b.fechaPago
                              select b).ToListAsync<Bancos>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ReporteBancos>> GetReporteBancos(string noCheque)
        {
            try
            {
                return await (from r in _context.ReporteBancos
                              where r.noCheque == noCheque && r.estatus == 1
                              select r).ToListAsync<ReporteBancos>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UpdateBancoAsync(Bancos updateBanco)
        {
            try
            {
                var banco = await _context.Bancos.SingleAsync(b => b.idBancos == updateBanco.idBancos);

                if (banco != null)
                {
                    updateBanco.fechaAlta = banco.fechaAlta;
                    updateBanco.idUsuarioAlta = banco.idUsuarioAlta;

                    _context.Entry<Bancos>(banco).CurrentValues.SetValues(updateBanco);
                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> RemoveBancoAsync(string noCheque)
        {
            try
            {
                var reportes = (from r in _context.ReporteBancos
                                      where r.noCheque == noCheque && r.estatus == 1
                                      select r).AsEnumerable();

                _context.ReporteBancos.RemoveRange(reportes);

                var banco = await _context.Bancos.SingleAsync(b => b.numeroCheque == noCheque);

                if (banco != null)
                {
                    _context.Bancos.Remove(banco);
                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> RegisterBancoAsync(Bancos bancoAdd)
        {
            try
            {
                if (bancoAdd.idBancos > 0)
                {
                    var banco = await _context.Bancos.SingleAsync(b => b.idBancos == bancoAdd.idBancos);

                    if (banco != null)
                    {
                        bancoAdd.fechaAlta = banco.fechaAlta;
                        bancoAdd.idUsuarioAlta = banco.idUsuarioAlta;

                        _context.Entry<Bancos>(banco).CurrentValues.SetValues(bancoAdd);
                        return await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    var bancoNew = _context.Bancos.Add(bancoAdd);
                    return await _context.SaveChangesAsync();
                }                

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UpdateFechaPagoBancoAsync(List<int> ids, DateTime fechaPago, int usuario)
        {
            try
            {
                var bancos = _context.Bancos.Where(b => ids.Contains(b.idBancos));

                await bancos.ForEachAsync(b =>
                                                {
                                                    b.fechaPago = fechaPago;
                                                    b.idUsuarioModificacion = usuario;
                                                    b.fechaModificacion = DateTime.Now;
                                                }
                                           );

                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> RemoveBancoAsync(int idBancos)
        {
            try
            {
                var banco = await _context.Bancos.SingleAsync(b => b.idBancos == idBancos);

                if (banco != null)
                {
                    _context.Bancos.Remove(banco);
                    return await _context.SaveChangesAsync();
                }

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}