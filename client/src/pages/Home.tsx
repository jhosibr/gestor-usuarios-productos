import { useState, useEffect } from 'react';
import Admin from './Admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LogOut, ShoppingCart, Plus, Trash2 } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@12345');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    }

    const savedProducts = localStorage.getItem('app_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts = [
        { id: 1, name: 'Laptop Dell', category: 'Electrónica', price: 999.99, stock: 10, description: 'Laptop potente para trabajo' },
        { id: 2, name: 'Mouse Logitech', category: 'Accesorios', price: 29.99, stock: 50, description: 'Mouse inalámbrico' },
        { id: 3, name: 'Teclado Mecánico', category: 'Accesorios', price: 89.99, stock: 25, description: 'Teclado RGB' },
        { id: 4, name: 'Monitor LG 27"', category: 'Electrónica', price: 299.99, stock: 15, description: 'Monitor 4K' },
        { id: 5, name: 'Webcam HD', category: 'Accesorios', price: 59.99, stock: 30, description: 'Webcam 1080p' }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('app_products', JSON.stringify(defaultProducts));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email === 'admin@example.com' && password === 'Admin@12345') {
        const userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else if (email === 'louis@example.com' && password === 'prueba123') {
        const userData = {
          id: 6,
          name: 'Louis Jhosimar Ocampo',
          email: 'louis@example.com',
          role: 'admin'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else if (email === 'user@example.com' && password === 'User@12345') {
        const userData = {
          id: 2,
          name: 'User Regular',
          email: 'user@example.com',
          role: 'user'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
    setCart([]);
    setEmail('admin@example.com');
    setPassword('Admin@12345');
  };

  const addToCart = (product: any) => {
    if (product.stock <= 0) {
      setError('Producto sin stock disponible');
      return;
    }
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      } else {
        setError('No hay más stock disponible');
        return;
      }
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId: number) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('El carrito está vacío');
      return;
    }
    alert(`✅ Compra realizada exitosamente!\nTotal: $${cartTotal.toFixed(2)}`);
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Login View
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">
              🛍️ Gestor de Productos
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Inicia sesión en tu cuenta
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="Admin@12345"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 font-semibold mb-2">📝 Credenciales de Prueba:</p>
              <p className="text-xs text-blue-700 mb-1"><strong>Admin 1:</strong> admin@example.com / Admin@12345</p>
              <p className="text-xs text-blue-700 mb-1"><strong>Admin 2:</strong> louis@example.com / prueba123</p>
              <p className="text-xs text-blue-700"><strong>User:</strong> user@example.com / User@12345</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Admin View
  if (user.role === 'admin') {
    return <Admin />;
  }

  // User View - Catálogo y Carrito
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-600">🛍️ Catálogo de Productos</h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex gap-2">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Catálogo */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Productos Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                      </span>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                      className="w-full bg-purple-600 hover:bg-purple-700 flex gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Añadir al Carrito
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div>
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 flex gap-2">
                <ShoppingCart className="w-5 h-5" />
                Mi Carrito ({cart.length})
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  {error}
                </div>
              )}

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="font-bold text-purple-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-purple-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      ✅ Realizar Compra
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
