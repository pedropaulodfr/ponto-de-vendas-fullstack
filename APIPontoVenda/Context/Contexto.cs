using APIPontoVenda.Models;
using Microsoft.EntityFrameworkCore;

namespace APIPontoVenda.Context
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options) { }
        
            public DbSet<PontoVenda> PontoVendas { get; set; }
 
    }
}
