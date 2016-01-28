using System.Web.Mvc;

namespace AuthenticationAPI22.Controllers
{
    public class AccountMVCController : Controller
    {
        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
    }
}