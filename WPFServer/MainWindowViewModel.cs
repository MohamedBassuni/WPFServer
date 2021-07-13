using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using WPFServer.Commands;
using WPFServer.Hosting;
using WPFServer.Models;

namespace WPFServer
{
    public class MainWindowViewModel
    {
        public Context Context { get { return Context.Instance; } }

        public ICommand StartConnection { get; set; }
        public ICommand StopConnection { get; set; }

        private bool _isServerConnected;
        public bool IsServerConnected
        {
            get
            {
                return _isServerConnected;
            }
            set
            {
                _isServerConnected = value;
                (StartConnection as RelayCommand).RaiseCanExecuteChanged();
                (StopConnection as RelayCommand).RaiseCanExecuteChanged();
            }
        }

        public MainWindowViewModel()
        {
            StartConnection = new RelayCommand(() => { WebServerHosting.Instance.Start(); IsServerConnected = true; }, () => { return !IsServerConnected; });
            StopConnection = new RelayCommand(() => { WebServerHosting.Instance.Stop(); IsServerConnected = false; }, () => { return IsServerConnected; });
        }

    }
}
