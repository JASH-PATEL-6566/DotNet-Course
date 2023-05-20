using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // one way to edit in old record
                // activity.Title = request.Activity.Title ?? activity.Title;

                // post popular method for map values 
                // install AutoMapper.Extension.Microsoft.DependencyInjection
                // new activity which is recive from request so this is map with already present activity in database
                // means new activiy over write the old one
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}