import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Save, X, Star } from "lucide-react";
import { motion } from "framer-motion";

const genres = [
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
    { value: "lainnya", label: "Lainnya" }
];

const statuses = [
    { value: "belum_dibaca", label: "Belum Dibaca" },
    { value: "ingin_dibaca", label: "Ingin Dibaca" },
    { value: "sedang_dibaca", label: "Sedang Dibaca" },
    { value: "sudah_dibaca", label: "Sudah Dibaca" }
];

export default function BookForm({ book, onSubmit, onCancel }) {
    const [currentBook, setCurrentBook] = useState(book || {
        title: "",
        author: "",
        genre: "fiksi",
        year: "",
        pages: "",
        publisher: "",
        isbn: "",
        description: "",
        status: "belum_dibaca",
        rating: 0,
        cover_url: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(currentBook);
    };

    const handleRatingClick = (rating) => {
        setCurrentBook({ ...currentBook, rating });
    };

    const renderStars = () => {
        return [...Array(5)].map((_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => handleRatingClick(i + 1)}
                className="hover:scale-110 transition-transform"
            >
                <Star
                    className={`w-6 h-6 ${
                        i < currentBook.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 hover:text-amber-300"
                    }`}
                />
            </button>
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-white shadow-lg border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                    <CardTitle className="text-xl font-bold text-amber-900">
                        {book ? 'Edit Buku' : 'Tambah Buku Baru'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-amber-800 font-medium">
                                    Judul Buku *
                                </Label>
                                <Input
                                    id="title"
                                    value={currentBook.title}
                                    onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
                                    className="border-amber-200 focus:border-amber-400"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="author" className="text-amber-800 font-medium">
                                    Penulis *
                                </Label>
                                <Input
                                    id="author"
                                    value={currentBook.author}
                                    onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
                                    className="border-amber-200 focus:border-amber-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="genre" className="text-amber-800 font-medium">
                                    Genre
                                </Label>
                                <Select
                                    value={currentBook.genre}
                                    onValueChange={(value) => setCurrentBook({...currentBook, genre: value})}
                                >
                                    <SelectTrigger className="border-amber-200 focus:border-amber-400">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genres.map((genre) => (
                                            <SelectItem key={genre.value} value={genre.value}>
                                                {genre.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-amber-800 font-medium">
                                    Status Baca
                                </Label>
                                <Select
                                    value={currentBook.status}
                                    onValueChange={(value) => setCurrentBook({...currentBook, status: value})}
                                >
                                    <SelectTrigger className="border-amber-200 focus:border-amber-400">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-amber-800 font-medium">
                                    Tahun Terbit
                                </Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={currentBook.year}
                                    onChange={(e) => setCurrentBook({...currentBook, year: parseInt(e.target.value)})}
                                    className="border-amber-200 focus:border-amber-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pages" className="text-amber-800 font-medium">
                                    Jumlah Halaman
                                </Label>
                                <Input
                                    id="pages"
                                    type="number"
                                    value={currentBook.pages}
                                    onChange={(e) => setCurrentBook({...currentBook, pages: parseInt(e.target.value)})}
                                    className="border-amber-200 focus:border-amber-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="publisher" className="text-amber-800 font-medium">
                                    Penerbit
                                </Label>
                                <Input
                                    id="publisher"
                                    value={currentBook.publisher}
                                    onChange={(e) => setCurrentBook({...currentBook, publisher: e.target.value})}
                                    className="border-amber-200 focus:border-amber-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="isbn" className="text-amber-800 font-medium">
                                    ISBN
                                </Label>
                                <Input
                                    id="isbn"
                                    value={currentBook.isbn}
                                    onChange={(e) => setCurrentBook({...currentBook, isbn: e.target.value})}
                                    className="border-amber-200 focus:border-amber-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cover_url" className="text-amber-800 font-medium">
                                URL Sampul Buku
                            </Label>
                            <Input
                                id="cover_url"
                                type="url"
                                value={currentBook.cover_url}
                                onChange={(e) => setCurrentBook({...currentBook, cover_url: e.target.value})}
                                className="border-amber-200 focus:border-amber-400"
                                placeholder="https://example.com/book-cover.jpg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-amber-800 font-medium">
                                Rating
                            </Label>
                            <div className="flex items-center gap-1">
                                {renderStars()}
                                {currentBook.rating > 0 && (
                                    <span className="ml-2 text-sm text-amber-600">
                                        ({currentBook.rating}/5)
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-amber-800 font-medium">
                                Deskripsi/Sinopsis
                            </Label>
                            <Textarea
                                id="description"
                                value={currentBook.description}
                                onChange={(e) => setCurrentBook({...currentBook, description: e.target.value})}
                                className="border-amber-200 focus:border-amber-400 h-24"
                                placeholder="Masukkan sinopsis atau ulasan buku..."
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onCancel}
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Batal
                            </Button>
                            <Button 
                                type="submit"
                                className="bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {book ? 'Perbarui' : 'Simpan'} Buku
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}