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
using ReventonERP.Data.Procesos;
using ReventonERP.Business.Seguridad;
using ReventonERP.Business.Procesos;
using Newtonsoft.Json;
using ReventonERP.Web.Models;
using System.Globalization;

namespace ReventonERP.Web.Controllers
{
    [RoutePrefix("api/Operations")]
    public class OperationsController : ApiController
    {
        [Route("registrarReporte")]
        [HttpPost]
        public async Task<IHttpActionResult> RegistrarReporte(ReporteBancosModel reporteBancoModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ReporteBancos newReporte = new ReporteBancos()
                {
                    factura = reporteBancoModel.factura,
                    fechaFactura = DateTime.ParseExact(reporteBancoModel.fechaFactura, "dd/MM/yyyy", new CultureInfo("es-MX")),
                    noCheque = reporteBancoModel.noCheque,
                    fechaPago = DateTime.ParseExact(reporteBancoModel.fechaPago, "dd/MM/yyyy", new CultureInfo("es-MX")),
                    proveedor = reporteBancoModel.proveedor,
                    t0 = reporteBancoModel.t0,
                    excentos = reporteBancoModel.excentos,
                    compras = reporteBancoModel.compras,
                    gastos = reporteBancoModel.gastos,
                    ivaCompras = reporteBancoModel.ivaCompras,
                    ivaGastos = reporteBancoModel.ivaGastos,
                    retensionISR = reporteBancoModel.retensionISR,
                    retensionIVA = reporteBancoModel.retensionIVA,
                    total = reporteBancoModel.t0 + reporteBancoModel.excentos + reporteBancoModel.compras + reporteBancoModel.ivaCompras + reporteBancoModel.ivaGastos + reporteBancoModel.retensionISR + reporteBancoModel.retensionIVA,
                    fechaAlta = reporteBancoModel.fechaAlta,
                    idUsuarioAlta = reporteBancoModel.idUsuarioAlta,
                    estatus = reporteBancoModel.estatus,
                };

                using (ReventonERPRepository _repo = new ReventonERPRepository())
                {
                    int result = await _repo.AddReporteBancoAsync(newReporte);

                    if (result == 0)
                    {
                        return InternalServerError(new Exception("No se pudo registrar el Reporte de Bancos. Intente más tarde"));
                    }

                    Bancos newBanco = new Bancos()
                    {
                        numero = newReporte.noCheque,
                        fechaPago = newReporte.fechaPago,
                        proveedor = newReporte.proveedor,
                        referencia = newReporte.factura,
                        fechaFactura = newReporte.fechaFactura,
                        saldo = 0.00m,
                        cargos = 0.00m - newReporte.total,
                        fechaAlta = newReporte.fechaAlta,
                        idUsuarioAlta = newReporte.idUsuarioAlta,
                        estatus = 1
                    };

                    result = await _repo.AddBancoAsync(newBanco);

                    if (result == 0)
                    {
                        result = await _repo.RemoveReporteBancoAsync(newReporte);

                        return InternalServerError(new Exception("No se pudo registrar el proceso de Bancos. Intente más tarde"));
                    }

                    return Ok("success");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("obtenerbancos")]
        [HttpGet]
        public async Task<IHttpActionResult> ObtenerBancos()
        {
            try
            {
                List<BancosDTO> listBancos = new List<BancosDTO>();

                using (ReventonERPRepository _repo = new ReventonERPRepository())
                {
                    List<Bancos> bancos = await _repo.GetBancosAllAsync();

                    foreach (Bancos ban in bancos)
                    {
                        listBancos.Add(new BancosDTO()
                        {
                            idBancos = ban.idBancos,
                            numero = ban.numero,
                            fechaPago = ban.fechaPago,
                            proveedor = ban.proveedor,
                            referencia = ban.referencia,
                            fechaFactura = ban.fechaFactura,
                            depositos = ban.depositos,
                            cargos = ban.cargos,
                            saldo = ban.saldo,
                            fechaAlta = ban.fechaAlta,
                            idUsuarioAlta = ban.idUsuarioAlta,
                            fechaModificacion = ban.fechaModificacion,
                            idUsuarioModificacion = ban.idUsuarioModificacion,
                            estatus = ban.estatus
                        });
                    }
                }

                ResponseBancosDTO response = new ResponseBancosDTO()
                {
                    Bancos = listBancos,
                    codeResult = 0,
                    result = "success"
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("actualizarbancos")]
        [HttpPost]
        public async Task<IHttpActionResult> ActualizarBancos(BancosModel bancosModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Bancos updateBancos = new Bancos()
                {
                    idBancos = bancosModel.idBancos,
                    numero = bancosModel.numero,
                    fechaPago = DateTime.ParseExact(bancosModel.fechaPago, "dd/MM/yyyy", new CultureInfo("es-MX")),
                    proveedor = bancosModel.proveedor,
                    referencia = bancosModel.referencia,
                    fechaFactura = DateTime.ParseExact(bancosModel.fechaFactura, "dd/MM/yyyy", new CultureInfo("es-MX")),
                    depositos = bancosModel.depositos,
                    cargos = bancosModel.cargos,
                    saldo = bancosModel.saldo,
                    fechaModificacion = bancosModel.fechaModificacion,
                    idUsuarioModificacion = bancosModel.idUsuarioModificacion,
                    estatus = bancosModel.estatus
                };

                using (ReventonERPRepository _repo = new ReventonERPRepository())
                {
                    int result = await _repo.UpdateBancoAsync(updateBancos);

                    if (result == 0)
                    {
                        return InternalServerError(new Exception("No se pudo actualizar el registro del Banco. Intente más tarde"));
                    }
                    return Ok("success");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}