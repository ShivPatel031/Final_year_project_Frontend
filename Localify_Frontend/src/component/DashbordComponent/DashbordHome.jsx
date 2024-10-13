import { Edit, Package, Plus, Store, Trash2 } from "lucide-react"
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./DashBordSmallComponent"
import { useNavigate } from "react-router-dom"

function DashboardHome({user,shop,products,handleDeleteProduct,setIsAddingProduct})
{
    const navigate = useNavigate();
    return <>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            {/* <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div> */}
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-screen">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Shop Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Shop Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Name:</strong> {shop.name}</p>
                  <p><strong>Location:</strong> {shop.location.city}, {shop.location.state}</p>
                  <p><strong>Tagline:</strong> {shop.tagline}</p>
                  <p><strong>Email:</strong> {shop.email}</p>
                  <p><strong>Contact:</strong> {shop.contact}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Shop Details
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <Store className="h-8 w-8 mx-auto text-blue-500" />
                      <p className="mt-2 font-semibold text-2xl">{products.length}</p>
                      <p className="text-sm text-gray-500">Total Products</p>
                    </div>
                    <div className="text-center">
                      <Package className="h-8 w-8 mx-auto text-green-500" />
                      <p className="mt-2 font-semibold text-2xl">{products.reduce((acc, product) => acc + product.stock, 0)}</p>
                      <p className="text-sm text-gray-500">Total Stock</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Table */}
            <div className="mt-8">
              {/* <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Products</h2>
                <Button onClick={()=>navigate("/dashbord/addShop")}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div> */}
              <Card>
                <CardContent>
                  <Table>
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.discounted_price || product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="mr-2">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
    </>
}

export default DashboardHome