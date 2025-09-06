export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Add Product</button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">In Stock</h3>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Low Stock</h3>
          <p className="text-2xl font-bold text-yellow-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Product Inventory</h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Search products..." className="px-3 py-2 border rounded-lg" />
              <select className="px-3 py-2 border rounded-lg">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 text-center text-gray-500">
          <p>No products in inventory</p>
          <p className="text-sm mt-2">Add your first product to start managing your inventory</p>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Bulk Actions</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Export Inventory</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Import Products</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Update Prices</button>
        </div>
      </div>
    </div>
  )
}
