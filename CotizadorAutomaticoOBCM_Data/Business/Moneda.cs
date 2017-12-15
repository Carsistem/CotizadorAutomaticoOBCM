using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CotizadorAutomaticoOBCM_Data;

namespace CotizadorAutomaticoOBCM.Business
{
    public class Moneda
    {
        public static List<MONEDA> getMonedas()
        {
            List<MONEDA> lista = new List<MONEDA>();
            using (Entidades ctx = new Entidades())
            {
                foreach (MONEDA mon in ctx.MONEDA.ToList())
                {
                    MONEDA item = new MONEDA();
                    item.IDMONEDA = mon.IDMONEDA;
                    item.DESCRIPCION = mon.DESCRIPCION;
                    item.SIGNO = mon.SIGNO;
                    lista.Add(item);
                }
            }
            return lista;
        }
    }
}
