using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // this baseapicontroller is created only for this two line of code 
    [ApiController] // increase the developer experience means by this we not need to write more code 
    [Route("api/[controller]")] // this is handle controller based on routes
    public class BaseApiController : ControllerBase
    {
        // Method 2
        private IMediator _mediator;

        // ??= -> meaning , if _mediator is empty than execute 2nd statement
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }

}