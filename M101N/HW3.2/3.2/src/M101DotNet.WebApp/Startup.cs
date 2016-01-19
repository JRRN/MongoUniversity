using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(M101DotNet.WebApp.Startup))]
namespace M101DotNet.WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
