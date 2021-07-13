using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPFServer.Hosting
{
    public class WebServerHosting
    {
        private string url = "http://localhost:5000/";

        private IDisposable webApp;

        private static WebServerHosting _instance;
        public static WebServerHosting Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new WebServerHosting();
                return _instance;
            }
        }
        public void Start()
        {
            webApp = WebApp.Start<Startup>(url: this.url);
        }
        public void Stop()
        {
            webApp.Dispose();
        }
    }
}
