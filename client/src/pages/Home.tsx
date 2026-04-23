import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LogOut, Users, Package, ShoppingCart, BarChart3 } from 'lucide-react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@12345');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
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
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const products = [
    { id: 1, name: 'Laptop Dell', category: 'Electrónica', price: 999.99, stock: 10, description: 'Laptop potente para trabajo' },
    { id: 2, name: 'Mouse Logitech', category: 'Accesorios', price: 29.99, stock: 50, description: 'Mouse inalámbrico' },
    { id: 3, name: 'Teclado Mecánico', category: 'Accesorios', price: 89.99, stock: 25, description: 'Teclado RGB' },
    { id: 4, name: 'Monitor LG 27"', category: 'Electrónica', price: 299.99, stock: 15, description: 'Monitor 4K' },
    { id: 5, name: 'Webcam HD', category: 'Accesorios', price: 59.99, stock: 30, description: 'Webcam 1080p' }
  ];

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 6, name: 'Louis Jhosimar Ocampo', email: 'louis@example.com', role: 'admin' },
    { id: 2, name: 'Juan Pérez', email: 'juan@example.com', role: 'user' },
    { id: 3, name: 'María García', email: 'maria@example.com', role: 'user' },
    { id: 4, name: 'Carlos López', email: 'carlos@example.com', role: 'user' },
    { id: 5, name: 'Ana Martínez', email: 'ana@example.com', role: 'user' }
  ];

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

  // Admin Dashboard
  if (user.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-600">📊 Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Bienvenido, {user.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex gap-2">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Usuarios</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{users.length}</p>
                </div>
                <Users className="w-12 h-12 text-purple-200" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Productos</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{products.length}</p>
                </div>
                <Package className="w-12 h-12 text-blue-200" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Compras</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">25</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-green-200" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Ventas Totales</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">$5,234.75</p>
                </div>
                <BarChart3 className="w-12 h-12 text-orange-200" />
              </div>
            </Card>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">👥 Usuarios</TabsTrigger>
              <TabsTrigger value="products">📦 Productos</TabsTrigger>
              <TabsTrigger value="purchases">🛒 Compras</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Gestión de Usuarios</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Rol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{u.id}</td>
                          <td className="py-3 px-4">{u.name}</td>
                          <td className="py-3 px-4">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {u.role.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Gestión de Productos</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                        <th className="text-left py-3 px-4 font-semibold">Categoría</th>
                        <th className="text-left py-3 px-4 font-semibold">Precio</th>
                        <th className="text-left py-3 px-4 font-semibold">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{p.id}</td>
                          <td className="py-3 px-4">{p.name}</td>
                          <td className="py-3 px-4">{p.category}</td>
                          <td className="py-3 px-4">${p.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              p.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {p.stock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="purchases" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Historial de Compras</h2>
                <div className="text-center py-8 text-gray-500">
                  No hay compras registradas aún
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  // User Catalog
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-600">🛍️ Catálogo de Productos</h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.name}</p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium">Carrito: {cart.length} items</span>
            <Button variant="outline" onClick={handleLogout} className="flex gap-2">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Productos Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm opacity-90">{product.category}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                      <span className={`text-sm font-medium px-3 py-1 rounded ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={product.stock === 0}
                    >
                      🛒 Añadir al Carrito
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Mi Carrito</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          <p className="text-sm font-semibold text-purple-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600"
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      ✓ Comprar
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
