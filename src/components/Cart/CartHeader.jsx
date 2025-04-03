import { ShoppingCart } from "lucide-react"; // Importación añadida

const CartHeader = ({ setIsOpen, totalProductos }) => (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-black via-green-800 to-yellow-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition transform flex items-center gap-2"
    >
      <div className="relative w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full absolute -top-2 -left-2 flex items-center justify-center">
        {totalProductos > 0 && (
          <span className="text-white font-semibold text-sm">{totalProductos}</span>
        )}
      </div>
      <ShoppingCart size={20} />
      <span>Carrito</span>
    </button>
  );

export default CartHeader;