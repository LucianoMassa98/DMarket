const CartItem = ({ producto, eliminarDelCarrito }) => (
    <li className="py-2 flex justify-between items-center border-b">
      <div>
        <span className="mr-2">{producto.name}</span>
        <span className="text-sm text-gray-500">x {producto.cantidad}</span>
        <span className="text-sm text-gray-500"> / ${producto.price}</span>
      </div>
      <span className="font-semibold">${producto.price * producto.cantidad}</span>
      <button
        onClick={() => eliminarDelCarrito(producto.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Eliminar
      </button>
    </li>
  );

export default CartItem;