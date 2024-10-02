// factory-singleton.js

// Patrón Factory: Creador de productos
class ProductFactory {
    createProduct(type, name, price) {
        switch (type) {
            case "Electronics":
                return new Electronics(name, price);
            case "Clothing":
                return new Clothing(name, price);
            case "Furniture":
                return new Furniture(name, price);
            default:
                throw new Error("Tipo de producto desconocido");
        }
    }
}

// Clase base Producto
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    display() {
        return `${this.name} - $${this.price.toFixed(2)}`;
    }
}

// Productos específicos
class Electronics extends Product {
    constructor(name, price) {
        super(name, price);
        this.category = "Electronics";
    }
}

class Clothing extends Product {
    constructor(name, price) {
        super(name, price);
        this.category = "Clothing";
    }
}

class Furniture extends Product {
    constructor(name, price) {
        super(name, price);
        this.category = "Furniture";
    }
}

// Patrón Singleton: Carrito de compras
class ShoppingCart {
    constructor() {
        if (ShoppingCart.instance) {
            return ShoppingCart.instance;
        }
        this.cartItems = [];
        ShoppingCart.instance = this;
    }

    addProduct(product) {
        this.cartItems.push(product);
        this.displayCart();
    }

    displayCart() {
        const cartList = document.getElementById("cartItems");
        cartList.innerHTML = "";
        this.cartItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${item.display()}`;
            cartList.appendChild(li);
        });
    }
}

// Instancia Singleton del carrito de compras
const cart = new ShoppingCart();

// Controlador para agregar productos
document.addEventListener("DOMContentLoaded", function () {
    const productFactory = new ProductFactory();

    document.getElementById("addButton").addEventListener("click", function () {
        const productType = document.getElementById("productType").value;
        const productName = document.getElementById("productName").value;
        const productPrice = parseFloat(document.getElementById("productPrice").value);

        if (productName && !isNaN(productPrice)) {
            const product = productFactory.createProduct(productType, productName, productPrice);
            cart.addProduct(product);
        } else {
            alert("Por favor, ingrese un nombre y precio válidos.");
        }
    });
});

