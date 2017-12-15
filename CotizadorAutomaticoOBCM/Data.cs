using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace CotizadorAutomaticoOBCM
{
    public class Data
    {
        public static IList<EntityItem> ListarMonedas() {
            string oradb = "Data Source=RIO4D6;User Id=SAM;Password=Bronson_9021;";
            OracleConnection conn = new OracleConnection(oradb);
            conn.Open();

            string sql = "select '' as signo, codigo_sam as codigo, descripcion from sam.vw_monedas_fx order by descripcion";
            OracleCommand cmd = new OracleCommand(sql, conn);
            cmd.CommandType = CommandType.Text;

            OracleDataReader dr = cmd.ExecuteReader();
            //Inicializar
            IList<EntityItem> items = new List<EntityItem>();

            while (dr.Read())
            {
                items.Add(new EntityItem { Codigo = Convert.ToString(dr["codigo"]), Descripcion = Convert.ToString(dr["descripcion"]) });
            }
            
            return items;
        }

        public static IList<EntityItem> ListarSegmentos()
        { 
            string oradb = "Data Source=RIO4D6;User Id=SAM;Password=Bronson_9021;";
            OracleConnection conn = new OracleConnection(oradb);
            conn.Open();

            string sql = "select codigo_seg as codigo, desc_seg as descripcion from sam.segmentacion_malp";
            OracleCommand cmd = new OracleCommand(sql, conn);
            cmd.CommandType = CommandType.Text;

            OracleDataReader dr = cmd.ExecuteReader();

            IList<EntityItem> items = new List<EntityItem>();
            while (dr.Read())
            {
                items.Add(new EntityItem { Codigo = Convert.ToString(dr["codigo"]), Descripcion = Convert.ToString(dr["descripcion"]) });
            }

            return items;
        }


        public static IList<EntityItem> ListarClientes()
        { 
            string oradb = "Data Source=RIO4D6;User Id=SAM;Password=Bronson_9021;";
            OracleConnection conn = new OracleConnection(oradb);
            conn.Open();

            string sql = @"
SELECT  m1.penumper as codigo, penomper as descripcion
        FROM       SAM.MALP_PEDT001 M1, 
                        SAM.MALP_PEDT030 M2
        WHERE     M1.PENUMPER = M2.PENUMPER
        AND         M1.PECDGENT = M2.PECDGENT
--        AND m2.pesegcal = 'MU'
        AND M1.PECDGENT = '0072'
        AND M2.PECDGENT = '0072'
--AND penomper LIKE '%{0}%'
        AND ROWNUM <= 500
";
            //sql = string.Format(sql, filter);
            
            OracleCommand cmd = new OracleCommand(sql, conn);
            cmd.CommandType = CommandType.Text;

            OracleDataReader dr = cmd.ExecuteReader();

            IList<EntityItem> items = new List<EntityItem>();
            while (dr.Read())
            {
                items.Add(new EntityItem { Codigo = Convert.ToString(dr["codigo"]), Descripcion = Convert.ToString(dr["descripcion"]) });
            }

            return items;
        }

        


    }


    public class EntityItem
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
    }
}