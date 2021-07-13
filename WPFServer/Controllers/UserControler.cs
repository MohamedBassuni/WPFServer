using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WPFServer.Models;

namespace WPFServer.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UsersController : ApiController
    {
        public string Get()
        {
            return "Working";
        }
        [HttpPost]
        public HttpResponseMessage PostUsers(List<User> users)
        {

            try
            {
                foreach (var user in users)
                {
                    App.Current.Dispatcher.Invoke((Action)delegate
                    {
                        Context.Instance.Users.Add(user);
                    });
                }
                return new HttpResponseMessage(HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}
