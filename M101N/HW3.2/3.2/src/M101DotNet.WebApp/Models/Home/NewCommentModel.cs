using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace M101DotNet.WebApp.Models.Home
{
    public class NewCommentModel
    {
        [HiddenInput(DisplayValue = false)]
        public string PostId { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Content { get; set; }
    }
}