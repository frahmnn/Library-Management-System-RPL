import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Save, X } from "lucide-react";

const categories = [
    { value: "fiksi", label: "Fiksi" },
    { value: "non_fiksi", label: "Non-Fiksi" },
    { value: "biografi", label: "Biografi" },
    { value: "sejarah", label: "Sejarah" },
    { value: "sains", label: "Sains" },
    { value: "teknologi", label: "Teknologi" },
    { value: "bisnis", label: "Bisnis" },
    { value: "self_help", label: "Self Help" },
    { value: "romance", label: "Romance" },
    { value: "mystery", label: "Mystery" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horror", label: "Horror" },
    { value: "komedi", label: "Komedi" },
    { value: "drama", label: "Drama" },
    { value: "petualangan", label: "Petualangan" },
    { value: "agama", label: "Agama" },
    { value: "anak", label: "Anak-anak" },
    { value: "kuliner", label: "Kuliner" },
    { value: "seni", label: "Seni" },
    { value: "lainnya", label: "Lainnya" }
];

const conditions = [
    { value: "baru", label: "Baru" },
    { value: "baik", label: "Baik" },
    { value: "rusak_ringan", label: "Rusak Ringan" },
    { value: "rusak_berat", label: "Rusak Berat" }
];

export default function BookMasterForm({ book, onSubmit, onCancel }) {
    const [currentBook, setCurrentBook] = useState(book || {
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        category: "fiksi",
        year: "",
        pages: "",
        price: "",
        stock_current: 0,
        stock_minimum: 1,
        location: "",
        condition: "baru",
        description: "",
        cover_url: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(currentBook);
    };

    return (
        <Card className="bg-white shadow-lg border-slate-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <CardTitle className="text-xl font-bold text-slate-900">
                    {book ? 'Edit Buku' : 'Tambah Buku Baru'}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-800 font-medium">
                                Judul Buku *
                            </Label>
                            <Input
                                id="title"
                                value={currentBook.title}
                                onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="author" className="text-slate-800 font-medium">
                                Penulis *
                            </Label>
                            <Input
                                id="author"
                                value={currentBook.author}
                                onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="isbn" className="text-slate-800 font-medium">
                                ISBN
                            </Label>
                            <Input
                                id="isbn"
                                value={currentBook.isbn}
                                onChange={(e) => setCurrentBook({...currentBook, isbn: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publisher" className="text-slate-800 font-medium">
                                Penerbit
                            </Label>
                            <Input
                                id="publisher"
                                value={currentBook.publisher}
                                onChange={(e) => setCurrentBook({...currentBook, publisher: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-800 font-medium">
                                Kategori
                            </Label>
                            <Select
                                value={currentBook.category}
                                onValueChange={(value) => setCurrentBook({...currentBook, category: value})}
                            >
                                <SelectTrigger className="border-slate-300 focus:border-blue-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="condition" className="text-slate-800 font-medium">
                                Kondisi
                            </Label>
                            <Select
                                value={currentBook.condition}
                                onValueChange={(value) => setCurrentBook({...currentBook, condition: value})}
                            >
                                <SelectTrigger className="border-slate-300 focus:border-blue-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {conditions.map((condition) => (
                                        <SelectItem key={condition.value} value={condition.value}>
                                            {condition.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year" className="text-slate-800 font-medium">
                                Tahun Terbit
                            </Label>
                            <Input
                                id="year"
                                type="number"
                                value={currentBook.year}
                                onChange={(e) => setCurrentBook({...currentBook, year: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pages" className="text-slate-800 font-medium">
                                Jumlah Halaman
                            </Label>
                            <Input
                                id="pages"
                                type="number"
                                value={currentBook.pages}
                                onChange={(e) => setCurrentBook({...currentBook, pages: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-slate-800 font-medium">
                                Harga (Rp)
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={currentBook.price}
                                onChange={(e) => setCurrentBook({...currentBook, price: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock_current" className="text-slate-800 font-medium">
                                Stock Saat Ini
                            </Label>
                            <Input
                                id="stock_current"
                                type="number"
                                min="0"
                                value={currentBook.stock_current}
                                onChange={(e) => setCurrentBook({...currentBook, stock_current: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock_minimum" className="text-slate-800 font-medium">
                                Stock Minimum
                            </Label>
                            <Input
                                id="stock_minimum"
                                type="number"
                                min="0"
                                value={currentBook.stock_minimum}
                                onChange={(e) => setCurrentBook({...currentBook, stock_minimum: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-slate-800 font-medium">
                                Lokasi Penyimpanan
                            </Label>
                            <Input
                                id="location"
                                value={currentBook.location}
                                onChange={(e) => setCurrentBook({...currentBook, location: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                                placeholder="Contoh: Rak A-1, Lemari B, dll"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cover_url" className="text-slate-800 font-medium">
                            URL Sampul Buku
                        </Label>
                        <Input
                            id="cover_url"
                            type="url"
                            value={currentBook.cover_url}
                            onChange={(e) => setCurrentBook({...currentBook, cover_url: e.target.value})}
                            className="border-slate-300 focus:border-blue-400"
                            placeholder="https://example.com/book-cover.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-800 font-medium">
                            Deskripsi
                        </Label>
                        <Textarea
                            id="description"
                            value={currentBook.description}
                            onChange={(e) => setCurrentBook({...currentBook, description: e.target.value})}
                            className="border-slate-300 focus:border-blue-400 h-24"
                            placeholder="Deskripsi singkat tentang buku..."
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onCancel}
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Batal
                        </Button>
                        <Button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {book ? 'Perbarui' : 'Simpan'} Buku
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}