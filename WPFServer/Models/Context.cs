using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPFServer.Models
{
    public class Context
    {
        public ObservableCollection<User> Users { get; set; }
        public Context()
        {
            Users = new ObservableCollection<User>();
        }
        private static Context _instance;
        public static Context Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new Context();
                return _instance;
            }
        }


    }
}
