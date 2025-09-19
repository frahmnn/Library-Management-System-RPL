import React, { useState, useEffect, useCallback } from "react";
import { Book } from "../entities/Book";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import BookForm from "../components/books/MasterForm";

export default function MasterBukuPage() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadBooks = async () => {
        setIsLoading(true);
        try {
            const fetchedBooks = await Book.list('-created_date');
            setBooks(fetchedBooks);
        } catch (error) {
            console.error("Error loading books:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const filterBooks = useCallback(() => {
        if (!searchQuery) {
            setFilteredBooks(books);
            return;
        }

        const filtered = books.filter(book =>
            book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [books, searchQuery]);

    useEffect(() => {
        filterBooks();
    }, [filterBooks]); // Now filterBooks is a stable dependency

    const handleSubmit = async (bookData) => {
        try {
            if (editingBook) {
                await Book.update(editingBook.id, bookData);
            } else {
                await Book.create(bookData);
            }
            setShowForm(false);
            setEditingBook(null);
            loadBooks(); // Reload books after submission
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleDelete = async (bookId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
            try {
                await Book.delete(bookId);
                loadBooks(); // Reload books after deletion
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    const getConditionBadge = (condition) => {
        const variants = {
            baru: "bg-green-100 text-green-800",
            baik: "bg-blue-100 text-blue-800", 
            rusak_ringan: "bg-yellow-100 text-yellow-800",
            rusak_berat: "bg-red-100 text-red-800"
        };
        return variants[condition] || variants.baik;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-blue-700">Memuat data buku...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Master Buku</h1>
                        <p className="text-slate-600">Kelola data buku perpustakaan Anda</p>
                    </div>
                    <Button 
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Buku
                    </Button>
                </motion.div>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <BookForm
                                book={editingBook}
                                onSubmit={handleSubmit}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingBook(null);
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <CardTitle>Data Buku ({filteredBooks.length})</CardTitle>
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Cari judul, penulis, atau ISBN..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Judul & Penulis</TableHead>
                                            <TableHead>ISBN</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Kondisi</TableHead>
                                            <TableHead>Harga</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
                                            {filteredBooks.map((book) => (
                                                <motion.tr
                                                    key={book.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-slate-900">{book.title}</p>
                                                            <p className="text-sm text-slate-500">{book.author}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm">
                                                        {book.isbn || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="capitalize">
                                                            {book.category?.replace('_', ' ')}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-center">
                                                            <span className={`font-medium ${
                                                                (book.stock_current || 0) <= (book.stock_minimum || 1)
                                                                    ? 'text-red-600' 
                                                                    : 'text-green-600'
                                                            }`}>
                                                                {book.stock_current || 0}
                                                            </span>
                                                            <p className="text-xs text-slate-500">
                                                                Min: {book.stock_minimum || 1}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={getConditionBadge(book.condition)}>
                                                            {book.condition?.replace('_', ' ')}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {book.price ? `Rp ${book.price.toLocaleString('id-ID')}` : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleEdit(book)}
                                                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(book.id)}
                                                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </TableBody>
                                </Table>
                                
                                {filteredBooks.length === 0 && (
                                    <div className="text-center py-16">
                                        <p className="text-slate-500">
                                            {books.length === 0 
                                                ? "Belum ada buku yang ditambahkan"
                                                : "Tidak ada buku yang cocok dengan pencarian"
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}