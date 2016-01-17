using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace M101DotNet.WebApp.Models
{
    public class User
    {
        // XXX WORK HERE
        // create an object suitable for insertion into the user collection
        // The homework instructions will tell you the schema that the documents 
        // must follow. Make sure to include Name and Email properties.

        //{ "_id" : ObjectId("54c272a9122ea91adc328696"), "Name" : "Craig", "Email" : "craig@craig.com" }

        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

    }
}