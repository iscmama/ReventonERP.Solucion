using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Globalization;
using System.Reflection;
using System.Xml;
using System.Xml.Serialization;

namespace ReventonERP.Web.Tools
{
    public static class Serialization
    {
        #region Metodos

        public static string SerializeObject(Object objectGraph)
        {
            try
            {
                object local = objectGraph;
                Type objType = local.GetType();

                StringBuilder sb = new StringBuilder();

                XmlWriterSettings writerSettings = new XmlWriterSettings();
                writerSettings.OmitXmlDeclaration = true;
                writerSettings.Indent = true;

                using (XmlWriter xmlWriter = XmlWriter.Create(sb, writerSettings))
                {
                    XmlSerializer xs = new XmlSerializer(objType);
                    XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
                    ns.Add(String.Empty, String.Empty);
                    xs.Serialize(xmlWriter, objectGraph, ns);
                }

                return sb.ToString();
            }
            catch (Exception ex)
            {
                Exception e = new Exception("Ocurrio un error al ejecutar el metodo SerializeObject.", ex);
                throw (e);
            }
        }
        public static object FillClassFromDataSet(DataSet ds, object objeto, int index)
        {
            try
            {
                object local = objeto;

                if (ds.Tables[0].Rows.Count > 0)
                {
                    IFormatProvider culture = new CultureInfo("es-MX", true);

                    Type objType = local.GetType();
                    PropertyInfo[] propiedades = objType.GetProperties();

                    foreach (PropertyInfo propiedad in propiedades)
                    {
                        if (ds.Tables[0].Columns.Contains(propiedad.Name))
                        {
                            Type columnType = propiedad.PropertyType;

                            if (propiedad.PropertyType.IsGenericType && propiedad.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                columnType = propiedad.PropertyType.GetGenericArguments()[0];


                            if (!DBNull.Value.Equals(ds.Tables[0].Rows[index][propiedad.Name]))
                                propiedad.SetValue(local, Convert.ChangeType(ds.Tables[0].Rows[index][propiedad.Name], columnType), null);
                        }
                    }

                    return local;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Exception e = new Exception(string.Format("Error en FillClassFromDataSet al ejecutar la extracción del objeto del tipo: {0}\n{1}", objeto.GetType(), ex));
                throw (e);
            }
        }
        public static object FillClassFromDataTable(DataTable dt, object objeto, int index)
        {
            try
            {
                object local = objeto;

                if (dt.Rows.Count > 0)
                {
                    IFormatProvider culture = new CultureInfo("es-MX", true);

                    Type objType = local.GetType();
                    PropertyInfo[] propiedades = objType.GetProperties();

                    foreach (PropertyInfo propiedad in propiedades)
                    {
                        if (dt.Columns.Contains(propiedad.Name))
                        {
                            Type columnType = propiedad.PropertyType;

                            if (propiedad.PropertyType.IsGenericType && propiedad.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                columnType = propiedad.PropertyType.GetGenericArguments()[0];


                            if (!DBNull.Value.Equals(dt.Rows[index][propiedad.Name]))
                                propiedad.SetValue(local, Convert.ChangeType(dt.Rows[index][propiedad.Name], columnType), null);
                        }
                    }

                    return local;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Exception e = new Exception(string.Format("Error en FillClassFromDataTable al ejecutar la extracción del objeto del tipo: {0}\n{1}", objeto.GetType(), ex));
                throw (e);
            }
        }
        public static DataTable CreateDataTable<T>(IEnumerable<T> list)
        {
            Type type = typeof(T);
            var properties = type.GetProperties();

            DataTable dataTable = new DataTable();
            foreach (PropertyInfo info in properties)
            {
                dataTable.Columns.Add(new DataColumn(info.Name, Nullable.GetUnderlyingType(info.PropertyType) ?? info.PropertyType));
            }

            foreach (T entity in list)
            {
                object[] values = new object[properties.Length];
                for (int i = 0; i < properties.Length; i++)
                {
                    values[i] = properties[i].GetValue(entity, values);
                }

                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
        public static DataTable ToDataTable<TSource>(this IList<TSource> data)
        {
            DataTable dataTable = new DataTable(typeof(TSource).Name);
            PropertyInfo[] props = typeof(TSource).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in props)
            {
                dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ??
                    prop.PropertyType);
            }

            foreach (TSource item in data)
            {
                var values = new object[props.Length];
                for (int i = 0; i < props.Length; i++)
                {
                    values[i] = props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }
        public static List<TSource> ToList<TSource>(this DataTable dataTable) where TSource : new()
        {
            var dataList = new List<TSource>();

            const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic;
            var objFieldNames = (from PropertyInfo aProp in typeof(TSource).GetProperties(flags)
                                 select new
                                 {
                                     Name = aProp.Name,
                                     Type = Nullable.GetUnderlyingType(aProp.PropertyType) ??
                             aProp.PropertyType
                                 }).ToList();
            var dataTblFieldNames = (from DataColumn aHeader in dataTable.Columns
                                     select new
                                     {
                                         Name = aHeader.ColumnName,
                                         Type = aHeader.DataType
                                     }).ToList();
            var commonFields = objFieldNames.Intersect(dataTblFieldNames).ToList();

            foreach (DataRow dataRow in dataTable.AsEnumerable().ToList())
            {
                var aTSource = new TSource();
                foreach (var aField in commonFields)
                {
                    PropertyInfo propertyInfos = aTSource.GetType().GetProperty(aField.Name);
                    var value = (dataRow[aField.Name] == DBNull.Value) ?
                    null : dataRow[aField.Name]; //if database field is nullable
                    propertyInfos.SetValue(aTSource, value, null);
                }
                dataList.Add(aTSource);
            }
            return dataList;
        }

        #endregion Metodos
    }
}