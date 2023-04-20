using APIPontoVenda.Context;
using APIPontoVenda.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIPontoVenda.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PontoVendasController : ControllerBase
    {
        private readonly Contexto _dbContext;
        public PontoVendasController(Contexto dbContext)
        {
            _dbContext = dbContext;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var pontoVendas = _dbContext.PontoVendas.ToList();
            return Ok(pontoVendas);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var pontoVenda = _dbContext.PontoVendas.Find(id);
            if (pontoVenda == null)
            {
                return NotFound("Ponto de Venda não encontrado na base de dados");
            }
            return Ok(pontoVenda);
        }

        [HttpPost]
        public IActionResult Post(PontoVenda pontoVenda)
        {
            _dbContext.Add(pontoVenda);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = pontoVenda.Id }, pontoVenda);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PontoVenda pontoVendaAtualizado)
        {
            var pontoVenda = _dbContext.PontoVendas.Find(id);
            if (pontoVenda == null)
            {
                return NotFound("Ponde de Venda não encontrado na base de dados");
            }

            pontoVenda.descricao = pontoVendaAtualizado.descricao;
            pontoVenda.telefone = pontoVendaAtualizado.telefone;
            pontoVenda.dataAbertura = pontoVendaAtualizado.dataAbertura;
            pontoVenda.cep = pontoVendaAtualizado.cep;
            pontoVenda.rua = pontoVendaAtualizado.rua;
            pontoVenda.numero = pontoVendaAtualizado.numero;
            pontoVenda.complemento = pontoVendaAtualizado.complemento;
            pontoVenda.bairro = pontoVendaAtualizado.bairro;
            pontoVenda.cidade = pontoVendaAtualizado.cidade;
            pontoVenda.estado = pontoVendaAtualizado.estado;
            pontoVenda.longitude = pontoVendaAtualizado.longitude;
            pontoVenda.latitude = pontoVendaAtualizado.latitude;
            pontoVenda.status = pontoVendaAtualizado.status;

            _dbContext.SaveChanges();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pontoVenda = _dbContext.PontoVendas.Find(id);
            if (pontoVenda == null)
            {
                return NotFound("Cliente não encontrado na base de dados");
            }

            _dbContext.PontoVendas.Remove(pontoVenda);
            _dbContext.SaveChanges();
            return NoContent();
        }

    }
}
