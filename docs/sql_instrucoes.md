# Instruções SQL




## 📌 Cenário:
Uma empresa de entrega de comida quer identificar os clientes que fizeram o maior número de pedidos. 

Você tem uma tabela: 

**Order** 
- order_id
- customer_id
- customer_name
- order_date
- order_amount 

☑️ Solução :

```sql
WITH 
	order_count AS 
	(SELECT  
		customer_name, 
		COUNT(order_id) AS total_orders  
	 FROM 
		orders     
	 GROUP BY 
		customer_name 
	)
	

SELECT 
	* 
FROM 
	order_count 
WHERE 
	total_orders = (SELECT MAX(total_orders) FROM order_count );
```

### 💡 Conceitos Testados:

✅ CTE 

✅ Agrega Funções 

✅ GROUP por 

✅ subconsulta 

✅ Encontrando Valores Máximos 