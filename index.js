import productManager from "./productManager.js";

const manager = new productManager();

const env = async () => {
  console.log("\n productos \n");
  let primeraConsulta = await manager.getProducts();
  console.log(primeraConsulta);

  const producto = {
    title: "Aretes",
    description: "Aretes de corazón",
    price: 20000,
    thumbnail: "UwU",
    code: 239,
    stock: 2,
  };

  console.log("\n-agregar producto \n");
  await manager.addProduct(producto);

  const changes = {
    title: "cambie el titulo xd",
    price: 100000,
    stock: 1500,
  };
 
  console.log("\n-actualizar \n");
  await manager.updateProduct(1, changes);

  console.log("\n-dar productos \n");
  let terceraConsulta = await manager.getProducts();
  console.log(terceraConsulta);

  console.log("\n-prueba ID \n");
  let cuartaConsulta = await manager.getProductElementById(2);
  console.log(cuartaConsulta);

  console.log("\n-eliminar \n");
  let quintaConsulta = await manager.deletProduct(3);
  console.log(quintaConsulta);


};

env();