import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit, Plus, Save, X, Upload, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Terrarium {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  featured: boolean;
}

const initialTerrariums: Terrarium[] = [
  {
    id: 1,
    name: "Closed Ecosystem Terrarium",
    price: 89.99,
    originalPrice: 109.99,
    image: "/src/assets/terrarium-1.jpg",
    rating: 4.9,
    reviews: 124,
    tags: ["Best Seller", "Self-Sustaining"],
    featured: false,
  },
  {
    id: 2,
    name: "Hanging Air Plant Garden",
    price: 64.99,
    image: "/src/assets/terrarium-2.jpg",
    rating: 4.8,
    reviews: 89,
    tags: ["Low Maintenance", "Modern"],
    featured: false,
  },
  {
    id: 3,
    name: "Desktop Ecosystem",
    price: 129.99,
    image: "/src/assets/terrarium-3.jpg",
    rating: 5.0,
    reviews: 156,
    tags: ["Premium", "Large"],
    featured: false,
  }
];

export default function Admin() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [terrariums, setTerrariums] = useState<Terrarium[]>(initialTerrariums);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [formData, setFormData] = useState<Partial<Terrarium>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    rating: 5,
    reviews: 0,
    tags: [],
    featured: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isSignedIn) {
      fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => setTerrariums(data.map((p: any) => ({
          ...p,
          id: p._id, // for UI
          _id: p._id, // for backend requests
        }))))
        .catch(() => setTerrariums([]));
    }
  }, [isSignedIn]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      if (!res.ok) {
        throw new Error('Invalid credentials');
      }
      // Optionally, you can store the token here
      // const data = await res.json();
      setIsSignedIn(true);
      toast({
        title: 'Welcome Admin!',
        description: 'You have successfully signed in.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (terrarium: Terrarium) => {
    setEditingId(terrarium._id);
    setTagsInput(terrarium.tags.join(', '));
    setFormData({
      ...terrarium,
      tags: terrarium.tags,
      featured: terrarium.featured,
    });
  };

  const handleSave = async () => {
    const finalTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    const form = new FormData();
    form.append('name', formData.name || '');
    form.append('price', String(formData.price || 0));
    form.append('originalPrice', String(formData.originalPrice || ''));
    form.append('rating', String(formData.rating || 5));
    form.append('numberOfReviews', String(formData.reviews || 0));
    finalTags.forEach(tag => form.append('tags[]', tag));
    form.append('featured', String(formData.featured || false));
    if (selectedFile) {
      form.append('image', selectedFile);
    } else if (formData.image && typeof formData.image === 'string' && !formData.image.startsWith('data:')) {
      form.append('image', formData.image);
    }
    try {
      let res, added, updated;
      if (editingId) {
        res = await fetch(`http://localhost:5000/api/products/${editingId}`, {
          method: 'PUT',
          body: form,
        });
        if (!res.ok) throw new Error();
        updated = await res.json();
        setTerrariums(prev => prev.map(t => t._id === editingId ? {
          ...updated,
          id: updated._id,
          reviews: updated.numberOfReviews,
          featured: updated.featured,
        } : t));
        toast({ title: 'Terrarium updated!', description: 'The terrarium has been successfully updated.' });
      } else {
        res = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          body: form,
        });
        if (!res.ok) throw new Error();
        added = await res.json();
        setTerrariums(prev => [...prev, {
          ...added,
          id: added._id,
          reviews: added.numberOfReviews,
          featured: added.featured,
        }]);
        setShowAddForm(false);
        toast({ title: 'Terrarium added!', description: 'New terrarium has been successfully added.' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to save terrarium.', variant: 'destructive' });
    }
    setEditingId(null);
    setTagsInput("");
    setFormData({ name: "", price: 0, originalPrice: 0, image: "", rating: 5, reviews: 0, tags: [], featured: false });
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setTagsInput("");
    setFormData({
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      rating: 5,
      reviews: 0,
      tags: [],
      featured: false,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setTerrariums(prev => prev.filter(t => t._id !== id));
      toast({ title: 'Terrarium deleted!', description: 'The terrarium has been removed.', variant: 'destructive' });
    } catch {
      toast({ title: 'Error', description: 'Failed to delete terrarium.', variant: 'destructive' });
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/featured`, { method: 'PATCH' });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setTerrariums(prev => prev.map(t => t._id === id ? { ...t, featured: updated.featured } : t));
      toast({ title: updated.featured ? 'Added to Featured!' : 'Removed from Featured!', description: `Terrarium is now ${updated.featured ? 'featured' : 'not featured'}.` });
    } catch {
      toast({ title: 'Error', description: 'Failed to update featured status.', variant: 'destructive' });
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  function getImageUrl(image: string) {
    if (!image) return '';
    if (image.startsWith('/uploads/')) {
      return `http://localhost:5000${image}`;
    }
    return image;
  }

  // Show sign-in form if not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-botanical" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Sign In</CardTitle>
            <p className="text-muted-foreground">Access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-botanical hover:bg-botanical/90"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show admin dashboard if signed in
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-botanical hover:bg-botanical/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Terrarium
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setIsSignedIn(false);
                setLoginForm({ username: "", password: "" });
                toast({
                  title: "Signed out",
                  description: "You have been successfully signed out.",
                });
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Terrarium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Terrarium name"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer flex-1"
                      />
                      <span className="text-muted-foreground self-center">OR</span>
                      <Input
                        placeholder="Image URL"
                        value={typeof formData.image === 'string' && !formData.image.startsWith('data:') ? formData.image : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                    {formData.image && (
                      <div className="flex items-center space-x-2">
                        <img 
                          src={getImageUrl(formData.image)} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined }))}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-botanical focus:ring-botanical border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Best Seller, Modern, Premium"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="bg-botanical hover:bg-botanical/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Terrariums Table */}
        <Card>
          <CardHeader>
            <CardTitle>Terrarium Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terrariums.map((terrarium) => (
                  <TableRow key={terrarium.id}>
                    <TableCell>
                      <img 
                        src={getImageUrl(terrarium.image)} 
                        alt={terrarium.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      {editingId === terrarium._id ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        terrarium.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === terrarium._id ? (
                        <div className="space-y-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                            placeholder="Price"
                          />
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.originalPrice || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined }))}
                            placeholder="Original price"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold">₹{terrarium.price}</div>
                          {terrarium.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ₹{terrarium.originalPrice}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === terrarium._id ? (
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                        />
                      ) : (
                        terrarium.rating
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === terrarium._id ? (
                        <Input
                          type="number"
                          value={formData.reviews}
                          onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                        />
                      ) : (
                        terrarium.reviews
                      )}
                    </TableCell>
                     <TableCell>
                       {editingId === terrarium._id ? (
                         <div className="space-y-2">
                           <Input
                             value={tagsInput}
                             onChange={(e) => setTagsInput(e.target.value)}
                             placeholder="Comma separated tags"
                           />
                            <div>
                              <Label htmlFor="edit-image" className="text-sm">Image</Label>
                              <div className="space-y-2">
                                <div className="flex space-x-2">
                                  <Input
                                    id="edit-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="cursor-pointer flex-1"
                                  />
                                  <span className="text-muted-foreground self-center text-xs">OR</span>
                                  <Input
                                    placeholder="Image URL"
                                    value={typeof formData.image === 'string' && !formData.image.startsWith('data:') ? formData.image : ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                    className="flex-1"
                                  />
                                </div>
                                {formData.image && (
                                  <div className="flex items-center space-x-2">
                                    <img 
                                      src={getImageUrl(formData.image)} 
                                      alt="Preview" 
                                      className="w-12 h-12 object-cover rounded border"
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => setFormData(prev => ({ ...prev, image: terrarium.image }))}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                         </div>
                       ) : (
                         <div className="flex flex-wrap gap-1">
                           {terrarium.tags.map((tag, index) => (
                             <span 
                               key={index}
                               className="px-2 py-1 bg-botanical/10 text-botanical text-xs rounded-full"
                             >
                               {tag}
                             </span>
                           ))}
                         </div>
                       )}
                     </TableCell>
                    <TableCell>
                      {editingId === terrarium._id ? (
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          className="h-4 w-4 text-botanical focus:ring-botanical border-gray-300 rounded"
                        />
                      ) : (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={terrarium.featured}
                            onChange={() => handleToggleFeatured(terrarium._id)}
                            className="h-4 w-4 text-botanical focus:ring-botanical border-gray-300 rounded cursor-pointer"
                          />
                          {terrarium.featured && (
                            <span className="ml-2 text-sm text-botanical">★</span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {editingId === terrarium._id ? (
                          <>
                            <Button size="sm" onClick={handleSave} className="bg-botanical hover:bg-botanical/90">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(terrarium)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDelete(terrarium._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}