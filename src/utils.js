const generateSqlDateTime = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

module.exports = {
  generateSqlDateTime,
};
