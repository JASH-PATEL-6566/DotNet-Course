using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // when we need to change in database at that time we use command and command doesn't return any thing
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // this method add new activity in memory
                _context.Activities.Add(request.Activity);

                // now we save the change
                await _context.SaveChangesAsync();

                // this return nothing but this is important bcz it let api know that our task is done
                return Unit.Value;
            }
        }
    }
}