using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Threading.Tasks;
using ReventonERP.Data;
using ReventonERP.Data.Seguridad;
using ReventonERP.Business.Seguridad;

namespace ReventonERP.Web.Controllers
{
    [RoutePrefix("api/Security")]
    public class SecurityController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> Autenticar(string correo, string contrasena)
        {
            try
            {
                Usuarios user = null;
                Roles rol = null;

                using (ReventonERPRepository _repo = new ReventonERPRepository())
                {
                    user = await _repo.LoginUsuarioAsync(correo, contrasena);

                    if (user == null)
                    {
                        return InternalServerError(new Exception("Usuario / Contraseña incorrectos"));
                    }

                    rol = await _repo.GetRolAsync(user.idRol);

                    if (rol == null)
                    {
                        return InternalServerError(new Exception("Rol no identificado"));
                    }
                }

                LoginDTO login = new LoginDTO()
                {
                    Message = "success",
                    Usuario = new UsuariosDTO()
                    {
                        idUsuario = user.idUsuario,
                        idRol = user.idRol,
                        correo = user.correo,
                        nombreCompleto = user.nombres + " " + user.apPaterno + " " + user.apMaterno,
                        fechaAlta = user.fechaAlta,
                        estatus = user.estatus,
                        rol = rol.rol
                    }
                };

                return Ok(login);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("LoginUsuario")]
        [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-Custom-Header")]
        public async Task<IHttpActionResult> LoginUsuario(string correo, string contrasena)
        {
            try
            {
                Usuarios user = null;

                using (ReventonERPRepository _repo = new ReventonERPRepository())
                {
                    user = await _repo.LoginUsuarioAsync(correo, contrasena);

                    if (user == null)
                    {
                        return InternalServerError(new Exception("Usuario / Contraseña incorrectos"));
                    }
                }

                return Ok("success");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}