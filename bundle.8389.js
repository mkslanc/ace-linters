(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8389],{

/***/ 68389:
/***/ ((module) => {

module.exports = `# ISNULL
snippet isnull
	ISNULL(\${1:check_expression}, \${2:replacement_value})
# FORMAT
snippet format
	FORMAT(\${1:value}, \${2:format})
# CAST
snippet cast
	CAST(\${1:expression} AS \${2:data_type})
# CONVERT
snippet convert
	CONVERT(\${1:data_type}, \${2:expression})
# DATEPART
snippet datepart
	DATEPART(\${1:datepart}, \${2:date})
# DATEDIFF
snippet datediff
	DATEDIFF(\${1:datepart}, \${2:startdate}, \${3:enddate})
# DATEADD
snippet dateadd
	DATEADD(\${1:datepart}, \${2:number}, \${3:date})
# DATEFROMPARTS 
snippet datefromparts
	DATEFROMPARTS(\${1:year}, \${2:month}, \${3:day})
# OBJECT_DEFINITION
snippet objectdef
	SELECT OBJECT_DEFINITION(OBJECT_ID('\${1:sys.server_permissions /*object name*/}'))
# STUFF XML
snippet stuffxml
	STUFF((SELECT ', ' + \${1:ColumnName}
		FROM \${2:TableName}
		WHERE \${3:WhereClause}
		FOR XML PATH('')), 1, 1, '') AS \${4:Alias}
	\${5:/*https://msdn.microsoft.com/en-us/library/ms188043.aspx*/}
# Create Procedure
snippet createproc
	-- =============================================
	-- Author:		\${1:Author}
	-- Create date: \${2:Date}
	-- Description:	\${3:Description}
	-- =============================================
	CREATE PROCEDURE \${4:Procedure_Name}
		\${5:/*Add the parameters for the stored procedure here*/}
	AS
	BEGIN
		-- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
		SET NOCOUNT ON;
		
		\${6:/*Add the T-SQL statements to compute the return value here*/}
		
	END
	GO
# Create Scalar Function
snippet createfn
	-- =============================================
	-- Author:		\${1:Author}
	-- Create date: \${2:Date}
	-- Description:	\${3:Description}
	-- =============================================
	CREATE FUNCTION \${4:Scalar_Function_Name}
		-- Add the parameters for the function here
	RETURNS \${5:Function_Data_Type}
	AS
	BEGIN
		DECLARE @Result \${5:Function_Data_Type}
		
		\${6:/*Add the T-SQL statements to compute the return value here*/}
		
	END
	GO`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUIsS0FBSyxvQkFBb0I7QUFDdkQ7QUFDQTtBQUNBLFdBQVcsUUFBUSxLQUFLLFNBQVM7QUFDakM7QUFDQTtBQUNBLFNBQVMsY0FBYyxNQUFNLFlBQVk7QUFDekM7QUFDQTtBQUNBLFlBQVksWUFBWSxLQUFLLGFBQWE7QUFDMUM7QUFDQTtBQUNBLGFBQWEsV0FBVyxLQUFLLE9BQU87QUFDcEM7QUFDQTtBQUNBLGFBQWEsV0FBVyxLQUFLLFlBQVksS0FBSyxVQUFVO0FBQ3hEO0FBQ0E7QUFDQSxZQUFZLFdBQVcsS0FBSyxTQUFTLEtBQUssT0FBTztBQUNqRDtBQUNBO0FBQ0Esa0JBQWtCLE9BQU8sS0FBSyxRQUFRLEtBQUssTUFBTTtBQUNqRDtBQUNBO0FBQ0Esd0NBQXdDLHlDQUF5QztBQUNqRjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLFVBQVU7QUFDVixXQUFXO0FBQ1gscUNBQXFDO0FBQ3JDLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjtBQUNBLHFCQUFxQjtBQUNyQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3NxbHNlcnZlci5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGAjIElTTlVMTFxuc25pcHBldCBpc251bGxcblx0SVNOVUxMKFxcJHsxOmNoZWNrX2V4cHJlc3Npb259LCBcXCR7MjpyZXBsYWNlbWVudF92YWx1ZX0pXG4jIEZPUk1BVFxuc25pcHBldCBmb3JtYXRcblx0Rk9STUFUKFxcJHsxOnZhbHVlfSwgXFwkezI6Zm9ybWF0fSlcbiMgQ0FTVFxuc25pcHBldCBjYXN0XG5cdENBU1QoXFwkezE6ZXhwcmVzc2lvbn0gQVMgXFwkezI6ZGF0YV90eXBlfSlcbiMgQ09OVkVSVFxuc25pcHBldCBjb252ZXJ0XG5cdENPTlZFUlQoXFwkezE6ZGF0YV90eXBlfSwgXFwkezI6ZXhwcmVzc2lvbn0pXG4jIERBVEVQQVJUXG5zbmlwcGV0IGRhdGVwYXJ0XG5cdERBVEVQQVJUKFxcJHsxOmRhdGVwYXJ0fSwgXFwkezI6ZGF0ZX0pXG4jIERBVEVESUZGXG5zbmlwcGV0IGRhdGVkaWZmXG5cdERBVEVESUZGKFxcJHsxOmRhdGVwYXJ0fSwgXFwkezI6c3RhcnRkYXRlfSwgXFwkezM6ZW5kZGF0ZX0pXG4jIERBVEVBRERcbnNuaXBwZXQgZGF0ZWFkZFxuXHREQVRFQUREKFxcJHsxOmRhdGVwYXJ0fSwgXFwkezI6bnVtYmVyfSwgXFwkezM6ZGF0ZX0pXG4jIERBVEVGUk9NUEFSVFMgXG5zbmlwcGV0IGRhdGVmcm9tcGFydHNcblx0REFURUZST01QQVJUUyhcXCR7MTp5ZWFyfSwgXFwkezI6bW9udGh9LCBcXCR7MzpkYXl9KVxuIyBPQkpFQ1RfREVGSU5JVElPTlxuc25pcHBldCBvYmplY3RkZWZcblx0U0VMRUNUIE9CSkVDVF9ERUZJTklUSU9OKE9CSkVDVF9JRCgnXFwkezE6c3lzLnNlcnZlcl9wZXJtaXNzaW9ucyAvKm9iamVjdCBuYW1lKi99JykpXG4jIFNUVUZGIFhNTFxuc25pcHBldCBzdHVmZnhtbFxuXHRTVFVGRigoU0VMRUNUICcsICcgKyBcXCR7MTpDb2x1bW5OYW1lfVxuXHRcdEZST00gXFwkezI6VGFibGVOYW1lfVxuXHRcdFdIRVJFIFxcJHszOldoZXJlQ2xhdXNlfVxuXHRcdEZPUiBYTUwgUEFUSCgnJykpLCAxLCAxLCAnJykgQVMgXFwkezQ6QWxpYXN9XG5cdFxcJHs1Oi8qaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4ODA0My5hc3B4Ki99XG4jIENyZWF0ZSBQcm9jZWR1cmVcbnNuaXBwZXQgY3JlYXRlcHJvY1xuXHQtLSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0LS0gQXV0aG9yOlx0XHRcXCR7MTpBdXRob3J9XG5cdC0tIENyZWF0ZSBkYXRlOiBcXCR7MjpEYXRlfVxuXHQtLSBEZXNjcmlwdGlvbjpcdFxcJHszOkRlc2NyaXB0aW9ufVxuXHQtLSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Q1JFQVRFIFBST0NFRFVSRSBcXCR7NDpQcm9jZWR1cmVfTmFtZX1cblx0XHRcXCR7NTovKkFkZCB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIHN0b3JlZCBwcm9jZWR1cmUgaGVyZSovfVxuXHRBU1xuXHRCRUdJTlxuXHRcdC0tIFNFVCBOT0NPVU5UIE9OIGFkZGVkIHRvIHByZXZlbnQgZXh0cmEgcmVzdWx0IHNldHMgZnJvbSBpbnRlcmZlcmluZyB3aXRoIFNFTEVDVCBzdGF0ZW1lbnRzLlxuXHRcdFNFVCBOT0NPVU5UIE9OO1xuXHRcdFxuXHRcdFxcJHs2Oi8qQWRkIHRoZSBULVNRTCBzdGF0ZW1lbnRzIHRvIGNvbXB1dGUgdGhlIHJldHVybiB2YWx1ZSBoZXJlKi99XG5cdFx0XG5cdEVORFxuXHRHT1xuIyBDcmVhdGUgU2NhbGFyIEZ1bmN0aW9uXG5zbmlwcGV0IGNyZWF0ZWZuXG5cdC0tID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQtLSBBdXRob3I6XHRcdFxcJHsxOkF1dGhvcn1cblx0LS0gQ3JlYXRlIGRhdGU6IFxcJHsyOkRhdGV9XG5cdC0tIERlc2NyaXB0aW9uOlx0XFwkezM6RGVzY3JpcHRpb259XG5cdC0tID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRDUkVBVEUgRlVOQ1RJT04gXFwkezQ6U2NhbGFyX0Z1bmN0aW9uX05hbWV9XG5cdFx0LS0gQWRkIHRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgZnVuY3Rpb24gaGVyZVxuXHRSRVRVUk5TIFxcJHs1OkZ1bmN0aW9uX0RhdGFfVHlwZX1cblx0QVNcblx0QkVHSU5cblx0XHRERUNMQVJFIEBSZXN1bHQgXFwkezU6RnVuY3Rpb25fRGF0YV9UeXBlfVxuXHRcdFxuXHRcdFxcJHs2Oi8qQWRkIHRoZSBULVNRTCBzdGF0ZW1lbnRzIHRvIGNvbXB1dGUgdGhlIHJldHVybiB2YWx1ZSBoZXJlKi99XG5cdFx0XG5cdEVORFxuXHRHT2A7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=