const colors = require("colors");
colors.enable();

// Função para verificar se o nome contém apenas letras
function isValidName(name) {
  return /^[A-Za-z]+$/.test(name);
}

// Função para verificar se o email tem um formato válido
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  colors: colors,
  isValidName: isValidName,
  isValidEmail: isValidEmail,
};
