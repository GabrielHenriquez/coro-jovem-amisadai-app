export function calcularIdade(dataNascimentoStr: string) {
  const [dia, mes, ano] = dataNascimentoStr.split("/").map(Number);
  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia);

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  // Verifica se o aniversário já aconteceu neste ano
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversario) {
    idade--;
  }

  return idade;
}
