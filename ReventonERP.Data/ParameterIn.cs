using System.Data;
using System.Data.Common;

namespace ReventonERP.Data
{
    /// <summary>
    /// Clase que nos Permite Generar Parametros de Entrada.
    /// </summary>
    public class ParameterIn
    {
        #region Contructors

        public ParameterIn()
        {
        }
        public ParameterIn(string name, DbType dbType, object value)
        {
            _name = name;
            _dbType = dbType;
            _value = value;
        }
        public ParameterIn(string name, SqlDbType dbsqlType, object value)
        {
            _name = name;
            _dbSqlType = dbsqlType;
            _value = value;
        }

        #endregion Contructors

        #region Fields

        private string _name;
        private DbType _dbType;
        private object _value;
        private SqlDbType _dbSqlType;

        #endregion Fields

        #region Properties

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }
        public DbType DBType
        {
            get { return _dbType; }
            set { _dbType = value; }
        }
        public ParameterDirection ParameterDirection
        {
            get { return ParameterDirection.Input; }
        }
        public object Value
        {
            get { return _value; }
            set { _value = value; }
        }
        public SqlDbType DBSQLType
        {
            get { return _dbSqlType; }
            set { _dbSqlType = value; }
        }

        #endregion Properties
    }
}
