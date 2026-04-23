import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogOut, Users, Package, ShoppingCart, BarChart3, Plus, Trash2 } from 'lucide-react';

export default function Admin() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [formUser, setFormUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [formProduct, setFormProduct] = useState({ name: '', category: '', price: '', stock: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setLocation('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      setLocation('/');
      return;
    }
    setUser(parsedUser);

    // Load users and products from localStorage
    const savedUsers = localStorage.getItem('app_users');
    const savedProducts = localStorage.getItem('app_products');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const defaultUsers = [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        { id: 6, name: 'Louis Jhosimar Ocampo', email: 'louis@example.com', role: 'admin' },
        { id: 2, name: 'Juan Pérez', email: 'juan@example.com', role: 'user' },
        { id: 3, name: 'María García', email: 'maria@example.com', role: 'user' },
        { id: 4, name: 'Carlos López', email: 'carlos@example.com', role: 'user' },
        { id: 5, name: 'Ana Martínez', email: 'ana@example.com', role: 'user' }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('app_users', JSON.stringify(defaultUsers));
    }

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
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLocation('/');
  };

  const handleAddUser = () => {
    setError('');
    if (!formUser.name || !formUser.email || !formUser.password) {
      setError('Completa todos los campos');
      return;
    }

    if (users.some(u => u.email === formUser.email)) {
      setError('El email ya está registrado');
      return;
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: formUser.name,
      email: formUser.email,
      role: formUser.role
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    setFormUser({ name: '', email: '', password: '', role: 'user' });
    setShowUserModal(false);
  };

  const handleDeleteUser = (id: number) => {
    if (id === user.id) {
      setError('No puedes eliminar tu propia cuenta');
      return;
    }
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
  };

  const handleAddProduct = () => {
    setError('');
    if (!formProduct.name || !formProduct.category || !formProduct.price || !formProduct.stock) {
      setError('Completa todos los campos requeridos');
      return;
    }

    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: formProduct.name,
      category: formProduct.category,
      price: parseFloat(formProduct.price),
      stock: parseInt(formProduct.stock),
      description: formProduct.description
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('app_products', JSON.stringify(updatedProducts));
    setFormProduct({ name: '', category: '', price: '', stock: '', description: '' });
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('app_products', JSON.stringify(updatedProducts));
  };

  const handleChangeRole = (userId: number, newRole: string) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    setUsers(updatedUsers);
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
  };

  if (!user) return null;

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
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
            {error}
          </div>
        )}

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">👥 Usuarios</TabsTrigger>
            <TabsTrigger value="products">📦 Productos</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 flex gap-2">
                      <Plus className="w-4 h-4" />
                      Nuevo Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre</label>
                        <Input
                          placeholder="Nombre completo"
                          value={formUser.name}
                          onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={formUser.email}
                          onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contraseña</label>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          value={formUser.password}
                          onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Rol</label>
                        <select
                          className="w-full border rounded px-3 py-2"
                          value={formUser.role}
                          onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
                        >
                          <option value="user">Usuario</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                      <Button onClick={handleAddUser} className="w-full bg-purple-600 hover:bg-purple-700">
                        Crear Usuario
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Rol</th>
                      <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{u.id}</td>
                        <td className="py-3 px-4">{u.name}</td>
                        <td className="py-3 px-4">{u.email}</td>
                        <td className="py-3 px-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleChangeRole(u.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              u.role === 'admin' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300'
                            }`}
                          >
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestión de Productos</h2>
                <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 flex gap-2">
                      <Plus className="w-4 h-4" />
                      Nuevo Producto
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre</label>
                        <Input
                          placeholder="Nombre del producto"
                          value={formProduct.name}
                          onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Categoría</label>
                        <select
                          className="w-full border rounded px-3 py-2"
                          value={formProduct.category}
                          onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                        >
                          <option value="">Selecciona una categoría</option>
                          <option value="Electrónica">Electrónica</option>
                          <option value="Accesorios">Accesorios</option>
                          <option value="Ropa">Ropa</option>
                          <option value="Libros">Libros</option>
                          <option value="Otros">Otros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Precio</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formProduct.price}
                          onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stock</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formProduct.stock}
                          onChange={(e) => setFormProduct({ ...formProduct, stock: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Descripción</label>
                        <Input
                          placeholder="Descripción del producto"
                          value={formProduct.description}
                          onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleAddProduct} className="w-full bg-purple-600 hover:bg-purple-700">
                        Crear Producto
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 font-semibold">Categoría</th>
                      <th className="text-left py-3 px-4 font-semibold">Precio</th>
                      <th className="text-left py-3 px-4 font-semibold">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold">Acciones</th>
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
                            p.stock > 20 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
