using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIPontoVenda.Models
{
    [Table("PontoVendas")]
    public class PontoVenda
    {
        public int Id { get; set; }
        public string descricao { get; set; }
        public string telefone { get; set; }

        [DataType(DataType.Date)]
        public DateTime dataAbertura { get; set; }
        public string cep { get; set; }
        public string rua { get; set; }
        public string numero { get; set; }
        public string complemento { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string estado { get; set; }
        public string longitude { get; set; }
        public string latitude { get; set; }
        public bool status { get; set; }

    }
}
