import fs from "fs";

export default class productManager {
  constructor() {
    this.path = "./files/Productos.json";
  }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    };

    deletProduct = async (id) => {
        const products = await this.getProducts();
      
        const productIndex = products.findIndex((product) => product.id === id);
      
        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          console.log("producto eliminado");
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
          return products;
      
        } else {
          console.log("No se pudo eliminar el producto");
          return null;
        }
      };
      

    getProductElementById = async (id) =>{
        const products = await this.getProducts();
 
        try{
            const product = products.find(element => element.id === id);
            return product ? product : null;
        }catch(err){
            console.log(`error: ${err}`);
        }

    };

    addProduct = async (producto) => {
        const productos = await this.getProducts();
        const productExists = productos.find(element => element.code === producto.code);
      
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
          return { success: false, error: console.log("Hay un campo vacío") };
        } else {
          if (productExists) {
            return { success: false, error: console.log("El producto ya existe") };
          } else {
            if (productos.length === 0) {
              producto.id = 1;
            } else {
              producto.id = productos[productos.length - 1].id + 1;
            }
            productos.push(producto);
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(productos, null, "\t")
            );
            return { success: true };
          }
        }
      };
      



    updateProduct = async (id, changes) => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            this.products = result; 

            const productIndex = this.products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.error("Producto no encontrado");
                return;
            }

            const updatedProduct = { ...this.products[productIndex], ...changes };
            this.products[productIndex] = updatedProduct;

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

            console.log(`Producto actualizado: ${updatedProduct.title}`);
        } catch (error) {
            console.error(`Error al leer o actualizar el archivo ${this.path}: ${error.message}`);
            throw error;
        }
    };
}