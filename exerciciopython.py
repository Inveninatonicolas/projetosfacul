from datetime import date


class Category:
    def __init__(self, name, description):
        self.name = name
        self.description = description
    
    def update_description(self, new_description: str):
        self.description = new_description
    
    def __str__(self):
        return f"Categoria: {self.name} - {self.description}"
    

class Product:
    def __init__(self, name: str, description: str, date_fabrication: str, is_active: bool, category: Category):
        self.name = name
        self.description = description
        self.date_fabrication = date_fabrication
        self.is_active = is_active
        self.category = category
    
    def deactivate(self):
        self.is_active = False
    
    def __str__(self) -> str:
        status = "Ativo" if self.is_active else "Inativo"
        return f"Produto: {self.name} ({self.description}) - {status} - Categoria: {self.category.name}"

class Person:
    def __init__(self, first_name: str, last_name: str): 
        self.first_name = first_name
        self.last_name = last_name

    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
    
    def __str__(self) -> str:
        return f"Pessoa: {self.full_name()}"

class Client(Person):
    def __init__(self, first_name: str, last_name: str, address: str, phone: str, email: str, gender: str):
        super().__init__(first_name, last_name)
        self.address = address
        self.phone = phone
        self.email = email
        self.gender = gender

    def __str__(self):
        return f"Cliente: {self.first_name} {self.last_name}, Email: {self.email}, Telefone:{self.phone}"
    
    def update_address(self, new_address: str):
        self.address = new_address

class Order:
    def __init__(self, status: str, client: Client):
        self.total_price = 0.0  
        self.status = status
        self.client = client
        self.items = []  

    def add_item(self, item):
        self.items.append(item)
        self.total_price += item.total_price()

    def __str__(self):
        return f"Pedido para {self.client.first_name} { self.client.last_name} - Total:${self.total_price}, Status {self.status}"
    
    def change_status(self, new_status: str):
        self.status = new_status

class OrderItem:
    def __init__(self, quantity: int, unirtary_price: float, order: Order, product: Product):
        self.quantity = quantity
        self.unitary_price = unirtary_price
        self.order = order
        self.product = product
    
    def total_price(self) -> float:
        return self.quantity * self.unitary_price
    
   
category = Category("Electronicos", "Produtos eletronicos")
product = Product("Notebooks", "Notebook Gamer", date(2023, 5, 20), True, category)
client = Client("João", "Santos", "Rua Feliz 123", "+55 51 12345-6789 ", "joãosembraco@gmail.com", "Homem")
order = Order("Pendente", client)
order_item = OrderItem(2, 1500.00, order, product)


category.update_description("Atualiza a categoria do Pedido")
product.deactivate()
client.update_address("Rua dos Doidos 1234")
order.add_item(order_item)
order.change_status("Shipped")


print(category)
print(product)
print(client)
print(order)
print(order_item)


    