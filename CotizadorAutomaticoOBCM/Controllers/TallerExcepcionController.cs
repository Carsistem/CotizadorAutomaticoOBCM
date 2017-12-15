using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Oracle.DataAccess.Client;

namespace CotizadorAutomaticoOBCM.Controllers
{
    public class TallerExcepcionController : Controller
    {
        //
        // GET: /TallerExcepcion/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getMonedas() {

            IList<EntityItem> items = Data.ListarMonedas();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getSegmentos()
        {

            IList<EntityItem> items = Data.ListarSegmentos();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getClientes()
        {

            IList<EntityItem> items = Data.ListarClientes();

            return Json(items, JsonRequestBehavior.AllowGet);
        }

    }

    
}
