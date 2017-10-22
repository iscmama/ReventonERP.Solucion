using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReventonERP.Business.Procesos
{
    public class ResponseBancosDTO
    {
        public int codeResult { get; set; }
        public string result { get; set; }
        public List<BancosDTO> Bancos { get; set; }
    }
}